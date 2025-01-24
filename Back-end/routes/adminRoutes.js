const express = require('express');
const router = express.Router();

// Controllers
const { verificaCredenziali } = require('../controllers/adminController');
// Middleware 
const { usaToken, checkRuolo } = require('../middleware/authMiddleware');

router.post('/login', async (req, res) => {
  // #swagger.description = 'Login Superadmin'
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
  verificaCredenziali(req,res);
});

module.exports = router;