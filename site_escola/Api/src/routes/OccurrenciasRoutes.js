const express = require("express");

const router = express.Router();

const OccurrencesController = require(
  "../controllers/OccurrencesController"
);

// Aluno
router.get(
  "/aluno/:alunoId",
  OccurrencesController.buscarPorAluno
);

// Turma
router.get(
  "/turma/:turmaId",
  OccurrencesController.buscarPorTurma
);

// Professor
router.post(
  "/",
  OccurrencesController.criar
);

router.put(
  "/:id",
  OccurrencesController.atualizar
);

router.delete(
  "/:id",
  OccurrencesController.excluir
);

module.exports = router;