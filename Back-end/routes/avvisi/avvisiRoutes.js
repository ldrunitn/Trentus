const express = require('express');
const router = express.Router();
const Avviso = require('../../model/avviso.model');
const avvisoController = require('../../controllers/avvisoController');
const mongoose = require('mongoose');
const {checkRole, verifyToken} = require('../../middleware/authMiddleware');

// Ritorna tutti gli avvisi
router.get('/', async (req,res)=>{
    try {
        // Ottengo tutti i record della collezione "avvisi" del servizio service_id
        const avvisi = await Avviso.find({servizio_id: new mongoose.Types.ObjectId(req.serviceID)});
    
        // Rispondo con i dati
        res.status(200).json(avvisi);
    } catch (error) {
        res.status(500).json({ message: 'Errore nel recupero dei dati', error: error.message });
    }  
});

router.post('/', verifyToken, checkRole(['gds']), async (req,res) => {
    avvisoController.createAvviso(req, res);
});

router.get('/:avviso_id', async (req, res) => {
    try {
        // Ottengo tutti i record della collezione "avvisi"
        const avvisi = await Avviso.findById(req.params.avviso_id);
        // Rispondo con i dati
        if (!avvisi) {
            return res.status(404).json({ message: 'Avviso non trovato' });
        }
        return res.status(200).json(avvisi);
    } catch (error) {
        return res.status(500).json({ message: 'Errore nel recupero dei dati', error});
    }
});

module.exports = router;