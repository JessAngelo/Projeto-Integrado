const Database = require("../utils/database");

class AlunoModel {

    #id_aluno;
    #nome;
    #cpf;
    #data_nascimento;
    #serie_id;

    get id_aluno() {
        return this.#id_aluno;
    }
    set id_aluno(value) {
        this.#id_aluno = value;
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

    get data_nascimento() {
        return this.#data_nascimento;
    }
    set data_nascimento(value) {
        this.#data_nascimento = value;
    }

    get serie_id() {
        return this.#serie_id;
    }
    set serie_id(value) {
        this.#serie_id = value;
    }

    constructor(id_aluno, nome, cpf, data_nascimento, serie_id) {
        this.#id_aluno = id_aluno;
        this.#nome = nome;
        this.#cpf = cpf;
        this.#data_nascimento = data_nascimento;
        this.#serie_id = serie_id;
    }

    
    async gravar() {
        const sql = `INSERT INTO Aluno 
                        (Nome, CPF, Data_nascimento, Serie_ID) 
                     VALUES 
                        (?, ?, ?, ?)`;
        const valores = [this.#nome, this.#cpf, this.#data_nascimento, this.#serie_id];
        const banco = new Database();
        const resultado = await banco.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }

    async validar(cpf, senha) {
        const sql = `SELECT * FROM Aluno 
                     WHERE CPF = ? AND Senha = ? AND Ativo = 1`;
        const valores = [cpf, senha];
        const banco = new Database();
        const rows = await banco.ExecutaComando(sql, valores);
    
        if (rows.length > 0) {
            const row = rows[0];
            return new AlunoModel(
                row["ID_aluno"],
                row["Nome"],
                row["CPF"],
                row["Data_nascimento"],
                row["Serie_ID"]
            );
        }
    
        return null;
    }
    

    async obter(id_aluno) {
        const sql = "SELECT * FROM Aluno WHERE ID_aluno = ?";
        const valores = [id_aluno];
        const banco = new Database();
        const rows = await banco.ExecutaComando(sql, valores);
        const lista = [];
        for (let i = 0; i < rows.length; i++) {
            lista.push(new AlunoModel(
                rows[i]["ID_aluno"],
                rows[i]["Nome"],
                rows[i]["CPF"],
                rows[i]["Data_nascimento"],
                rows[i]["Serie_ID"]
            ));
        }
        return lista;
    }

    async listar() {
        const sql = "SELECT * FROM Aluno";
        const banco = new Database();
        const rows = await banco.ExecutaComando(sql);
        const lista = [];
        for (let i = 0; i < rows.length; i++) {
            lista.push(new AlunoModel(
                rows[i]["ID_aluno"],
                rows[i]["Nome"],
                rows[i]["CPF"],
                rows[i]["Data_nascimento"],
                rows[i]["Serie_ID"]
            ));
        }
        return lista;
    }

    async atualizar() {
        const sql = `UPDATE Aluno 
                     SET Nome = ?, CPF = ?, Data_nascimento = ?, Serie_ID = ? 
                     WHERE ID_aluno = ?`;
        const valores = [this.#nome, this.#cpf, this.#data_nascimento, this.#serie_id, this.#id_aluno];
        const banco = new Database();
        const resultado = await banco.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }

    async excluir(id_aluno) {
        const sql = "DELETE FROM Aluno WHERE ID_aluno = ?";
        const banco = new Database();
        const valores = [id_aluno];
        const resultado = await banco.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }
}

module.exports = AlunoModel;
