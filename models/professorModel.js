const Database = require("../utils/database");

class ProfessorModel {

    #id_professor;
    #nome;
    #cpf;

    get id_professor() {
        return this.#id_professor;
    }
    set id_professor(value) {
        this.#id_professor = value;
    }

    get nome() {
        return this.#nome;
    }
    set nome(value) {
        this.#nome = value;
    }

    get cpf() {
        return this.#cpf;
    }
    set cpf(value) {
        this.#cpf = value;
    }

    constructor(id_professor, nome, cpf) {
        this.#id_professor = id_professor;
        this.#nome = nome;
        this.#cpf = cpf;
    }

    async gravar() {
        const sql = `INSERT INTO Professor 
                        (Nome, CPF) 
                     VALUES 
                        (?, ?)`;
        const valores = [this.#nome, this.#cpf];
        const banco = new Database();
        const resultado = await banco.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }

    async validar(cpf, senha) {
        const sql = `SELECT * FROM Professor 
                     WHERE CPF = ? AND Senha = ? AND Ativo = 1`;
        const valores = [cpf, senha];
        const banco = new Database();
        const rows = await banco.ExecutaComando(sql, valores);
    
        if (rows.length > 0) {
            const row = rows[0];
            return new ProfessorModel(
                row["ID_professor"],
                row["Nome"],
                row["CPF"]
            );
        }
    
        return null;
    }
    

    async obter(id_professor) {
        const sql = "SELECT * FROM Professor WHERE ID_professor = ?";
        const valores = [id_professor];
        const banco = new Database();
        const rows = await banco.ExecutaComando(sql, valores);
        const lista = [];
        for (let i = 0; i < rows.length; i++) {
            lista.push(new ProfessorModel(
                rows[i]["ID_professor"],
                rows[i]["Nome"],
                rows[i]["CPF"]
            ));
        }
        return lista;
    }

    async listar() {
        const sql = "SELECT * FROM Professor";
        const banco = new Database();
        const rows = await banco.ExecutaComando(sql);
        const lista = [];
        for (let i = 0; i < rows.length; i++) {
            lista.push(new ProfessorModel(
                rows[i]["ID_professor"],
                rows[i]["Nome"],
                rows[i]["CPF"]
            ));
        }
        return lista;
    }

    async atualizar() {
        const sql = `UPDATE Professor 
                     SET Nome = ?, CPF = ? 
                     WHERE ID_professor = ?`;
        const valores = [this.#nome, this.#cpf, this.#id_professor];
        const banco = new Database();
        const resultado = await banco.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }

    async excluir(id_professor) {
        const sql = "DELETE FROM Professor WHERE ID_professor = ?";
        const banco = new Database();
        const valores = [id_professor];
        const resultado = await banco.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }
}

module.exports = ProfessorModel;
