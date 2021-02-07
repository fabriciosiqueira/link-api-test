const xml2js = require('xml2js');
const builder = new xml2js.Builder();
const axios = require('axios');
const soapRequest = require('easy-soap-request');
require('dotenv/config');
const BASE_API = `${process.env.BASE_BLING}`;


//transform JSON to XML
module.exports =  {
    transform: async (json) => {
       return builder.buildObject(json);
    },
    soapReq: async (str,token) => {
        console.log("str: ",str)
        console.log("token: ",token)

        try {
            
            
            const xml = str;

            const req = await fetch(`${BASE_API}/pedido/json/?apikey=${token}`, {
                method: 'POST',
                headers:{
                    "Content-type": 'text/xml'
                },
                body:xml
            });
    
            const json = await req.json();

            
            return json;  
              
        } catch (error) {
           return error
        }
        

    }
}

