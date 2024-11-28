// Imposatzione Express 
const express = require('express');
const app = express();

// Impostazione Database
const db = require('./models/db');

// Cookie Parser (automatico)
const cookieParser = require('cookie-parser');

const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');

// Prelevo le routes
const avvisiRoutes = require('./routes/avvisiRoutes');
const gdsRoutes = require('./routes/gdsRoutes');
const segnalazioniRoutes = require('./routes/segnalazioniRoutes');
const serviziRoutes = require('./routes/serviziRoutes');
const sondaggiRoutes = require('./routes/sondaggiRoutes');
const utenteRoutes = require('./routes/utenteRoutes');
const indexRouter = require('./routes/index');

// Impostazione della view
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Cose dell'express-generator qui
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

// Funzione per mantenere il :service_id tra le routes
const SIDSave = (req, res, next) => {
  req.service_id = req.params.id;
  next();
};
// Impostazione delle routes (l'ordinamento è importante)
app.use('/servizi/:id/avvisi', SIDSave, avvisiRoutes);
app.use('/servizi/:id/sondaggi', SIDSave, sondaggiRoutes);
app.use('/servizi/:id/segnalazioni', SIDSave, segnalazioniRoutes);
app.use('/servizi', serviziRoutes);
app.use('/gds', gdsRoutes);
app.use('/utente', utenteRoutes);

// Gestore errore 404
app.use(function (req, res, next) {
  next(createError(404));
});

// Gestore degli errori (automatico)
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Apro la connessione in locale
const server = app.listen(8080, function () {
  console.log("App attiva sulla porta 8080");
});

// Rotte attive
const listEndpoints = require('express-list-endpoints');
console.log(listEndpoints(app));

module.exports = app;
