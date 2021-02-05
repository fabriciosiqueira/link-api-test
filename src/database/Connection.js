const mongoose = require('mongoose');
require('dotenv/config')


const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_SRV, { 
        useUnifiedTopology: true, 
        useNewUrlParser:true,
        
    });
    

    console.log('DB conectado');
    
}

module.exports = connectDB;