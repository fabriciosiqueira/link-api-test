
require('dotenv/config');
const fetch = require('node-fetch');
const PedidosWon = require('../../models/pedidoWon');
const transformtoXml = require('../../modules/transformtoXml');

const pipedriveAPI = require('./pipedrive');
const { soapReq } = require('../../modules/transformtoXml');
const BASE_API = `${process.env.BASE_BLING}`;

module.exports =  {
    checkOrders: async (token) => {

        const tokenPipedrive = `${process.env.TOKEN_PIPEDRIVE}`;
        const dealWOn = await pipedriveAPI.dealWon(tokenPipedrive);

        const json = await transformtoXml.soapReq(dealWOn, token);

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
        

        const json = await req.json();
        console.log(json)
        return json;
    }
};