const StudentModel = require('../models/User.js');


class StudentController {
  async obterAluno(req, res) {
    try {
      const dados = await StudentModel.obterDados();
      return res.status(200).json(dados);
    } catch (erro) {
      return res.status(500).json({ erro: 'Erro ao buscar dados do aluno.' });
    }
  }

  // Novo método para buscar a grade de aulas/calendário
  async obterCalendario(req, res) {
    try {
      // Exemplo de retorno estruturado por datas
      const calendario = await StudentModel.obterCalendario(); 
      return res.status(200).json(calendario);
    } catch (erro) {
      return res.status(500).json({ erro: 'Erro ao buscar calendário de aulas.' });
    }
  }
}

module.exports = new StudentController();