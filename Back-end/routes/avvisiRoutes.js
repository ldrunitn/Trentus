const express = require('express');
const router = express.Router();

// Controllers
const { creaAvviso, getAvvisi, getAvvisoById } = require('../controllers/avvisoController');

// Middleware
const { checkRuolo, usaToken, checkServizioId, CheckDirittiServizio } = require('../middleware/authMiddleware');

// Restituisce tutti gli avvisi
router.get('/', checkServizioId, async (req, res) => {
  getAvvisi(req, res)
});

// Crea un avviso
router.post('/', usaToken, checkServizioId, checkRuolo(['gds']), CheckDirittiServizio, async (req, res) => {
  creaAvviso(req, res);
});

// Restituisce l'avviso in base all'id
router.get('/:avviso_id', checkServizioId, async (req, res) => {
  getAvvisoById(req, res)
});

module.exports = router;