const { Router } = require('express');
const AbsencesController = require('../controllers/AbsencesController.js');

const router = Router();

// Listar todas as faltas do aluno
router.get('/faltas', AbsencesController.listarFaltas);

// Registrar falta em uma data específica
router.post('/faltas', AbsencesController.registrarFalta);

module.exports = router;