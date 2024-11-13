// Express setup
const express = require('express');
const app = express();

// Database setup (for now to check whether everyhing works)
const db = require('./model/db');

const cookieParser = require('cookie-parser');

const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');

const avvisiRoutes = require('./routes/avvisi/avvisiRoutes');
const gdsRoutes = require('./routes/gds/gdsRoutes');
const segnalazioniRoutes = require('./routes/segnalazioni/segnalazioniRoutes');
const serviziRoutes = require('./routes/servizi/serviziRoutes');
const sondaggiRoutes = require('./routes/sondaggi/sondaggiRoutes');
const utenteRoutes = require('./routes/utente/utenteRoutes');
const loginRoutes = require('./routes/login/loginRoutes');
const registerRoutes = require('./routes/register/registerRoutes')
const indexRouter = require('./routes/index');

// impostazione della view
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// cose dell'express-generator qui
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

// impostazione delle routes
app.use('/avvisi', avvisiRoutes);
app.use('/gds', gdsRoutes);
app.use('/segnalazioni', segnalazioniRoutes);
app.use('/servizi', serviziRoutes);
app.use('/sondaggi', sondaggiRoutes);
app.use('/utente', utenteRoutes);
app.use('/login', loginRoutes);
app.use('/registrazione', registerRoutes);




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
const server = app.listen(8080, function(){
  console.log("Funziona!");
})
// Database connection check

const listEndpoints = require('express-list-endpoints');

console.log(listEndpoints(app)); // rotte attive

module.exports = app;
