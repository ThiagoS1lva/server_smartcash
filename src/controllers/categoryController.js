const categoryDAO = require("../DAO/categoryDAO.js");
const Category = require("../models/category.js");

class CategoryController {
  static rotas(app) {
    app.get("/Category", CategoryController.listar);
    app.get("/Category/id/:id", CategoryController.buscarPorID);
  }

  static async listar(req, res) {
    const category = await categoryDAO.listar();
    res.status(200).send(category);
  }

  static async buscarPorID(req, res) {
    const category = await categoryDAO.buscarPorID(req.params.id);
    if (!category) {
      res.status(404).send("Finança não encontrado");
      return;
    }
    res.status(200).send(category);
  }
}

module.exports = CategoryController;
