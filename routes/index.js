const express = require('express');
const router = express.Router();
const moment = require('moment');
const current = moment();

require('dotenv/config');

const pipedriveAPI = require('../src/api/pipedrive');
const blingAPI = require('../src/api/bling');

//model
const PedidosWon = require('../models/pedidoWon');



//Acesso a dados da API Pipedrive
/* GET Deals List. */
router.get('/deals-list', async (req, res, next) => {
    let token = process.env.TOKEN_PIPEDRIVE;
    let pAPI = await pipedriveAPI.dealList(token);
  
    res.send({result:pAPI});
});


/* GET Deals Won List. */
router.get('/deals-won', async (req, res, next) => {
    let token = process.env.TOKEN_PIPEDRIVE;
    let pAPI = await pipedriveAPI.dealWon(token);
  
    res.send({result:pAPI});
});

/* GET Add a Deal. */
//Adiciona uma deal teste na API Pipedrive
router.get('/add-a-deal', async (req, res, next) => {
    let token = process.env.TOKEN_PIPEDRIVE;
    let pAPI = await pipedriveAPI.addDeal(token);
  
    res.send({result:pAPI});
});



//Acesso a dados da API Bling
/* GET Add Deals at Bling API.  */
//Adiciona pedidos a API Bling, relacionadas a todas as Deals cadastradas ate o momento naquele dia na Pipedirve API
router.get('/add-deals-bling', async (req, res, next) => {
    
    let token = process.env.TOKEN_BLING;
    let bAPI = await blingAPI.checkOrders(token);
  
    res.send({result:bAPI});
});

/* GET Bling List. */
router.get('/bling-list', async (req, res, next) => {
    try {
        let token = process.env.TOKEN_BLING;
        let bAPI = await blingAPI.pedidoList(token);

        res.send({result:bAPI});
    } catch (error) {
        res.send(error)
    }
});



//Acesso a dados do MongoDB Atlas
/* GET Dayly List. */
//listar deals won do dia salvos no  MongoDB Atlas
router.get('/dayly-list', async (req, res, next) => {
    try {
        today = current.format("DD/MM/YYYY");
        console.log(today);
        let lista = await PedidosWon.find({checkDate:today});
    
  
        res.send({result:lista});
    } catch (error) {
        res.send(error)
    }
});

/* GET List All. */
//listar todos os deals won salvos no  MongoDB Atlas 
router.get('/list-all', async (req, res, next) => {
   
    try {
        let lista = await PedidosWon.find();
    
  
        res.send({result:lista});
    } catch (error) {
        res.send(error)
    }
   
});




module.exports = router;



