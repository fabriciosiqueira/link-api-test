const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
const bcrypt = require('bcryptjs');

const moment = require('moment');
const agora = moment();

 


const historicoPedidoSchema = mongoose.Schema({
   
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require:true
    },
    pedido: {
        type: Object,
        require:true
    },
    status:{
        type:Number,
        require:true
    },
    processo:{
        type:String,
        require:true
    },
    troco:{
        type:Number,
        require:true,
        trim:true,
        default:0
    },
    clienteName:{
        type:String,
        require:true,
        trim:true,
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
    formaPagamento:{
        type:String,
        require:true,
    },
    createdAt: {
        type: String,
        default: `${agora.format("DD/MM/YYYY HH:mm")}`
    }
   
});



module.exports =  mongoose.model('historicoPedido', historicoPedidoSchema);

