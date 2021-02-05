
require('dotenv/config');
const fetch = require('node-fetch');

const BASE_API = `${process.env.BASE_BLING}`;

module.exports =  {
    dealList: async (token) => {
        const req = await fetch(`${BASE_API}/deals`, {
            method: 'GET',
            headers:{
                Accept: 'application/json',
                "Content-type": 'application/json'
            },
            body: JSON.stringify({token})
        });

        const json = await req.json();
        return json;
    } 
};