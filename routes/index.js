const express = require('express');
const router = express.Router();

require('dotenv/config');
const pipedriveAPI = require('../src/api/pipedrive');

//model





/* GET Deals List. */
router.get('/deals-list', async (req, res, next) => {
    let token = process.env.TOKEN_PIPEDRIVE;
    let pAPI = await pipedriveAPI.dealList(token);
  
    res.send({result:pAPI});
});





module.exports = router;



