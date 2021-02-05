const passport = require('passport');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

//Estrategia para alocar usuarios logado em sessao
passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id,function(err, user){
        done(err, user);
    })
})

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password,  done) => {

    // username must be an email
    req.checkBody('email','Email Invalido').notEmpty().isEmail();
    // password must be at least 5 chars long
    req.checkBody('password','Senha Invalida, ela deve possuir mais de 4 caracteres').notEmpty().isLength({min:4});
    
    
    let errors =  req.validationErrors();
    if(errors){    
        let messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
            
        });
        return done(null,false, req.flash('error', messages));   
    }

    User.findOne({'email':email}, function(err, user){
        if(err){ 
            return done(err);
        }
        if (user) {
            return done(null, false, {message: "Email já cadastrado"})
        }
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.name = req.body.name;
        newUser.endereco = req.body.endereco;
        newUser.telefone = req.body.telefone;
        newUser.save(function(err, result){
            if(err) {
                return done(err);
            }
            return done(null, newUser);
        });  
    });
}));




passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true 
}, (req, email, password, done) => {
    
    // username must be an email
    req.checkBody('email','Email Invalido').notEmpty().isEmail();
    // password must be at least 5 chars long
    req.checkBody('password','Senha Invalida, ela deve possuir mais de 4 caracteres').notEmpty();
    
    
    let errors =  req.validationErrors();
    if(errors){    
        let messages = [];
        errors.forEach((error) => {
            messages.push(error.msg);
            
        });
        return done(null,false, req.flash('error', messages));   
    }

    User.findOne({'email':email}, (err, user) => {
        if(err){ 
            return done(err);
        }
        if (!user) {

            console.log(err)
            return done(null, false, {message: "Usuario não encontrado"})
        }

        // comparando as senhas
        bcrypt.compare(password, user.password, (err, isValid) => {
            if (err) { return done(err) }
            if (!isValid) { return done(null, false, {message: "Senha Incorreta"}) }
            return done(null,user);
        });

    }).select('+password');
      
}))