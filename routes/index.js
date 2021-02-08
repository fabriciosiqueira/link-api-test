const express = require('express');
const router = express.Router();
const moment = require('moment');
const current = moment();

require('dotenv/config');

const pipedriveAPI = require('../src/api/pipedrive');
const blingAPI = require('../src/api/bling');

//model
const PedidosWon = require('../models/pedidoWon');




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

/* GET Check and add Deals Won and sicronize with MongoDB. */
router.get('/add-deals-bling', async (req, res, next) => {
    
    let token = process.env.TOKEN_BLING;
    let bAPI = await blingAPI.checkOrders(token);
  
    res.send({result:bAPI});
});

/* GET listar deals won do dia salvos no  MongoDB Atlas */
router.get('/bling-list', async (req, res, next) => {
    try {
        let token = process.env.TOKEN_BLING;
        let bAPI = await blingAPI.pedidoList(token);

        res.send({result:bAPI});
    } catch (error) {
        res.send(error)
    }
});

/* GET listar deals won do dia salvos no  MongoDB Atlas */
router.get('/dayly-list', async (req, res, next) => {
    try {
        today = current.format("DD/MM/YYYY");
        console.log(today);
        let lista = await PedidosWon.findOne({checkDate:today});
    
  
        res.send({result:lista});
    } catch (error) {
        res.send(error)
    }
});

/* GET listar todos os deals won salvos no  MongoDB Atlas  */
router.get('/list-all', async (req, res, next) => {
   
    try {
        let lista = await PedidosWon.find();
    
  
        res.send({result:lista});
    } catch (error) {
        res.send(error)
    }
   
});




module.exports = router;



