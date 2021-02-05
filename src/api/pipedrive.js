
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
    },
    dealWon: async (token) => {
        const req = await fetch(`${BASE_API}/deals${token}`, {
            method: 'GET',
            headers:{
                Accept: 'application/json',
                "Content-type": 'application/json'
            }
        });

        const json = await req.json();
        let won = [];

        let dealsDetails = {
            addtional_data: json.addtional_data,
            related_objects: json.related_objects,
            data:null
        }

        for(let i = 0; i < json.data.length; i++) {
            if(json.data[i].status === 'won') {
                won.push(json.data[i])
            } else {

            }
        }

        dealsDetails.data = won;
         
        return dealsDetails;
    } 
};