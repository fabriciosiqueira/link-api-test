const xml2js = require('xml2js');
const builder = new xml2js.Builder();
const moment = require('moment');
const current = moment();
const axios = require('axios');

require('dotenv/config');
const BASE_API = `${process.env.BASE_BLING}`;

//model
const PedidosWon = require('../models/pedidoWon');


//transform JSON to XML
module.exports =  {
    transform: async (json) => {
       return builder.buildObject(json);
    },
    soapReq: async (deals,token) => {
        
        //data atual pra filtragem e checagem da lista de pedidos do dia
        let todayDate = current.format("DD/MM/YYYY HH:mm");
        let setTodayDate = todayDate.split(" ")
        let today = setTodayDate[0];
        let mensagem = `Nao ha Deals Won para esse dia: ${today}`;
        let arrayCheck = [];
        
        const pedido = deals.data.map(async (deal) => {

            //data pedido
            let d = deal.won_time.split(" ");
            let dUSA = d[0].split("-");
            let data = `${dUSA[2]}/${dUSA[1]}/${dUSA[0]}`;



            
            let obj = {
                "pedido":{
                    "data":`${data}`,
                    "cliente":{
                        "nome":`${deal.person_id.name}`,
                    },
                    "itens":{
                        "item":[]
                    }  
                }
            };
    
            if (today === data) {
                let pedido = {
                    "codigo":null,
                    "descricao":"",
                    "qtde":1,
                    "vlr_unit":null
                };
                
                pedido.codigo = deal.id;
                pedido.descricao = deal.title;
                pedido.vlr_unit = deal.value;

                obj.pedido.itens.item.push(pedido);
                
            } else {
                return mensagem
            }
    
            //soma total dos pedidos
            let arrayItems = obj.pedido.itens.item;


            
            
            const valorTotal = arrayItems.reduce((sum, arrayItem)=>{
                return sum + arrayItem.vlr_unit;
            }, 0);   

            const xml = builder.buildObject(obj);

            
            try {
                const pedidoData = await axios.post(`${BASE_API}/pedido/json/?apikey=${token}&xml=${xml}`);

                if(pedidoData.data.retorno.erros) console.log(pedidoData.data.retorno.erros) 
               
            
                const { pedido } = pedidoData.data.retorno.pedidos[0];
                console.log(pedido);

                const p = await PedidosWon.create({
                    checkDate:data,
                    total:valorTotal,
                });
        
                let result = await PedidosWon.findByIdAndUpdate(`${p.id}`,{
                    idBlingPedido:pedido.idPedido,
                    nBlingPedido:pedido.numero
                },{new:true});
                
                result.pedido.push(obj.pedido.itens);
                await result.save();

                arrayCheck.push(result);
        
                
                
            } catch (error) {
                return error
            }
        
        });

        return arrayCheck;

         
        

    }
}

