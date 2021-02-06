
require('dotenv/config');
const fetch = require('node-fetch');
const xml2js = require('xml2js');
const builder = new xml2js.Builder();
const moment = require('moment');
const current = moment();
const PedidosWon = require('../../models/pedidoWon');



const pipedriveAPI = require('./pipedrive');
const pedido = require('d:/sistema/node/valete/models/pedido');
const { findByIdAndUpdate } = require('../../models/pedidoWon');
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

        let mensagem = `Nao ha Deals Won para esse dia: ${today}`;


        let obj = {
            "pedidocompra":{
                "numeropedido":"",
                "datacompra":"",
                "dataprevista":"",
                "ordemcompra":"",
                "desconto":"",
                "observacoes":"Apanhado do dia de deals won",
                "observacaointerna":"Observações internas...",
                "fornecedor":{
                        "id":"",
                        "nome":"",
                        "tipopessoa":"",
                        "cpfcnpj":"",
                        "ie":"",
                        "rg":"",
                        "contribuinte":"",
                        "endereco":"",
                        "endereconro":"",
                        "complemento":"",
                        "bairro":"",
                        "cep":"",
                        "cidade":"",
                        "uf":"",
                        "fone":"",
                        "celular":"",
                        "email":""
                },
                "itens":{
                        "item":[]
                },
                "parcelas":{
                        "parcela":[
                            {
                                "nrodias":"",
                                "valor":null,
                                "obs":"Soma do valor total de negocios ganhos no dia",
                                "idformapagamento":""
                            },
                        ]
                },
                "transporte":{
                        "transportador":"",
                        "freteporconta":"",
                        "qtdvolumes":"",
                        "frete":""
                }
            }
        };

        obj.pedidocompra.datacompra=data;

        for(let i = 0; i < dealWOn.data.length; i++) {

            if (data === data) {
                let pedido = {
                    "codigo":null,
                    "descricao":"",
                    "un":"",
                    "qtde":"",
                    "valor":null
                };
    
                pedido.codigo = dealWOn.data[i].id;
                pedido.descricao = dealWOn.data[i].title;
                pedido.valor = dealWOn.data[i].value;

                //caso haja id igual nao adiciona
                let checkId = i-1;
                if(checkId == -1) {
                    checkId = 0;
                }

                if(dealWOn.data[i].id != dealWOn.data[checkId].id) {
                    obj.pedidocompra.itens.item.push(pedido);
                } else {

                }
                
            } else {
                return mensagem;
            }

            
        };

        //soma total dos pedidos
        let arrayItems = obj.pedidocompra.itens.item;
        
        const valorTotal = arrayItems.reduce((sum, arrayItem)=>{
            return sum + arrayItem.valor;
        }, 0);

        obj.pedidocompra.parcelas.parcela[0].valor = valorTotal;
 
        
        //Adicionar informaçoes ao  banco
        try {
            const pedido = await PedidosWon.create({
                checkDate:data,
                total:valorTotal

            });

            let result = await PedidosWon.findByIdAndUpdate(`${pedido.id}`,{checkDate:pedido.checkDate,total:pedido.total},{new:true});
            
            result.pedidocompra.push(obj.pedidocompra.itens);
            await result.save();


            /**
             * Transformar dados da variavel obj em XML pra enviar os dados a API Bling de pedidos de compra
             */
            
            var xml = builder.buildObject(obj);

            const req = await fetch(`${BASE_API}/pedidoscompra/json?apikey=${token}`, {
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    "Content-type": 'application/json'
                }
    
            });
    
            const json = await req.json();
            

            return result;
        } catch (error) {
           console.log(error) 
        }
        

        



        
        


        //add the  diferent item in the database
        //return json;
        
    }
};