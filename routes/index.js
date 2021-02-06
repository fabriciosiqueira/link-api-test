const express = require('express');
const router = express.Router();

require('dotenv/config');
const pipedriveAPI = require('../src/api/pipedrive');
const blingAPI = require('../src/api/bling');

//model





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
router.get('/check-deals-won', async (req, res, next) => {
    
    let token = process.env.TOKEN_BLING;
    let bAPI = await blingAPI.checkOrders(token);
  
    res.send({result:bAPI});
});




module.exports = router;



