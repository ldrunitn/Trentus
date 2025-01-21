const express = require('express');
const router = express.Router();

// Controllers
const { validaCredenziali } = require('../controllers/gdsController');
const { creaRichiesta, confermaRichiesta } = require('../controllers/richiestaGdSController');
// const gdsController = require(process.cwd()+'/controllers/gds/gdsController');

// Middleware 
const { usaToken, checkRuolo } = require('../middleware/authMiddleware');

router.post('/login', async (req, res) => {
  // #swagger.description = 'Login GdS'
  /* #swagger.requestBody = {
      content: {
        "application/json": {
          schema:{
            $ref: "#/components/schemas/Login"
          }
        }           
      }
    }   
  */
  validaCredenziali(req,res);
});

router.post('/registrazione', async (req, res) => {
  // #swagger.description = 'Invia una richiesta di registrazione per un GdS'
  /* #swagger.requestBody = {
      content: {
        "application/json": {
          schema:{
            $ref: "#/components/schemas/RichiestaGdS"
          }
        }           
      }
    }   
  */
  creaRichiesta(req,res);
});
 
router.get('/conferma/:richiesta_id', /*usaToken, checkRuolo(['superadmin']),*/ async (req,res)=>{
  // #swagger.description = 'Conferma la richiesta di registrazione per un GdS'
  if(req.headers['authorization'] == "Luca") confermaRichiesta(req, res);
});

router.get('/servizio', usaToken, checkRuolo(['gds']), async (req,res)=>{
  // #swagger.description = 'Restituisce il servizio associato al GdS'
  // #swagger.security = [{ "BearerAuth": ['gds'] }]
  /* #swagger.responses[200] = {
      content: {
        "application/json": {
          schema:{
            $ref: "#/components/schemas/Servizio"
          }
        }           
      }
    }   
  */
  return res.status(200).json({ servizio_id: req.user.servizio_id });
});

module.exports = router;