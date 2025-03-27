const Database = require("../utils/database");

class ResponsavelModel {
    
    #id_responsavel;
    #nome;
    #cpf;
    #id_aluno;

    get id_responsavel() {
        return this.#id_responsavel;
    }
    set id_responsavel(value) {
        this.#id_responsavel = value;
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

    get id_aluno() {
        return this.#id_aluno;
    }
    set id_aluno(value) {
        this.#id_aluno = value;
    }

    constructor(id_responsavel, nome, cpf, id_aluno) {
        this.#id_responsavel = id_responsavel;
        this.#nome = nome;
        this.#cpf = cpf;
        this.#id_aluno = id_aluno;
    }

    async gravar() {
        const sql = `INSERT INTO Responsavel 
                        (nome, cpf, id_aluno) 
                     VALUES 
                        (?, ?, ?)`;
        const valores = [this.#nome, this.#cpf, this.#id_aluno];
        const banco = new Database();
        const resultado = await banco.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }
    
    async validar(cpf, senha) {
        const sql = `SELECT * FROM Responsavel 
                     WHERE cpf = ? AND senha = ? AND ativo = 1`;
        const valores = [cpf, senha];
        const banco = new Database();
        const rows = await banco.ExecutaComando(sql, valores);
    
        if (rows.length > 0) {
            const row = rows[0];
            return new ResponsavelModel(
                row["id_responsavel"],
                row["nome"],
                row["cpf"],
                row["id_aluno"]
            );
        }
    
        return null;
    }
    

    async obter(id_responsavel) {
        const sql = "SELECT * FROM Responsavel WHERE id_responsavel = ?";
        const valores = [id_responsavel];
        const banco = new Database();
        const rows = await banco.ExecutaComando(sql, valores);
        const lista = [];
        for (let i = 0; i < rows.length; i++) {
            lista.push(new ResponsavelModel(
                rows[i]["id_responsavel"],
                rows[i]["nome"],
                rows[i]["cpf"],
                rows[i]["id_aluno"]
            ));
        }
        return lista;
    }

    async listar() {
        const sql = "SELECT * FROM Responsavel";
        const banco = new Database();
        const rows = await banco.ExecutaComando(sql);
        const lista = [];
        for (let i = 0; i < rows.length; i++) {
            lista.push(new ResponsavelModel(
                rows[i]["id_responsavel"],
                rows[i]["nome"],
                rows[i]["cpf"],
                rows[i]["id_aluno"]
            ));
        }
        return lista;
    }

    async atualizar() {
        const sql = `UPDATE Responsavel 
                     SET nome = ?, cpf = ?, id_aluno = ? 
                     WHERE id_responsavel = ?`;
        const valores = [this.#nome, this.#cpf, this.#id_aluno, this.#id_responsavel];
        const banco = new Database();
        const resultado = await banco.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }

    async excluir(id_responsavel) {
        const sql = "DELETE FROM Responsavel WHERE id_responsavel = ?";
        const banco = new Database();
        const valores = [id_responsavel];
        const resultado = await banco.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }
}

module.exports = ResponsavelModel;
