const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Define the directory for uploads
const uploadDir = path.join(__dirname, '../public/images');

// Create the directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);  // Set the destination directory
  },
  filename: (req, file, cb) => {
    const uniqueName = uuidv4() + path.extname(file.originalname);  // Generate a unique filename with the extension
    cb(null, uniqueName);  // Set the filename to be the unique one
  }
});

// Initialize multer with custom storage
const upload = multer({ storage: storage });

// Controllers
const { validaCredenziali } = require('../controllers/gdsController');
const { creaRichiesta } = require('../controllers/richiestaGdSController');

// Middleware 
const { usaToken, checkRuolo, CheckDirittiServizio } = require('../middleware/authMiddleware');

// Routes

// Login Route
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
  validaCredenziali(req, res);
});

// Registration Route (upload image)
router.post('/registrazione', upload.single('foto'), async (req, res) => {
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
  // Now you can handle the 'foto' file here and save it in the database.
  creaRichiesta(req, res);
});

// Get the service associated with the GdS
router.get('/servizio', usaToken, checkRuolo(['gds']), async (req, res) => {
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
