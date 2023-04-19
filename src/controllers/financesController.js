const financesDAO = require('../DAO/financesDAO.js')
const Finances = require('../models/finances.js')


class FinancesController {
    static rotas(app) {
        app.get('/Finances', FinancesController.listar)
        app.get('/Finances/id/:id', FinancesController.buscarPorID)
        app.post('/Finances', FinancesController.inserir)
        app.put('/Finances/id/:id', FinancesController.atualizarFinances)
        app.delete('/Finances/id/:id', FinancesController.deletarFinances)
    }

    
    // GET para listar todos
    static async listar(req, res) {
        const finances = await financesDAO.listar()
        res.status(200).send(finances)
    }


    // GET para buscar apenas 1 pela ID
    static async buscarPorID(req, res) {
        const finances = await financesDAO.buscarPorID(req.params.id)
        if (!finances) {
            res.status(404).send("Finança não encontrado")
            return
        }
        res.status(200).send(finances)
    }



    // POST - Adicionar um Finances
    static async inserir(req, res) {
        const finances = new Finances(
            req.body.name,
            req.body.budget,
            req.body.data,
            req.body.category_id
        )
        if (!finances.name || !finances.budget || !finances.data || !finances.category_id) {
            res.status(400).send("Precisa passar todas as informações")
            return
        }
        const result = await financesDAO.inserir(finances)
        if (result.erro) {
            res.status(500).send(result)
            return
        }
        res.status(201).send({ "Mensagem": "Finanças criado com sucesso", "Novo Finanças: ": finances })
    }


    // PUT - Editar um Finances
    static async atualizarFinances(req, res) {
        try {const finances = new Finances(
            req.body.name,
            req.body.budget,
            req.body.data,
            req.body.category_id
            
        )
        if (!finances.name || !finances.budget || !finances.data || !finances.category_id) {
            res.status(400).send("Precisa passar todas as informações")
            return
        }
        if (!Object.keys(finances).length) {
            res.status(400).send('O objeto está sem chave')
            return
        }
        const result = await financesDAO.atualizar(req.params.id, finances)
        if (result.erro) {
            res.status(500).send('Erro ao atualizar o finances')
            return
        }
        res.status(200).send({ "Mensagem": "Dados atualizados", "Finanças: ": finances })
    } catch (err) {
        console.log(err)
        res.status(500).send('Erro ao atualizar o finances')
    }}


    // DELETE - Deletar um Finances
    static async deletarFinances(req, res) {
        const finances = await financesDAO.buscarPorID(req.params.id)
        if (!finances) {
            res.status(404).send("finances não encontrado")
            return
        }
        const result = await financesDAO.deletar(req.params.id)
        if (result.erro) {
            res.status(400).send({ 'Mensagem': 'finances não deletado' })
            return
        }
        res.status(200).send(result)
    }
}

module.exports = FinancesController

