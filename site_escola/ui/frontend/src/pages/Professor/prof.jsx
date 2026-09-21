import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import "./prof.css";

function Professor() {
  const navigate = useNavigate();

  const [aba, setAba] = useState("inicio");

  const [alunos, setAlunos] = useState([
    {
      id: 1,
      nome: "AGHTA JOICYHELLE RIBEIRO DE SOUSA",
      matricula: "20260001",
      nota1: "",
      nota2: "",
      faltas: 0,
    },
    {
      id: 2,
      nome: "ANA BEATRIZ SILVA",
      matricula: "20260002",
      nota1: "",
      nota2: "",
      faltas: 0,
    },
    {
      id: 3,
      nome: "CARLOS EDUARDO SANTOS",
      matricula: "20260003",
      nota1: "",
      nota2: "",
      faltas: 0,
    },
    {
      id: 4,
      nome: "MARIA VITÓRIA OLIVEIRA",
      matricula: "20260004",
      nota1: "",
      nota2: "",
      faltas: 0,
    },
  ]);

  const [ocorrencias, setOcorrencias] = useState([]);

  const [novaOcorrencia, setNovaOcorrencia] = useState({
    aluno: "",
    tipo: "Comportamento",
    descricao: "",
  });

  function alterarNota(id, campo, valor) {
    setAlunos((lista) =>
      lista.map((aluno) =>
        aluno.id === id
          ? {
              ...aluno,
              [campo]: valor,
            }
          : aluno
      )
    );
  }

  function alterarFalta(id, quantidade) {
    setAlunos((lista) =>
      lista.map((aluno) =>
        aluno.id === id
          ? {
              ...aluno,
              faltas: quantidade,
            }
          : aluno
      )
    );
  }

  function salvarNotas() {
    localStorage.setItem("alunos", JSON.stringify(alunos));
    alert("Notas salvas com sucesso!");
  }

  function registrarOcorrencia(event) {
    event.preventDefault();

    if (
      !novaOcorrencia.aluno ||
      !novaOcorrencia.descricao
    ) {
      alert("Preencha o aluno e a descrição da ocorrência.");
      return;
    }

    const ocorrencia = {
      id: Date.now(),
      ...novaOcorrencia,
      data: new Date().toLocaleDateString("pt-BR"),
    };

    setOcorrencias((lista) => [
      ocorrencia,
      ...lista,
    ]);

    setNovaOcorrencia({
      aluno: "",
      tipo: "Comportamento",
      descricao: "",
    });

    alert("Ocorrência registrada!");
  }

  function sair() {
    localStorage.removeItem("usuario");
    localStorage.removeItem("tipoUsuario");
    navigate("/login");
  }

  return (
    <div className="professor-page">

      <Navbar tipo="professor" />

      <div className="professor-layout">

        {/* MENU LATERAL */}

        <aside className="professor-sidebar">

          <div className="professor-menu-title">
            MENU DO PROFESSOR
          </div>

          <button
            className={
              aba === "inicio"
                ? "menu-professor active"
                : "menu-professor"
            }
            onClick={() => setAba("inicio")}
          >
            🏠
            <span>Início</span>
          </button>

          <button
            className={
              aba === "notas"
                ? "menu-professor active"
                : "menu-professor"
            }
            onClick={() => setAba("notas")}
          >
            📝
            <span>Lançar Notas</span>
          </button>

          <button
            className={
              aba === "faltas"
                ? "menu-professor active"
                : "menu-professor"
            }
            onClick={() => setAba("faltas")}
          >
            📅
            <span>Frequência</span>
          </button>

          <button
            className={
              aba === "ocorrencias"
                ? "menu-professor active"
                : "menu-professor"
            }
            onClick={() => setAba("ocorrencias")}
          >
            ⚠️
            <span>Ocorrências</span>
          </button>

          <div className="sidebar-separador"></div>

          <button
            className="menu-professor sair-menu"
            onClick={sair}
          >
            🚪
            <span>Sair</span>
          </button>

        </aside>

        {/* CONTEÚDO */}

        <main className="professor-content">

          {/* =========================
              INÍCIO
          ========================= */}

          {aba === "inicio" && (
            <>
              <div className="pagina-titulo">
                <div>
                  <h1>Painel do Professor</h1>
                  <p>
                    Bem-vindo ao sistema de gestão escolar.
                  </p>
                </div>
              </div>

              <div className="professor-cards">

                <div
                  className="professor-card"
                  onClick={() => setAba("notas")}
                >
                  <div className="card-icon">📝</div>

                  <div>
                    <h3>Lançar Notas</h3>
                    <p>
                      Adicione e altere as notas dos alunos.
                    </p>
                  </div>
                </div>

                <div
                  className="professor-card"
                  onClick={() => setAba("faltas")}
                >
                  <div className="card-icon">📅</div>

                  <div>
                    <h3>Frequência</h3>
                    <p>
                      Registre a presença e as faltas.
                    </p>
                  </div>
                </div>

                <div
                  className="professor-card"
                  onClick={() => setAba("ocorrencias")}
                >
                  <div className="card-icon">⚠️</div>

                  <div>
                    <h3>Ocorrências</h3>
                    <p>
                      Registre ocorrências dos alunos.
                    </p>
                  </div>
                </div>

              </div>

              <div className="professor-info-box">
                <h2>Resumo da turma</h2>

                <div className="resumo-grid">

                  <div>
                    <strong>{alunos.length}</strong>
                    <span>Alunos</span>
                  </div>

                  <div>
                    <strong>
                      {alunos.filter(
                        (aluno) =>
                          Number(aluno.faltas) > 0
                      ).length}
                    </strong>
                    <span>Com faltas</span>
                  </div>

                  <div>
                    <strong>{ocorrencias.length}</strong>
                    <span>Ocorrências</span>
                  </div>

                </div>
              </div>
            </>
          )}

          {/* =========================
              NOTAS
          ========================= */}

          {aba === "notas" && (
            <section>

              <div className="pagina-titulo">
                <div>
                  <h1>Lançamento de Notas</h1>
                  <p>
                    Informe as notas dos alunos da turma.
                  </p>
                </div>

                <button
                  className="botao-salvar"
                  onClick={salvarNotas}
                >
                  💾 Salvar Notas
                </button>
              </div>

              <div className="filtro-professor">

                <div>
                  <label>Turma</label>

                  <select>
                    <option>
                      1º ANO A - MATUTINO
                    </option>
                    <option>
                      1º ANO B - MATUTINO
                    </option>
                  </select>
                </div>

                <div>
                  <label>Disciplina</label>

                  <select>
                    <option>Matemática</option>
                    <option>Português</option>
                    <option>História</option>
                    <option>Geografia</option>
                    <option>Ciências</option>
                  </select>
                </div>

                <div>
                  <label>Etapa</label>

                  <select>
                    <option>1º Bimestre</option>
                    <option>2º Bimestre</option>
                    <option>3º Bimestre</option>
                    <option>4º Bimestre</option>
                  </select>
                </div>

              </div>

              <div className="tabela-container">

                <table className="tabela-professor">

                  <thead>
                    <tr>
                      <th>Aluno</th>
                      <th>Matrícula</th>
                      <th>Nota 1</th>
                      <th>Nota 2</th>
                      <th>Média</th>
                    </tr>
                  </thead>

                  <tbody>

                    {alunos.map((aluno) => {

                      const n1 =
                        Number(aluno.nota1) || 0;

                      const n2 =
                        Number(aluno.nota2) || 0;

                      const media =
                        (n1 + n2) / 2;

                      return (
                        <tr key={aluno.id}>

                          <td>
                            <strong>
                              {aluno.nome}
                            </strong>
                          </td>

                          <td>
                            {aluno.matricula}
                          </td>

                          <td>
                            <input
                              className="nota-input"
                              type="number"
                              min="0"
                              max="10"
                              step="0.1"
                              value={aluno.nota1}
                              onChange={(e) =>
                                alterarNota(
                                  aluno.id,
                                  "nota1",
                                  e.target.value
                                )
                              }
                            />
                          </td>

                          <td>
                            <input
                              className="nota-input"
                              type="number"
                              min="0"
                              max="10"
                              step="0.1"
                              value={aluno.nota2}
                              onChange={(e) =>
                                alterarNota(
                                  aluno.id,
                                  "nota2",
                                  e.target.value
                                )
                              }
                            />
                          </td>

                          <td>
                            <span
                              className={
                                media >= 6
                                  ? "media-aprovado"
                                  : "media-baixa"
                              }
                            >
                              {media.toFixed(1)}
                            </span>
                          </td>

                        </tr>
                      );
                    })}

                  </tbody>

                </table>

              </div>

            </section>
          )}

          {/* =========================
              FALTAS
          ========================= */}

          {aba === "faltas" && (
            <section>

              <div className="pagina-titulo">

                <div>
                  <h1>Controle de Frequência</h1>
                  <p>
                    Registre as faltas dos alunos.
                  </p>
                </div>

                <button
                  className="botao-salvar"
                  onClick={() => {
                    localStorage.setItem(
                      "alunos",
                      JSON.stringify(alunos)
                    );

                    alert(
                      "Frequência salva com sucesso!"
                    );
                  }}
                >
                  💾 Salvar Frequência
                </button>

              </div>

              <div className="filtro-professor">

                <div>
                  <label>Turma</label>

                  <select>
                    <option>
                      1º ANO A - MATUTINO
                    </option>
                  </select>
                </div>

                <div>
                  <label>Data</label>

                  <input
                    type="date"
                    defaultValue={
                      new Date()
                        .toISOString()
                        .split("T")[0]
                    }
                  />
                </div>

                <div>
                  <label>Disciplina</label>

                  <select>
                    <option>Matemática</option>
                    <option>Português</option>
                    <option>História</option>
                    <option>Geografia</option>
                  </select>
                </div>

              </div>

              <div className="tabela-container">

                <table className="tabela-professor">

                  <thead>
                    <tr>
                      <th>Aluno</th>
                      <th>Matrícula</th>
                      <th>Faltas</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>

                    {alunos.map((aluno) => (
                      <tr key={aluno.id}>

                        <td>
                          <strong>
                            {aluno.nome}
                          </strong>
                        </td>

                        <td>
                          {aluno.matricula}
                        </td>

                        <td>

                          <input
                            className="falta-input"
                            type="number"
                            min="0"
                            value={aluno.faltas}
                            onChange={(e) =>
                              alterarFalta(
                                aluno.id,
                                e.target.value
                              )
                            }
                          />

                        </td>

                        <td>

                          {Number(aluno.faltas) === 0 ? (
                            <span className="status-presente">
                              ✓ Frequência normal
                            </span>
                          ) : (
                            <span className="status-falta">
                              ⚠ {aluno.faltas} falta(s)
                            </span>
                          )}

                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>

            </section>
          )}

          {/* =========================
              OCORRÊNCIAS
          ========================= */}

          {aba === "ocorrencias" && (
            <section>

              <div className="pagina-titulo">

                <div>
                  <h1>Ocorrências</h1>
                  <p>
                    Registre ocorrências relacionadas aos alunos.
                  </p>
                </div>

              </div>

              <div className="ocorrencia-grid">

                <form
                  className="ocorrencia-form"
                  onSubmit={registrarOcorrencia}
                >

                  <h2>Nova ocorrência</h2>

                  <div className="campo-professor">

                    <label>Aluno</label>

                    <select
                      value={novaOcorrencia.aluno}
                      onChange={(e) =>
                        setNovaOcorrencia({
                          ...novaOcorrencia,
                          aluno: e.target.value,
                        })
                      }
                    >
                      <option value="">
                        Selecione o aluno
                      </option>

                      {alunos.map((aluno) => (
                        <option
                          key={aluno.id}
                          value={aluno.nome}
                        >
                          {aluno.nome}
                        </option>
                      ))}

                    </select>

                  </div>

                  <div className="campo-professor">

                    <label>Tipo</label>

                    <select
                      value={novaOcorrencia.tipo}
                      onChange={(e) =>
                        setNovaOcorrencia({
                          ...novaOcorrencia,
                          tipo: e.target.value,
                        })
                      }
                    >
                      <option>
                        Comportamento
                      </option>

                      <option>
                        Atraso
                      </option>

                      <option>
                        Uso inadequado de celular
                      </option>

                      <option>
                        Conflito
                      </option>

                      <option>
                        Desempenho
                      </option>

                      <option>
                        Outro
                      </option>

                    </select>

                  </div>

                  <div className="campo-professor">

                    <label>Descrição</label>

                    <textarea
                      value={novaOcorrencia.descricao}
                      onChange={(e) =>
                        setNovaOcorrencia({
                          ...novaOcorrencia,
                          descricao: e.target.value,
                        })
                      }
                      placeholder="Descreva a ocorrência..."
                      rows="5"
                    />

                  </div>

                  <button
                    type="submit"
                    className="botao-ocorrencia"
                  >
                    ⚠ Registrar Ocorrência
                  </button>

                </form>

                <div className="lista-ocorrencias">

                  <h2>
                    Ocorrências registradas
                  </h2>

                  {ocorrencias.length === 0 ? (
                    <div className="sem-ocorrencias">
                      <span>📋</span>
                      <p>
                        Nenhuma ocorrência registrada.
                      </p>
                    </div>
                  ) : (
                    ocorrencias.map((ocorrencia) => (
                      <div
                        className="ocorrencia-item"
                        key={ocorrencia.id}
                      >

                        <div className="ocorrencia-topo">

                          <strong>
                            {ocorrencia.aluno}
                          </strong>

                          <span>
                            {ocorrencia.data}
                          </span>

                        </div>

                        <span className="ocorrencia-tipo">
                          {ocorrencia.tipo}
                        </span>

                        <p>
                          {ocorrencia.descricao}
                        </p>

                      </div>
                    ))
                  )}

                </div>

              </div>

            </section>
          )}

        </main>

      </div>

    </div>
  );
}

export default Professor;