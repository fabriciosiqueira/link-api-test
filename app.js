const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const Handlebars = require('handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressHbs = require('express-handlebars');
const passport = require('passport');
const flash = require('connect-flash');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const bodyParser = require('body-parser');



const Mercadopago = require('mercadopago');


require('dotenv/config');


//DB Connection
const connectDB = require('./src/database/Connection');
connectDB();
//Passport call
require('./config/passport');

//Gerenciamento de Rotas
const routes = require('./routes/index');
const userRoutes = require('./routes/user');
const admRoutes = require('./routes/adm');
const { Mongoose } = require('mongoose');



const app = express();

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout:'layout', extname:".hbs", handlebars: allowInsecurePrototypeAccess(Handlebars)}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(cookieParser());



//session config
app.use(session({
  secret:process.env.SECRET,
  resave: false, 
  saveUninitialized:false,
  store: new MongoStore({
    mongooseConnection:mongoose.connection
  }),
  cookie: {
    maxAge:180 * 60 * 1000
  }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());



/*app.use(express.json());
app.use(express.urlencoded({ extended: false }));*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false,}));

//deve ser a express-validator ^5.3.1 caso seja maior substitua por exatamente essa
app.use(expressValidator())



app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

//middleware da rotas
app.use(async (req,res,next) => {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
})


//routes call, a order delas importam durante o compile
app.use('/user', userRoutes);
app.use('/', routes);
app.use('/adm', admRoutes);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
