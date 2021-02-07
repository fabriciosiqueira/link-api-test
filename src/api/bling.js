
require('dotenv/config');
const fetch = require('node-fetch');
const moment = require('moment');
const current = moment();
const PedidosWon = require('../../models/pedidoWon');
const transformtoXml = require('../../modules/transformtoXml');

const pipedriveAPI = require('./pipedrive');
const BASE_API = `${process.env.BASE_BLING}`;

module.exports =  {
    checkOrders: async (token) => {

        const tokenPipedrive = `${process.env.TOKEN_PIPEDRIVE}`;
        const dealWOn = await pipedriveAPI.dealWon(tokenPipedrive);

        //data pedido
        let d = dealWOn.data[0].won_time.split(" ");
        let dUSA = d[0].split("-");
        let data = `${dUSA[2]}/${dUSA[1]}/${dUSA[0]}`;

        //data atual pra filtragem e checagem da lista de pedidos do dia
        let todayDate = current.format("DD/MM/YYYY HH:mm");
        let setTodayDate = todayDate.split(" ")
        let today = setTodayDate[0];
        let ordemcompra=`${today.split("/").join("")}0`;

        let mensagem = `Nao ha Deals Won para esse dia: ${today}`;

        let obj = {
            "pedido":{
                "data":`${data}`,
                "cliente":{
                    "nome":"Fornecedor teste 1",
                },
                "itens":{
                    "item":[]
                }  
            }
        };

        obj.pedido.data = data;

        for(let i = 0; i < dealWOn.data.length; i++) {

            if (data === data) {
                let pedido = {
                    "codigo":null,
                    "descricao":"",
                    "qtde":1,
                    "vlr_unit":null
                };
    
                pedido.codigo = dealWOn.data[i].id;
                pedido.descricao = dealWOn.data[i].title;
                pedido.vlr_unit = dealWOn.data[i].value;

                //caso haja id igual nao adiciona
                let checkId = i-1;
                if(checkId == -1) {
                    checkId = 0;
                }

                if(dealWOn.data[i].id != dealWOn.data[checkId].id) {
                    obj.pedido.itens.item.push(pedido);
                } else {

                }
                
            } else {
                return mensagem;
            }

            
        };

        //soma total dos pedidos
        let arrayItems = obj.pedido.itens.item;
        
        const valorTotal = arrayItems.reduce((sum, arrayItem)=>{
            return sum + arrayItem.vlr_unit;
        }, 0);

        

        try {
            //Adicionar informaçoes ao  banco
            const pedido = await PedidosWon.create({
                checkDate:data,
                total:valorTotal,
                ordemcompra:`${ordemcompra}`

            });

            let result = await PedidosWon.findByIdAndUpdate(`${pedido.id}`,{checkDate:pedido.checkDate,total:pedido.total},{new:true});
            
            result.pedidocompra.push(obj.pedidocompra.itens);
            await result.save();
        } catch (error) {
            console.log(error)
        }
        

        const xml = await transformtoXml.transform(obj);
        const json = await transformtoXml.soapReq(xml,token);


        return json;
    },
    pedidoList: async (token) => {
        const req = await fetch(`${BASE_API}/pedidos/json/?apikey=${token}`, {
            method: 'GET',
            headers:{
                Accept: 'application/json',
                "Content-type": 'application/json'
            }
        });
        

        const json = await req;
        return json;
    }
};