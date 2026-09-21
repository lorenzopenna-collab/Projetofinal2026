import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // <--- Adicione esta linha (ou ajuste a importação do React)
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [tipo, setTipo] = useState("aluno");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  function trocarTipo(novoTipo) {
    setTipo(novoTipo);
    setLogin("");
    setSenha("");
    setMostrarSenha(false);
  }

  function entrar(event) {
    event.preventDefault();

    if (!login || !senha) {
      alert("Preencha o login e a senha.");
      return;
    }

    // =========================
    // LOGIN DO ALUNO
    // =========================
    if (tipo === "aluno") {
      if (login === "aghta@escola" && senha === "123456") {
        const usuario = {
          tipo: "aluno",
          nome: "AGHTA JOICYHELLE RIBEIRO DE SOUSA",
          matricula: "20260001",
          turma: "1º ANO A - MATUTINO",
        };

        localStorage.setItem(
          "usuario",
          JSON.stringify(usuario)
        );

        localStorage.setItem("tipoUsuario", "aluno");

        navigate("/aluno");
      } else {
        alert("E-mail ou senha do aluno incorretos.");
      }

      return;
    }

    // =========================
    // LOGIN DO PROFESSOR
    // =========================
    if (tipo === "professor") {
      if (login === "12345678900" && senha === "123456") {
        const usuario = {
          tipo: "professor",
          nome: "Professor Carlos",
        };

        localStorage.setItem(
          "usuario",
          JSON.stringify(usuario)
        );

        localStorage.setItem("tipoUsuario", "professor");

        navigate("/professor");
      } else {
        alert("CPF ou senha do professor incorretos.");
      }
    }
  }

  return (
    <main className="login-page">

      <div className="login-background">
        <div className="login-shape shape-one"></div>
        <div className="login-shape shape-two"></div>
      </div>

      <section className="login-container">

        {/* LOGO */}
        <div className="login-brand">
          <div className="brand-icon">
            SIGE
          </div>

          <div>
            <h1>SIGE</h1>
            <span>
              Sistema Integrado de Gestão Escolar
            </span>
          </div>
        </div>

        {/* CARD */}
        <div className="login-card">

          <div className="login-header">
            <h2>Acesso ao sistema</h2>
            <p>
              Selecione seu tipo de acesso
            </p>
          </div>

          {/* ALUNO / PROFESSOR */}
          <div className="login-tabs">

            <button
              type="button"
              className={
                tipo === "aluno"
                  ? "login-tab active"
                  : "login-tab"
              }
              onClick={() => trocarTipo("aluno")}
            >
              <span>👨‍🎓</span>
              <strong>Aluno</strong>
            </button>

            <button
              type="button"
              className={
                tipo === "professor"
                  ? "login-tab active"
                  : "login-tab"
              }
              onClick={() => trocarTipo("professor")}
            >
              <span>👨‍🏫</span>
              <strong>Professor</strong>
            </button>

          </div>

          {/* TÍTULO */}
          <div className="tipo-login">

            {tipo === "aluno" ? (
              <>
                <h3>Área do Aluno</h3>
                <p>
                  Entre com seu e-mail escolar
                </p>
              </>
            ) : (
              <>
                <h3>Área do Professor</h3>
                <p>
                  Entre com seu CPF e senha
                </p>
              </>
            )}

          </div>

          {/* FORMULÁRIO */}
          <form onSubmit={entrar}>

            {/* LOGIN */}
            <div className="input-group">

              <label>
                {tipo === "aluno"
                  ? "E-mail escolar"
                  : "CPF"}
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  {tipo === "aluno"
                    ? "✉️"
                    : "👤"}
                </span>

                <input
                  type={
                    tipo === "aluno"
                      ? "email"
                      : "text"
                  }
                  value={login}
                  onChange={(e) =>
                    setLogin(e.target.value)
                  }
                  placeholder={
                    tipo === "aluno"
                      ? "aghta@escola"
                      : "000.000.000-00"
                  }
                />

              </div>

              {tipo === "aluno" && (
                <small>
                  Use seu endereço com @escola
                </small>
              )}

              {tipo === "professor" && (
                <small>
                  Digite somente os números do CPF
                </small>
              )}

            </div>

            {/* SENHA */}
            <div className="input-group">

              <label>
                Senha
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  🔒
                </span>

                <input
                  type={
                    mostrarSenha
                      ? "text"
                      : "password"
                  }
                  value={senha}
                  onChange={(e) =>
                    setSenha(e.target.value)
                  }
                  placeholder="Digite sua senha"
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() =>
                    setMostrarSenha(!mostrarSenha)
                  }
                >
                  {mostrarSenha
                    ? "Ocultar"
                    : "Mostrar"}
                </button>

              </div>

            </div>

            {/* OPÇÕES */}
            <div className="login-options">

              <label className="remember">
                <input type="checkbox" />
                <span>
                  Manter conectado
                </span>
              </label>

              <button
                type="button"
                className="forgot"
                onClick={() =>
                  alert(
                    "Entre em contato com a secretaria da escola para recuperar sua senha."
                  )
                }
              >
                Esqueci minha senha
              </button>

            </div>

            {/* BOTÃO ENTRAR */}
            <button
              type="submit"
              className="login-button"
            >
              ENTRAR
              <span>→</span>
            </button>

          </form>

          {/* DADOS PARA TESTE */}
          <div className="demo-box">

            <strong>
              Dados para teste
            </strong>

            {tipo === "aluno" ? (
              <>
                <span>
                  E-mail: <b>aghta@escola</b>
                </span>

                <span>
                  Senha: <b>123456</b>
                </span>
              </>
            ) : (
              <>
                <span>
                  CPF: <b>12345678900</b>
                </span>

                <span>
                  Senha: <b>123456</b>
                </span>
              </>
            )}

          </div>

        </div>

        {/* RODAPÉ */}
        <footer className="login-footer">
          © 2026 SIGE - Sistema Integrado de Gestão Escolar
        </footer>

      </section>

    </main>
  );
}