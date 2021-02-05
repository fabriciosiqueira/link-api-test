const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
const bcrypt = require('bcryptjs');

const moment = require('moment');
const agora = moment();
 
const PedidoSchema = mongoose.Schema({
   
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require:true
    },
    clienteName:{
        type:String,
        require:true,
        trim:true,
    },
    carro: {
        type: Object,
        require:true
    },
    troco:{
        type:Number,
        require:true,
        trim:true,
        default:0
    },
    trocoCliente:{
        type:Number,
        require:true,
        trim:true,
        default:0
    },
    id_pagamento:{
        type:String,
        require:true,
        trim:true,  
    },
    createdAt: {
        type: String,
        default: `${agora.format("DD/MM/YYYY HH:mm")}`
    },
    status:{
        type:Number,
        require:true,
        default:6
    },
    processo:{
        type:String,
        require:true,
        default:""
    },
    formaPagamento:{
        type:String,
        require:true,
        default:""
    }
    
    //0 lido; 1 a caminho; 2 entregue 
});



module.exports =  mongoose.model('Pedido', PedidoSchema);

