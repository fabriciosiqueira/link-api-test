const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const moment = require('moment');
const agora = moment();
 
const PedidoSchema = mongoose.Schema({
   
    id_pedido:{
        type:String,
        require:true,
        trim:true,  
    },
    createdAt: {
        type: String,
        default: `${agora.format("DD/MM/YYYY HH:mm")}`
    },
    checkDate:{
        type: String,
        default: `${agora.format("DD/MM/YYYY")}`
    },
    pedidoCompra:[{
        type: mongoose.Schema.Types.ObjectId,
        require:true
    }],
});



module.exports =  mongoose.model('Pedido', PedidoSchema);

