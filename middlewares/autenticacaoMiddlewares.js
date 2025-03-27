const alunoModel = require("../models/alunoModel");
const professorModel = require("../models/professorModel");
const colaboradorModel = require("../models/colaboradorModel");
const paisModel = require("../models/paisModel");

class AutenticacaoMiddleware {
    async validar(req, res, next) {
        if (req.cookies.usuarioLogado) {
            const usuId = req.cookies.usuarioLogado;
            const perfil = req.cookies.usuarioPerfil; 

            let usuario;
            switch (perfil) {
                case "1": 
                    usuario = new alunoModel();
                    break;
                case "2": 
                    usuario = new professorModel();
                    break;
                case "3": 
                    usuario = new colaboradorModel();
                    break;
                case "4":
                    usuario = new paisModel();
                    break;
                default:
                    return res.redirect("/login");
            }

            const arrUsuario = await usuario.obter(usuId);

            if (arrUsuario.length > 0 && arrUsuario[0].ativo == 1) {
                res.locals.usuario = arrUsuario[0];
                return next();
            }
        }
        res.redirect("/login");
    }
}

module.exports = AutenticacaoMiddleware;

