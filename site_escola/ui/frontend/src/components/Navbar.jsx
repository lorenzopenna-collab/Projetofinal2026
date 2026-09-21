import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ tipo = "aluno" }) {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  const sair = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("tipoUsuario");

    navigate("/login");
  };

  return (
    <header className="navbar">

      <div className="navbar-esquerda">

        <div className="navbar-logo">
          SIGE
        </div>

        <button
          className="navbar-menu-icon"
          type="button"
          aria-label="Abrir menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <span className="navbar-titulo">
          Sistema Integrado de Gestão Escolar
        </span>

      </div>

      <div className="navbar-direita">

        <span className="navbar-escola">
          SIGE - ESCOLA
        </span>

        <div className="navbar-perfil">

          <button
            className="perfil-botao"
            type="button"
            onClick={() => setMenuAberto(!menuAberto)}
          >

            <div className="perfil-icone">
              <span></span>
            </div>

            <span className="perfil-nome">
              {tipo === "professor" ? "Professor" : "Aluno"}
            </span>

            <span className="perfil-seta">
              {menuAberto ? "⌃" : "⌄"}
            </span>

          </button>

          {menuAberto && (
            <div className="perfil-dropdown">

              <div className="perfil-info">

                <div className="perfil-avatar">
                  <span></span>
                </div>

                <div>
                  <strong>
                    {tipo === "professor" ? "Professor" : "Aluno"}
                  </strong>

                  <small>
                    {tipo === "professor"
                      ? "Área do professor"
                      : "Área do aluno"}
                  </small>
                </div>

              </div>

              <button
                className="botao-sair"
                type="button"
                onClick={sair}
              >
                <span className="icone-sair">↪</span>
                Sair
              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}

export default Navbar;