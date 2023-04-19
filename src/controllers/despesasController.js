const despesasDAO = require('../DAO/despesasDAO.js')
const Despesas = require('../models/despesas.js')


class despesasController {
    static rotas(app) {
        app.get('/Despesas', despesasController.listar)
        app.get('/Despesas/id/:id', despesasController.buscarPorID)
        app.post('/Despesas', despesasController.inserir)
        app.put('/Despesas/id/:id', despesasController.atualizarDespesas)
        app.delete('/Despesas/id/:id', despesasController.deletarDespesas)
    }

    
    // GET para listar todos
    static async listar(req, res) {
        const despesas = await despesasDAO.listar()
        res.status(200).send(despesas)
    }


    // GET para buscar apenas 1 pela ID
    static async buscarPorID(req, res) {
        const despesas = await despesasDAO.buscarPorID(req.params.id)
        if (!despesas) {
            res.status(404).send("Finança não encontrado")
            return
        }
        res.status(200).send(despesas)
    }



    // POST - Adicionar um Finances
    static async inserir(req, res) {
        const despesas = new Despesas(
            req.body.name,
            req.body.budget,
            req.body.data,
            req.body.category_id
        )
        if (!despesas.name || !despesas.budget || !despesas.data || !despesas.category_id) {
            res.status(400).send("Precisa passar todas as informações")
            return
        }
        const result = await despesasDAO.inserir(despesas)
        if (result.erro) {
            res.status(500).send(result)
            return
        }
        res.status(201).send({ "Mensagem": "Finanças criado com sucesso", "Novo Finanças: ": despesas })
    }


    // PUT - Editar um Finances
    static async atualizarDespesas(req, res) {
        try {const despesas = new Despesas(
            req.body.name,
            req.body.budget,
            req.body.data,
            req.body.category_id
            
        )
        if (!despesas.name || !despesas.budget || !despesas.data || !despesas.category_id) {
            res.status(400).send("Precisa passar todas as informações")
            return
        }
        if (!Object.keys(despesas).length) {
            res.status(400).send('O objeto está sem chave')
            return
        }
        const result = await despesasDAO.atualizar(req.params.id, despesas)
        if (result.erro) {
            res.status(500).send('Erro ao atualizar o despesas')
            return
        }
        res.status(200).send({ "Mensagem": "Dados atualizados", "Finanças: ": despesas })
    } catch (err) {
        console.log(err)
        res.status(500).send('Erro ao atualizar o despesas')
    }}


    // DELETE - Deletar um Finances
    static async deletarDespesas(req, res) {
        const despesas = await despesasDAO.buscarPorID(req.params.id)
        if (!despesas) {
            res.status(404).send("despesas não encontrado")
            return
        }
        const result = await despesasDAO.deletar(req.params.id)
        if (result.erro) {
            res.status(400).send({ 'Mensagem': 'despesas não deletado' })
            return
        }
        res.status(200).send(result)
    }
}

module.exports = despesasController

