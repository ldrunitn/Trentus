const express = require('express');
// const gdsController = require(process.cwd()+'/controllers/gds/gdsController');
const { verifyToken, checkRole } = require('../../middleware/authMiddleware');
const router = express.Router();
const { generateRequest, validateCredential, confirmRequest } = require('../../controllers/gdsController');

// login GdS
router.post('/login', async (req, res) => {
  validateCredentials(req,res);
});
//pai per mandare la richiesta di registrazione
router.post('/registrazione', async (req, res) => {
  generateRequest(req,res);
});
//devo confermare la richiesta quindi
//1) Creare il gds nel database
//2) Creare anche il servizio corrispondente
//3) Mettere la richiesta a confermata
router.get('/:id/conferma', verifyToken, checkRole(['superadmin']), async (req,res)=>{
  const requestID = req.params.id;
  confirmRequest(requestID, res);
});

module.exports = router;