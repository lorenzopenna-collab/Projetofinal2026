class GradeModel {
  constructor() {
    this.notas = [
      { id: 1, materia: 'Matemática', n1: 8.5, n2: 7.0, media: 7.75 },
      { id: 2, materia: 'Português', n1: 9.0, n2: 8.5, media: 8.75 },
      { id: 3, materia: 'Física', n1: 6.0, n2: 7.5, media: 6.75 },
      { id: 4, materia: 'História', n1: 9.5, n2: 10.0, media: 9.75 }
    ];
  }

  listarTodas() {
    return this.notas;
  }
}

module.exports = new GradeModel();