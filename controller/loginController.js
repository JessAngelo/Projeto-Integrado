const alunoModel = require("../models/alunoModel");
const professorModel = require("../models/professorModel");
const colaboradorModel = require("../models/colaboradorModel");
const paisModel = require("../models/paisModel");

class LoginController {
    loginView(req, res) {
        res.render('login.ejs', { layout: false });
    }

    async login(req, res) {
        const usuario = req.body.usuario;
        const senha = req.body.senha;
        const perfil = req.body.perfil;
        let msg = "Usuário ou senha inválidos";
        let cor = "red";

        let model;
        switch (perfil) {
            case "aluno":
                model = new alunoModel();
                break;
            case "professor":
                model = new professorModel();
                break;
            case "colaborador":
                model = new colaboradorModel();
                break;
            case "pais":
                model = new paisModel();
                break;
            default:
                return res.render('login.ejs', { mensagem: msg, color: cor, layout: false });
        }

        const usuarioValidado = await model.validar(usuario, senha);

        if (usuarioValidado) {
            res.cookie("usuarioLogado", usuarioValidado.id);
            res.cookie("usuarioPerfil", perfil); 
            const redirecionamento = {
                "aluno": "/usuario/aluno",
                "professor": "/usuario/Professores",
                "colaborador": "/usuario/Colaboradores",
                "pais4": "/usuario/pais"
            };
            return res.redirect(redirecionamento[perfil]);
        }

        res.render('login.ejs', { mensagem: msg, color: cor, layout: false });
    }
}

module.exports = LoginController;
