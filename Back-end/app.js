const express = require('express');
const app = express();

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
const indexRouter = require('./routes/index');

// impostazione della view
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// impostazione delle routes
app.use('/avvisi', avvisiRoutes);
app.use('/gds', gdsRoutes);
app.use('/segnalazioni', segnalazioniRoutes);
app.use('/servizi', serviziRoutes);
app.use('/sondaggi', sondaggiRoutes);
app.use('/utente', utenteRoutes);
app.use('/login', loginRoutes);

// cose dell'express-generator qui sotto
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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
