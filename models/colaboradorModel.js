const Database = require("../utils/database");

class ColaboradorModel {

    #id_colaborador;
    #nome;
    #cargo;
    #cpf;

    get id_colaborador() {
        return this.#id_colaborador;
    }
    set id_colaborador(value) {
        this.#id_colaborador = value;
    }

    get nome() {
        return this.#nome;
    }
    set nome(value) {
        this.#nome = value;
    }

    get cargo() {
        return this.#cargo;
    }
    set cargo(value) {
        this.#cargo = value;
    }

    get cpf() {
        return this.#cpf;
    }
    set cpf(value) {
        this.#cpf = value;
    }

    constructor(id_colaborador, nome, cargo, cpf) {
        this.#id_colaborador = id_colaborador;
        this.#nome = nome;
        this.#cargo = cargo;
        this.#cpf = cpf;
    }

    async gravar() {
        const sql = `INSERT INTO Colaborador 
                        (Nome, Cargo, CPF) 
                     VALUES 
                        (?, ?, ?)`;
        const valores = [this.#nome, this.#cargo, this.#cpf];
        const banco = new Database();
        const resultado = await banco.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }
    
    async validar(cpf, senha) {
        const sql = `SELECT * FROM Colaborador 
                     WHERE CPF = ? AND Senha = ? AND Ativo = 1`;
        const valores = [cpf, senha];
        const banco = new Database();
        const rows = await banco.ExecutaComando(sql, valores);
    
        if (rows.length > 0) {
            const row = rows[0];
            return new ColaboradorModel(
                row["ID_colaborador"],
                row["Nome"],
                row["Cargo"],
                row["CPF"]
            );
        }
    
        return null;
    }
    

    async obter(id_colaborador) {
        const sql = "SELECT * FROM Colaborador WHERE ID_colaborador = ?";
        const valores = [id_colaborador];
        const banco = new Database();
        const rows = await banco.ExecutaComando(sql, valores);
        const lista = [];
        for (let i = 0; i < rows.length; i++) {
            lista.push(new ColaboradorModel(
                rows[i]["ID_colaborador"],
                rows[i]["Nome"],
                rows[i]["Cargo"],
                rows[i]["CPF"]
            ));
        }
        return lista;
    }

    async listar() {
        const sql = "SELECT * FROM Colaborador";
        const banco = new Database();
        const rows = await banco.ExecutaComando(sql);
        const lista = [];
        for (let i = 0; i < rows.length; i++) {
            lista.push(new ColaboradorModel(
                rows[i]["ID_colaborador"],
                rows[i]["Nome"],
                rows[i]["Cargo"],
                rows[i]["CPF"]
            ));
        }
        return lista;
    }

    async atualizar() {
        const sql = `UPDATE Colaborador 
                     SET Nome = ?, Cargo = ?, CPF = ? 
                     WHERE ID_colaborador = ?`;
        const valores = [this.#nome, this.#cargo, this.#cpf, this.#id_colaborador];
        const banco = new Database();
        const resultado = await banco.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }

    async excluir(id_colaborador) {
        const sql = "DELETE FROM Colaborador WHERE ID_colaborador = ?";
        const banco = new Database();
        const valores = [id_colaborador];
        const resultado = await banco.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }
}

module.exports = ColaboradorModel;
