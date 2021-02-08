require('dotenv/config');
const fetch = require('node-fetch');
const axios = require('axios');

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
    },
    addDeal: async (token) => {

        //Exemplo em JSON de adiçao de deal
        let data = {
            title: "Adding a Deal teste",
            person_id: 2,
            status: "won"
        }
        console.log(data)

        try {

            const req = await axios.post(`${BASE_API}/deals${token}`, data, {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            
        

            const json = await req.json();
            return json;
        } catch (error) {
            return error
        }
        
    }
};