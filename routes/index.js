const express = require('express');
const router = express.Router();

require('dotenv/config');

//model





/* GET home page. */
router.get('/', async (req, res, next) => {

  
    res.send({mensage:"hi guys, What's up LinkApi. The API with NodeJS/ExpressJS/MongoDBAtlas has been created"});
});
  


module.exports = router;



