const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const moment = require('moment');
const agora = moment();
 
const PedidoWonSchema = mongoose.Schema({
   
    
    createdAt: {
        type: String,
        default: `${agora.format("DD/MM/YYYY HH:mm")}`
    },
    checkDate:{
        type: String,
        default: `${agora.format("DD/MM/YYYY")}`
    },
    pedidocompra:[{}],
    total:{
        type:Number,
        require:true
    },
    ordemcompra:{
        type: String,
        require:true
    },
    idBlingPedido:{
        type: String,
        require:true 
    }
});



module.exports =  mongoose.model('PedidoWon', PedidoWonSchema);

