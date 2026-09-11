const { Router } = require('express');
const GradesController = require('../controllers/GradesController.js');

const router = Router();

// Listar boletim de notas
router.get('/notas', GradesController.listarNotas);

module.exports = router;