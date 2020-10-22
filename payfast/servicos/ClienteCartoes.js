const fetch = require('node-fetch');

class ClienteCartoes {

    autoriza(cartao) {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3001/cartoes/autoriza',
                {
                    method: 'POST', body: JSON.stringify(cartao),
                    headers: { 'Content-Type': 'application/json' }
                })
                .then(res => res.json())
                .then(json => resolve(json))
                .catch(erro => reject(erro))
        })
    }
}

module.exports = new ClienteCartoes
