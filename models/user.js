const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
const bcrypt = require('bcryptjs');

const moment = require('moment');
const t = moment();

const UserSchema = mongoose.Schema({
    name: {
        type:String,
        require:true,
        trim: true,
    },
    email: {
        type:String,
        require:true,
        unique:true,
        lowercase:true,
    },
    endereco: {
        type:String,
        require:true,
        trim: true,
    },
    telefone: {
        type:String,
        require:true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetExpires: {
        type:Date,
        select:false
    },
    perfil: {
        type: Number,
        required: true,
        default:2
    },
    createdAt: {
        type: Date,
        default:  t.format()
    }    
   //perfil 0 ADM; perfil 1 usuario; perfil 2 cliente  
});

UserSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}


module.exports = mongoose.model('User', UserSchema);

