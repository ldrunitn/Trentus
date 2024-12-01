const express = require('express');
const router = express.Router();

// Model
const Servizio = require('../models/servizio.model');

// Controllers
const { getServizi, getServizio } = require('../controllers/servizioController')
// const serviziController = require(process.cwd()+'/controllers/servizi/serviziController');

// Restituisce tutti i servizi
router.get('/', async (req, res) => {
  getServizi(req,res);
})

// Restituisce servizio in base al suo id
router.get('/:id', async (req,res)=>{
  getServizio(req,res);
});

module.exports = router;