const app = require('./config/custom-express')()
const conexao = require('./infra/conexao')
const Tabelas = require('./infra/Tabelas')

conexao.connect(erro => {
    if (erro) {
        console.log('Erro ao conectar no banco' + erro)
    } else {
        console.log('Conectado ao Banco')
        Tabelas.init(conexao)
        app.listen(3000, () => {
            console.log("Servidor rodando na porta 3000")
        })
    }

})


