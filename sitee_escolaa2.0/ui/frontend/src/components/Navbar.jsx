import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ tipo = "aluno" }) {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  const isProfessor = tipo === "professor";

  const nomeUsuario = isProfessor ? "Professor" : "Aluno";

  const areaUsuario = isProfessor
    ? "Área do professor"
    : "Área do aluno";

  const sair = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("tipoUsuario");

    setMenuAberto(false);

    navigate("/login");
  };

  const abrirMenu = () => {
    setMenuAberto((aberto) => !aberto);
  };

  return (
    <header className="navbar">

      {/* LADO ESQUERDO */}
      <div className="navbar-esquerda">

        <div className="navbar-logo">
          SIGE
        </div>

        <button
          type="button"
          className="navbar-menu-icon"
          aria-label="Abrir menu"
        >
          ☰
        </button>

        <span className="navbar-titulo">
          Sistema Integrado de Gestão Escolar
        </span>

      </div>


      {/* LADO DIREITO */}
      <div className="navbar-direita">

        <span className="navbar-escola">
          SELD - Sistema Educacional
        </span>


        {/* PERFIL */}
        <div className="navbar-perfil">

          <button
            type="button"
            className="perfil-botao"
            onClick={abrirMenu}
            aria-expanded={menuAberto}
            aria-haspopup="true"
          >

            <div className="perfil-icone">
              👤
            </div>

            <span className="perfil-nome">
              {nomeUsuario}
            </span>

            <span className="perfil-seta">
              {menuAberto ? "▴" : "▾"}
            </span>

          </button>


          {/* DROPDOWN */}
          {menuAberto && (
            <div
              className="perfil-dropdown"
              onClick={(e) => e.stopPropagation()}
            >

              <div className="perfil-info">

                <div className="perfil-avatar">
                  👤
                </div>

                <div className="perfil-dados">

                  <strong>
                    {nomeUsuario}
                  </strong>

                  <small>
                    {areaUsuario}
                  </small>

                </div>

              </div>


              <button
                type="button"
                className="botao-sair"
                onClick={sair}
              >
                🚪
                <span>Sair</span>
              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}

export default Navbar;