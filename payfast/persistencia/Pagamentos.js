const conexao = require('../infra/conexao')

class Pagamentos {

    adiciona(pagamento) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO Pagamentos SET ?`

            conexao.query(sql, pagamento, (erro, resultado) => {
                if (erro) return reject(erro)
                return resolve(resultado)
            })
        })
    }

    atualiza(pagamento) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE Pagamentos SET status = ? WHERE  id = ?`

            conexao.query(sql, [pagamento.status, pagamento.id], (erro, resultado) => {
                if (erro) return reject(erro)
                return resolve(resultado)
            })
        })
    }
}

module.exports = new Pagamentos