const express = require('express');
const router = express.Router();

// Controllers
const { getServizi, getServizio } = require('../controllers/servizioController');
// const serviziController = require(process.cwd()+'/controllers/servizi/serviziController');

// Middleware
const { checkServizioId, SIDSave } = require('../middleware/authMiddleware');

// Restituisce tutti i servizi
router.get('/', async (req, res) => {
  getServizi(req,res);
})

// Restituisce servizio in base al suo id
router.get('/:servizio_id', SIDSave, checkServizioId, async (req,res)=>{
  getServizio(req,res);
});

module.exports = router;