const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Model
const Avviso = require('../models/avviso.model');

// Controllers
const { createAvviso, getAvvisi, getAvviso } = require('../controllers/avvisoController');

// Middleware
const { checkRole, usingToken, checkServiceId } = require('../middleware/authMiddleware');

// Restituisce tutti gli avvisi
router.get('/', checkServiceId, async (req, res) => {
  getAvvisi(req, res)
});

// Crea un avviso
router.post('/', usingToken, checkServiceId, checkRole(['gds']), async (req, res) => {
  createAvviso(req, res);
});

// Restituisce l'avviso in base all'id
router.get('/:avviso_id', checkServiceId, async (req, res) => {
  getAvviso(req, res)
});

module.exports = router;