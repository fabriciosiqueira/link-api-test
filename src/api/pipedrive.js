
require('dotenv/config');
const fetch = require('node-fetch');

const BASE_API = `${process.env.BASE_PIPEDRIVE}`;



module.exports =  {
    dealList: async (token) => {
        const req = await fetch(`${BASE_API}/deals${token}`, {
            method: 'GET',
            headers:{
                Accept: 'application/json',
                "Content-type": 'application/json'
            }
        });

        const json = await req.json();
        return json;
    }
};