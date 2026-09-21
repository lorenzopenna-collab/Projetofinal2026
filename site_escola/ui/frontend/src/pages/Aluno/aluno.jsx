import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import "../../App.css";
import "../../pages/Aluno/aluno.css"

export default function Aluno() {
  const navigate = useNavigate();

  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  ) || {
    nome: "AGHTA JOICYHELLE RIBEIRO DE SOUSA",
    matricula: "20260001",
    turma: "1º ANO A - MATUTINO",
  };

  const notas = [
    {
      materia: "Matemática",
      n1: 8.5,
      n2: 7.0,
      media: 7.75,
    },
    {
      materia: "Português",
      n1: 9.0,
      n2: 8.5,
      media: 8.75,
    },
    {
      materia: "Física",
      n1: 6.0,
      n2: 7.5,
      media: 6.75,
    },
    {
      materia: "História",
      n1: 9.5,
      n2: 10.0,
      media: 9.75,
    },
  ];

  const faltas = [
    {
      data: "10",
      mes: "JUN",
      materia: "Matemática",
      aula: "1ª aula",
    },
    {
      data: "18",
      mes: "JUN",
      materia: "Física",
      aula: "2ª aula",
    },
  ];

  const aulas = [
    {
      horario: "07:00",
      materia: "Matemática",
      professor: "Prof. Carlos",
      sala: "Sala 01",
    },
    {
      horario: "08:00",
      materia: "Português",
      professor: "Prof. Ana",
      sala: "Sala 02",
    },
    {
      horario: "09:00",
      materia: "Física",
      professor: "Prof. João",
      sala: "Sala 03",
    },
  ];

  const ocorrencias = [
    {
      titulo: "Aviso escolar",
      descricao:
        "Reunião de pais e responsáveis será realizada na próxima semana.",
      data: "15/06/2026",
    },
  ];

  function sair() {
    localStorage.removeItem("usuario");
    localStorage.removeItem("tipoUsuario");
    navigate("/login");
  }

  return (
    <>
      <Navbar tipo="aluno" />

      <main className="aluno-page">

        {/* CABEÇALHO */}
        <section className="aluno-top">

          <div>
            <h1>
              Olá, {usuario.nome.split(" ")[0]}!
            </h1>

            <p>
              Confira suas informações escolares.
            </p>
          </div>

          <div className="aluno-avatar">
            {usuario.nome.charAt(0)}
          </div>

        </section>

        {/* RESUMO */}
        <section className="aluno-cards">

          <div className="aluno-card">
            <div className="card-icon blue">
              📊
            </div>

            <div>
              <span>Média geral</span>
              <strong>8,25</strong>
            </div>
          </div>

          <div className="aluno-card">
            <div className="card-icon green">
              ✓
            </div>

            <div>
              <span>Frequência</span>
              <strong>92%</strong>
            </div>
          </div>

          <div className="aluno-card">
            <div className="card-icon red">
              !
            </div>

            <div>
              <span>Faltas</span>
              <strong>4</strong>
            </div>
          </div>

          <div className="aluno-card">
            <div className="card-icon orange">
              🔔
            </div>

            <div>
              <span>Avisos</span>
              <strong>1</strong>
            </div>
          </div>

        </section>

        {/* DADOS DO ALUNO */}
        <section className="aluno-secao">

          <div className="aluno-secao-titulo">
            <h2>Dados do aluno</h2>
            <p>Informações da sua matrícula</p>
          </div>

          <div className="aluno-box">

            <div className="box-header">
              <div>
                <h2>{usuario.nome}</h2>

                <p>
                  Aluno regularmente matriculado
                </p>
              </div>
            </div>

            <div className="frequencia-info">

              <div>
                <span>Matrícula</span>
                <strong>{usuario.matricula}</strong>
              </div>

              <div>
                <span>Turma</span>
                <strong>{usuario.turma}</strong>
              </div>

            </div>

          </div>

        </section>

        {/* NOTAS */}
        <section className="aluno-secao">

          <div className="aluno-secao-titulo">
            <h2>Minhas notas</h2>
            <p>Notas e médias das disciplinas</p>
          </div>

          <div className="aluno-box">

            <div className="notas-list">

              {notas.map((nota) => (
                <div
                  className="nota-item"
                  key={nota.materia}
                >

                  <div>
                    <strong>
                      {nota.materia}
                    </strong>

                    <span>
                      N1: {nota.n1} | N2: {nota.n2}
                    </span>
                  </div>

                  <strong
                    className={
                      nota.media >= 7
                        ? "nota boa"
                        : "nota baixa"
                    }
                  >
                    {nota.media}
                  </strong>

                </div>
              ))}

            </div>

          </div>

        </section>

        {/* FREQUÊNCIA */}
        <section className="aluno-secao">

          <div className="aluno-secao-titulo">
            <h2>Minha frequência</h2>
            <p>Acompanhamento da frequência escolar</p>
          </div>

          <div className="aluno-box frequencia-box">

            <div className="box-header">

              <div>
                <h2>Frequência geral</h2>
                <p>Presença nas aulas</p>
              </div>

              <strong className="frequencia-total">
                92%
              </strong>

            </div>

            <div className="frequencia-barra">
              <div style={{ width: "92%" }}></div>
            </div>

            <div className="frequencia-info">

              <div>
                <span>Aulas</span>
                <strong>50</strong>
              </div>

              <div>
                <span>Presenças</span>
                <strong className="green-text">
                  46
                </strong>
              </div>

              <div>
                <span>Faltas</span>
                <strong className="red-text">
                  4
                </strong>
              </div>

            </div>

          </div>

        </section>

        {/* FALTAS */}
        <section className="aluno-secao">

          <div className="aluno-secao-titulo">
            <h2>Últimas faltas</h2>
            <p>Registro das suas ausências</p>
          </div>

          <div className="aluno-box">

            <div className="faltas-list">

              {faltas.map((falta, index) => (
                <div
                  className="falta-item"
                  key={index}
                >

                  <div className="falta-data">
                    <strong>
                      {falta.data}
                    </strong>

                    <span>
                      {falta.mes}
                    </span>
                  </div>

                  <div className="falta-info">
                    <strong>
                      {falta.materia}
                    </strong>

                    <span>
                      {falta.aula}
                    </span>
                  </div>

                  <span className="status-falta">
                    FALTA
                  </span>

                </div>
              ))}

            </div>

          </div>

        </section>

        {/* AULAS */}
        <section className="aluno-secao">

          <div className="aluno-secao-titulo">
            <h2>Aulas de hoje</h2>
            <p>Confira sua programação</p>
          </div>

          <div className="aluno-box">

            <div className="aulas-list">

              {aulas.map((aula, index) => (
                <div
                  className="aula-item"
                  key={index}
                >

                  <div className="aula-hora">
                    {aula.horario}
                  </div>

                  <div className="aula-info">

                    <strong>
                      {aula.materia}
                    </strong>

                    <span>
                      {aula.professor} • {aula.sala}
                    </span>

                  </div>

                  <span className="aula-status">
                    AULA
                  </span>

                </div>
              ))}

            </div>

          </div>

        </section>

        {/* OCORRÊNCIAS / AVISOS */}
        <section className="aluno-secao">

          <div className="aluno-secao-titulo">
            <h2>Avisos e ocorrências</h2>
            <p>Comunicados da escola</p>
          </div>

          <div className="aluno-box">

            <div className="ocorrencias-list">

              {ocorrencias.map((ocorrencia, index) => (
                <div
                  className="ocorrencia-item"
                  key={index}
                >

                  <div className="ocorrencia-icon">
                    !
                  </div>

                  <div className="ocorrencia-info">

                    <strong>
                      {ocorrencia.titulo}
                    </strong>

                    <p>
                      {ocorrencia.descricao}
                    </p>

                    <small>
                      {ocorrencia.data}
                    </small>

                  </div>

                </div>
              ))}

            </div>

          </div>

        </section>

      </main>
    </>
  );
}