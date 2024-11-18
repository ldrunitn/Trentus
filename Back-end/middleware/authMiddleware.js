const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET

// Funzione per generare un token JWT
exports.generateToken = (user, ruolo) => {
  return jwt.sign({ id: user.id, username: user.username, role: ruolo }, SECRET_KEY, { expiresIn: '3h' });
};

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'Token mancante' });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Aggiunge i dati dell'utente alla richiesta
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token non valido' });
  }
};
//middleware che controlla che il ruolo dell'utente che cerca di accedere sia quello specificato
exports.checkRole = (roles) => { 
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Accesso negato. Non hai i permessi per questa azione.' });
    }
    next(); // Passa al prossimo middleware o al controller della rotta
  };
};