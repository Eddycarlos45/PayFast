const Pagamentos = require('../persistencia/Pagamentos')
const { check, validationResult } = require('express-validator');
const ClienteCartoes = require('../servicos/ClienteCartoes')

module.exports = (app) => {


    app.delete('/pagamentos/:id', (req, res) => {
        const pagamento = {
            status: 'CANCELADO',
            id: req.params.id
        }
        Pagamentos.atualiza(pagamento)
            .then(() => res.status(204).json('Pagamento Cancelado'))
            .then(erro => res.status(500).json('Não foi possivel confirmar o pagamento'))
    })

    app.put('/pagamentos/:id', (req, res) => {
        const pagamento = {
            status: 'CONFIRMADO',
            id: req.params.id
        }
        Pagamentos.atualiza(pagamento)
            .then(() => res.status(200).json('Pagamento Confirmado'))
            .then(erro => res.status(500).json('Não foi possivel confirmar o pagamento'))
    })

    app.post("/pagamentos", [
        check("pagamento.forma_de_pagamento").notEmpty().withMessage("Forma de Pagamento é Obrigatória"),
        check("pagamento.valor").isFloat().notEmpty().withMessage("O valor é obrigatório e deve ser um decimal")
    ], (req, res) => {

        var erros = validationResult(req).formatWith(({ msg }) => msg);

        if (!erros.isEmpty()) {
            return res.status(400).send({ erros: erros.array() });
        }

        const pagamento = req.body["pagamento"]
        const cartao = req.body["cartao"]

        if (pagamento.forma_de_pagamento == "cartao") {
            ClienteCartoes.autoriza(cartao)
                .then((resposta) => {

                    if (!resposta.erros == "") res.status(400).json(resposta)

                    pagamento.status = "Criado"
                    pagamento.data = new Date()

                    Pagamentos.adiciona(pagamento)
                        .then((resultado) => {

                            pagamento.id = resultado.insertId
                            res.location('/pagamentos/pagamento/' + resultado.insertId)

                            const response = {
                                dados_do_pagamento: pagamento,
                                dados_do_cartao: resposta,
                                links: [
                                    {
                                        href: "http://localhost:3000/pagamentos/" + pagamento.id,
                                        rel: "confirmar",
                                        method: "PUT"
                                    },
                                    {
                                        href: "http://localhost:3000/pagamentos/" + pagamento.id,
                                        rel: "cancelar",
                                        method: "DELETE"
                                    }
                                ]
                            }
                            res.status(201).json(response)
                        })
                        .catch(erro => res.status(500).json('Erro ao adicionar Pagamento' + erro))
                })
                .catch(erro => res.status(400).json(erro))
        }
    })

}
