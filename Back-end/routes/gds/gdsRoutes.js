const express = require('express');
// const gdsController = require(process.cwd()+'/controllers/gds/gdsController');
const { verifyToken, checkRole, verifyTokenAndCheckId } = require('../../middleware/authMiddleware');
const router = express.Router();
const { validateCredentials, confirmRequest } = require('../../controllers/gdsController');
const { createRequest } = require('../../controllers/richiestaGdSController');

// login GdS
router.post('/login', async (req, res) => {
  validateCredentials(req,res);
});
//pai per mandare la richiesta di registrazione
router.post('/registrazione', async (req, res) => {
  createRequest(req,res);
});

//conferma della request
router.get('/:id/conferma', verifyToken, checkRole(['superadmin']), async (req,res)=>{
  const requestID = req.params.id;
  confirmRequest(requestID, res);
});


module.exports = router;