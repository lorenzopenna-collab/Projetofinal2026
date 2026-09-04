# React + Vite
# 🎓 Portal Escolar

<div align="center">

## 📚 Sistema de Gestão Escolar

Sistema web para gerenciamento de **notas, faltas e ocorrências**, com acesso separado para **alunos e professores**.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![React](https://img.shields.io/badge/React-Frontend-blue)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Sequelize](https://img.shields.io/badge/Sequelize-Database-orange)

</div>

---

## 🖥️ Sobre o projeto

O **Portal Escolar** é um sistema desenvolvido para facilitar o gerenciamento das informações escolares.

O sistema possui dois tipos de usuários:

🎓 **Aluno**

👨‍🏫 **Professor**

Cada usuário possui diferentes permissões.

---

## ✨ Funcionalidades

### 🎓 Aluno

O aluno pode:

- 📊 Visualizar notas
- 📅 Visualizar faltas
- 📝 Visualizar ocorrências
- 🔐 Fazer login
- 🚪 Sair da conta

### 👨‍🏫 Professor

O professor pode:

- 📊 Cadastrar notas
- ✏️ Editar notas
- 🗑️ Excluir notas
- 📅 Registrar faltas
- ✏️ Editar faltas
- 🗑️ Excluir faltas
- 📝 Registrar ocorrências
- ✏️ Editar ocorrências
- 🗑️ Excluir ocorrências

---

## 🔐 Sistema de acesso

| Usuário | Login | Permissões |
|---|---|---|
| 🎓 Aluno | E-mail + senha | Visualização |
| 👨‍🏫 Professor | CPF + senha | Cadastrar, editar e excluir |

---

## 🛠️ Tecnologias utilizadas

### Frontend

- ⚛️ React
- 🟨 JavaScript
- 🎨 CSS
- 🌐 Fetch API
- 💾 LocalStorage

### Backend

- 🟢 Node.js
- 🚂 Express
- 🗄️ Sequelize
- 🔗 API REST

---

## 📁 Estrutura do projeto

```text
PortalEscolar/
│
├── Api/
│   └── src/
│       ├── controllers/
│       │   ├── AbsencesController.js
│       │   ├── GradesController.js
│       │   ├── OccurrencesController.js
│       │   └── UserController.js
│       │
│       ├── database/
│       │   └── connection.js
│       │
│       ├── models/
│       │   ├── Absence.js
│       │   ├── Grade.js
│       │   ├── Occurrence.js
│       │   └── User.js
│       │
│       ├── routes/
│       │   ├── AbsencesRoutes.js
│       │   ├── AuthRoutes.js
│       │   ├── GradesRoutes.js
│       │   ├── OccurrencesRoutes.js
│       │   └── index.js
│       │
│       └── server.js
│
└── src/
    ├── pages/
    │   ├── Aluno/
    │   │   ├── Home.jsx
    │   │   ├── Notas.jsx
    │   │   ├── Faltas.jsx
    │   │   └── Ocorrencias.jsx
    │   │
    │   ├── Professor/
    │   │   ├── Home.jsx
    │   │   ├── Notas.jsx
    │   │   ├── Faltas.jsx
    │   │   └── Ocorrencias.jsx
    │   │
    │   └── Login/
    │       ├── Login.jsx
    │       └── Login.css
    │
    ├── services/
    │   ├── authService.js
    │   ├── faltaService.js
    │   ├── notaService.js
    │   └── ocorrenciaService.js
    │
    ├── App.jsx
    ├── App.css
    └── main.jsx