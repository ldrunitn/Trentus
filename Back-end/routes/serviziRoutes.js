const express = require('express');
const router = express.Router();

// Controllers
const { getServizi, getServizio, servizioOn } = require('../controllers/servizioController');
// const serviziController = require(process.cwd()+'/controllers/servizi/serviziController');

// Middleware
const { checkServizioId, SIDSave, usaToken, checkRuolo,CheckDirittiServizio } = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
  // #swagger.description = 'Restituisce tutti i servizi'
  /* #swagger.responses[200] = {
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Servizio"
            }
          }
        }           
      }
    }   
  */
  getServizi(req,res);
})

router.get('/:servizio_id', SIDSave, checkServizioId, async (req,res)=>{
  // #swagger.description = 'Restituisce servizio in base al suo id'
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
  getServizio(req,res);
});

router.post('/:servizio_id/riabilita', SIDSave, usaToken, checkServizioId, checkRuolo(['gds']), CheckDirittiServizio, async (req,res)=>{
  // #swagger.description = 'Servizio ON'
  // #swagger.security = [{ "BearerAuth": ['gds'] }]  
  servizioOn(req,res);
});

module.exports = router;