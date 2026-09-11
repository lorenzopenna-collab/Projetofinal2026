class AbsenceModel {
  constructor() {
    this.faltas = ['2026-02-10', '2026-03-15', '2026-05-04', '2026-08-20'];
  }

  listarTodas() {
    return this.faltas;
  }

  adicionarFalta(data) {
    if (!this.faltas.includes(data)) {
      this.faltas.push(data);
    }
    return this.faltas;
  }
}

module.exports = new AbsenceModel();