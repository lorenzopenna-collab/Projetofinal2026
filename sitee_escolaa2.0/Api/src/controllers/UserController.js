import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

class AuthController {
  // =========================
  // LOGIN
  // =========================

  async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({
          message: "E-mail e senha são obrigatórios.",
        });
      }

      const user = await User.findOne({
        where: {
          email: email.toLowerCase().trim(),
        },
      });

      if (!user) {
        return res.status(401).json({
          message: "E-mail ou senha incorretos.",
        });
      }

      if (!user.ativo) {
        return res.status(403).json({
          message: "Esta conta está desativada.",
        });
      }

      const senhaValida = await bcrypt.compare(
        senha,
        user.senha
      );

      if (!senhaValida) {
        return res.status(401).json({
          message: "E-mail ou senha incorretos.",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "8h",
        }
      );

      return res.status(200).json({
        message: "Login realizado com sucesso.",

        token,

        user: {
          id: user.id,
          nome: user.nome,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Erro ao realizar login.",
      });
    }
  }

  // =========================
  // CADASTRO
  // =========================

  async register(req, res) {
    try {
      const {
        nome,
        email,
        senha,
        role,
      } = req.body;

      if (!nome || !email || !senha) {
        return res.status(400).json({
          message: "Nome, e-mail e senha são obrigatórios.",
        });
      }

      const tipoUsuario = role || "aluno";

      if (
        tipoUsuario !== "aluno" &&
        tipoUsuario !== "professor"
      ) {
        return res.status(400).json({
          message: "Tipo de usuário inválido.",
        });
      }

      const emailNormalizado = email
        .toLowerCase()
        .trim();

      const usuarioExistente = await User.findOne({
        where: {
          email: emailNormalizado,
        },
      });

      if (usuarioExistente) {
        return res.status(409).json({
          message: "Este e-mail já está cadastrado.",
        });
      }

      const senhaHash = await bcrypt.hash(
        senha,
        10
      );

      const user = await User.create({
        nome,
        email: emailNormalizado,
        senha: senhaHash,
        role: tipoUsuario,
      });

      return res.status(201).json({
        message: "Usuário criado com sucesso.",

        user: {
          id: user.id,
          nome: user.nome,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Erro ao criar usuário.",
      });
    }
  }

  // =========================
  // USUÁRIO LOGADO
  // =========================

  async me(req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: [
          "id",
          "nome",
          "email",
          "role",
          "ativo",
        ],
      });

      if (!user) {
        return res.status(404).json({
          message: "Usuário não encontrado.",
        });
      }

      return res.json(user);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Erro ao buscar usuário.",
      });
    }
  }
}

export default new AuthController();