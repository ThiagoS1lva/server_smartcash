// Importando o packages
const express = require('express')
const cors = require('cors')

// instanciando o servidor
const app = express()

// configurando o servidor para receber requisições com o corpo no formato JSON
app.use(express.json());
app.use(cors())

// importando os controllers
const FinancesController = require('./controllers/financesController.js');
const DespesasController = require('./controllers/despesasController.js');
const CategoryController = require('./controllers/categoryController.js');

FinancesController.rotas(app)
DespesasController.rotas(app)
CategoryController.rotas(app)

module.exports = app
