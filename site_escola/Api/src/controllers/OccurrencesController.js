const Occurrence = require("../models/Occurrences.js");

class OccurrencesController {
  // Buscar ocorrências de um aluno
  async buscarPorAluno(req, res) {
    try {
      const { alunoId } = req.params;

      const ocorrencias = await Occurrence.findAll({
        where: {
          alunoId,
        },
        order: [["createdAt", "DESC"]],
      });

      return res.status(200).json(ocorrencias);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        mensagem: "Erro ao buscar ocorrências do aluno.",
      });
    }
  }

  // Buscar ocorrências de uma turma
  async buscarPorTurma(req, res) {
    try {
      const { turmaId } = req.params;

      const ocorrencias = await Occurrence.findAll({
        where: {
          turmaId,
        },
        order: [["createdAt", "DESC"]],
      });

      return res.status(200).json(ocorrencias);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        mensagem: "Erro ao buscar ocorrências da turma.",
      });
    }
  }

  // Criar ocorrência
  async criar(req, res) {
    try {
      const {
        alunoId,
        turmaId,
        professorId,
        tipo,
        descricao,
        data,
      } = req.body;

      if (!alunoId || !descricao) {
        return res.status(400).json({
          mensagem: "Aluno e descrição são obrigatórios.",
        });
      }

      const ocorrencia = await Occurrence.create({
        alunoId,
        turmaId,
        professorId,
        tipo,
        descricao,
        data,
      });

      return res.status(201).json(ocorrencia);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        mensagem: "Erro ao registrar ocorrência.",
      });
    }
  }

  // Atualizar ocorrência
  async atualizar(req, res) {
    try {
      const { id } = req.params;

      const ocorrencia = await Occurrence.findByPk(id);

      if (!ocorrencia) {
        return res.status(404).json({
          mensagem: "Ocorrência não encontrada.",
        });
      }

      await ocorrencia.update(req.body);

      return res.status(200).json(ocorrencia);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        mensagem: "Erro ao atualizar ocorrência.",
      });
    }
  }

  // Excluir ocorrência
  async excluir(req, res) {
    try {
      const { id } = req.params;

      const ocorrencia = await Occurrence.findByPk(id);

      if (!ocorrencia) {
        return res.status(404).json({
          mensagem: "Ocorrência não encontrada.",
        });
      }

      await ocorrencia.destroy();

      return res.status(200).json({
        mensagem: "Ocorrência excluída com sucesso.",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        mensagem: "Erro ao excluir ocorrência.",
      });
    }
  }
}

module.exports = new OccurrencesController();