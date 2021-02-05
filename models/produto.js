const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
const bcrypt = require('bcryptjs');


 

const ProdutoSchema = mongoose.Schema({
    produtoImg: {
        type:String,
        require:true,
        default:""
    },
    titulo: {
        type:String,
        require:true,
    },
    descricao: {
        type:String,
        require:true,
    },
    fonte:{
        type:String,
        require:true,
        default:""
    },
    preco: {
        type:Number,
        require:true,
    },
    
     
});



module.exports =  mongoose.model('Produto', ProdutoSchema);

