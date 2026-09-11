const Absence = require('../models/Absence.js');
const Student = require('../models/Student.js');
const { Op } = require('sequelize');

module.exports = {
  // Listar faltas com filtros (período, matéria, status) e paginação
  async index(req, res) {
    try {
      const { student_id, startDate, endDate, subject, status, limit = 10, page = 1 } = req.query;
      const where = {};

      if (student_id) where.student_id = student_id;
      if (subject) where.subject = subject;
      if (status) where.status = status; // Ex: 'pending', 'approved', 'rejected'

      if (startDate && endDate) {
        where.date = { [Op.between]: [startDate, endDate] };
      }

      const offset = (page - 1) * limit;

      const { count, rows: absences } = await Absence.findAndCountAll({
        where,
        limit: Number(limit),
        offset: Number(offset),
        order: [['date', 'DESC']],
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['id', 'name', 'matricula'],
          },
        ],
      });

      return res.json({
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: Number(page),
        absences,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar faltas.' });
    }
  },

  // Resumo de contadores para alimentar cards/badges na interface
  async summary(req, res) {
    try {
      const { student_id } = req.params;

      const total = await Absence.count({ where: { student_id } });
      const approved = await Absence.count({ where: { student_id, status: 'approved' } });
      const pending = await Absence.count({ where: { student_id, status: 'pending' } });
      const rejected = await Absence.count({ where: { student_id, status: 'rejected' } });

      return res.json({
        total,
        approved,
        pending,
        rejected,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao calcular resumo de faltas.' });
    }
  },

  // Cadastrar nova falta com suporte a anexo de atestado
  async store(req, res) {
    try {
      const { student_id, date, subject, reason, document_url } = req.body;

      const student = await Student.findByPk(student_id);
      if (!student) {
        return res.status(404).json({ error: 'Estudante não encontrado.' });
      }

      const absence = await Absence.create({
        student_id,
        date,
        subject,
        status: reason || document_url ? 'pending' : 'rejected',
        reason: reason || null,
        document_url: document_url || null,
      });

      return res.status(201).json(absence);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao registrar falta.' });
    }
  },

  // Atualizar status da justificativa (acionado por botões "Aprovar" / "Rejeitar")
  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status, reason, document_url } = req.body;

      const absence = await Absence.findByPk(id);
      if (!absence) {
        return res.status(404).json({ error: 'Registro de falta não encontrado.' });
      }

      await absence.update({
        status: status ?? absence.status,
        reason: reason ?? absence.reason,
        document_url: document_url ?? absence.document_url,
      });

      return res.json(absence);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao atualizar falta.' });
    }
  },

  // Remover falta
  async delete(req, res) {
    try {
      const { id } = req.params;

      const absence = await Absence.findByPk(id);
      if (!absence) {
        return res.status(404).json({ error: 'Registro de falta não encontrado.' });
      }

      await absence.destroy();
      return res.json({ message: 'Registro de falta removido com sucesso.' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao remover falta.' });
    }
  },
};