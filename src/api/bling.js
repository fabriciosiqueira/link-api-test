
require('dotenv/config');
const fetch = require('node-fetch');
const xml2js = require('xml2js');
const moment = require('moment');
const current = moment();
const PedidosWons = require('../../models/pedidoWons');



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
                                "valor":140.75,
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
 
        var builder = new xml2js.Builder();
        var xml = builder.buildObject(obj);
        
        //checkar

        



        /*const req = await fetch(`${BASE_API}/pedidoscompra/json?apikey=${token}`, {
            method: 'GET',
            headers:{
                Accept: 'application/json',
                "Content-type": 'application/json'
            }

        });

        const json = await req.json();*/
        


        //add the  diferent item in the database
        //return json;
        return obj;
    } 
};