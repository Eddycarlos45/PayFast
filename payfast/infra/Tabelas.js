class Tabelas {

    init = (conexao) => {
        this.conexao = conexao
        this.criaPagamentos()
    }

    criaPagamentos = () => {
        const sql = `CREATE TABLE IF NOT EXISTS Pagamentos(id INT NOT NULL AUTO_INCREMENT,
            forma_de_pagamento varchar(30) NOT NULL, valor float NOT NULL, moeda varchar(5) NOT NULL,
            descricao varchar(30) NOT NULL, status varchar(10) NOT NULL, data date NOT NULL, PRIMARY KEY(id))`

        this.conexao.query(sql, (erro) => {
            if(erro) return console.log('Erro ao criar a tabela Pagamentos')
            return console.log('Tabela Pagamentos criada')
        })
    }
}

module.exports = new Tabelas