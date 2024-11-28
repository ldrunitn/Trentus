const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Model
const Avviso = require('../models/avviso.model');

// Controllers
const { createAvviso } = require('../controllers/avvisoController');

// Middleware
const { checkRole, verifyTokenAndCheckServiceId } = require('../middleware/authMiddleware');

// Restituisce tutti gli avvisi
router.get('/', async (req, res) => {
  try {
    const avvisi = await Avviso.find({ servizio_id: new mongoose.Types.ObjectId(req.service_id) });
    res.status(200).json(avvisi);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero dei dati', error: error.message });
  }
});

// Crea un avviso
router.post('/', verifyTokenAndCheckServiceId, checkRole(['gds']), async (req, res) => {
  createAvviso(req, res);
});

// Restituisce l'avviso in base all'id
router.get('/:avviso_id', async (req, res) => {
  try {
    const avvisi = await Avviso.findById(req.params.avviso_id);
    return res.status(200).json(avvisi);
  } catch (error) {
    return res.status(500).json({ message: 'Errore nel recupero dei dati', error });
  }
});

module.exports = router;