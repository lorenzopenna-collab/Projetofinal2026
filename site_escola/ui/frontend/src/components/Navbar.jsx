import React, { useState } from "react";
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

        <div className="navbar-menu-icon">
          ☰
        </div>

        <span className="navbar-titulo">
          Sistema Integrado de Gestão Escolar
        </span>

      </div>

      <div className="navbar-direita">

        <span className="navbar-escola">
          🏫 SIGE - ESCOLA
        </span>

        <div
          className="navbar-perfil"
          onClick={() =>
            setMenuAberto(!menuAberto)
          }
        >

          <div className="perfil-icone">
            👤
          </div>

          <span>
            {tipo === "professor"
              ? "Professor"
              : "Aluno"}
          </span>

          <span className="perfil-seta">
            ▾
          </span>

          {menuAberto && (
            <div
              className="perfil-dropdown"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <div className="perfil-info">

                <div className="perfil-avatar">
                  👤
                </div>

                <div>
                  <strong>
                    {tipo === "professor"
                      ? "Professor"
                      : "Aluno"}
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
                onClick={sair}
              >
                🚪 Sair
              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}

export default Navbar;