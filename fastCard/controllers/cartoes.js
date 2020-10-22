const { check, validationResult } = require('express-validator')

module.exports = (app) => {

    app.post('/cartoes/autoriza',
        [check("numero").notEmpty().isLength({ min: 16, max: 16 }).withMessage("Numero não poder nulo e deve ter 16 caracteres"),
        check("bandeira").notEmpty().withMessage("Bandeira do cartão é obrigatória"),
        check("ano_de_expiracao").notEmpty().withMessage("Ano de expiração é obrigatório"),
        check("mes_de_expiracao").notEmpty().withMessage("Mês de expiração é obrigatória"),
        check("cvv").notEmpty().withMessage("CVV é obrigatório"),
        ],
        (req, res) => {

            var erros = validationResult(req).formatWith(({ msg }) => msg);

            if (!erros.isEmpty()) {
                return res.status(400).send({ erros: erros.array() });
            }

            const cartao = req.body
            cartao.status = "AUTORIZADO"

            return res.status(200).json(cartao)

        })
}