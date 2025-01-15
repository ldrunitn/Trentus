const express = require('express');
const router = express.Router();

// Controllers
const { getServizi, getServizio } = require('../controllers/servizioController');
// const serviziController = require(process.cwd()+'/controllers/servizi/serviziController');

// Middleware
const { checkServizioId, SIDSave } = require('../middleware/authMiddleware');

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

module.exports = router;