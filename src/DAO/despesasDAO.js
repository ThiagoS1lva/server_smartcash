// Importa o db.js para poder usar o banco de dados simulado
const db = require("../infra/db");


// Essa classe encapsula o acesso ao Banco de Dados. Todos os métodos abaixos são estáticos. Isso quer dizer que não precisamos instanciar a classe para usá-los e serão chamados pela classe clienteController... Alguns vão dar retorno e para outros, isso não será necessário
class despesasDAO {

  // GET  --  Função ALL - Retorna todas as linhas. No callback existe o argumento ROWS
  static listar() {
    const query = "SELECT * FROM despesas";
    return new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  }

  // GET  --  
  static buscarPorID(id) {
    const query = "SELECT * FROM despesas WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.get(query, [id], (err, row) => {
        if (err) {
          reject(false);
        }
        resolve(row);
      });
    });
  }

  // POST
  static inserir(despesas) {
    const query = "INSERT INTO despesas (name, budget,  data, category_id) VALUES(?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
      db.run(query, [despesas.name, despesas.budget, despesas.data, despesas.category_id], (err) => {
        if (err) {
          reject({
            mensagem: "Erro ao inserir o despesas",
            error: err,
          });
        }
        resolve(despesas);
      });
    });
  }

  // PUT  --  
  static atualizar(id, despesas) {
    const query =
      "UPDATE despesas SET name = ?, budget = ?, data = ?, category_id = ? WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.run(
        query,
        [despesas.name, despesas.budget, despesas.data, despesas.category_id, id],
        (err) => {
          if (err) {
            reject({
              mensagem: "Erro ao atualizar o despesas",
              erro: err,
            });
          }
          resolve({
            mensagem: "Cliente atualizado com sucesso"
          });
        }
      );
    });
  }


  // DELETE  --  
  static deletar(id) {
    const query = "DELETE FROM despesas WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.run(query, [id], (err) => {
        if (err) {
          reject({
            mensagem: "Erro ao deletar o cliente",
            erro: err,
          });
        }
        resolve({ mensagem: "despesas deletado com sucesso", id: id });
      });
    });
  }
}


// Exporta a classe
module.exports = despesasDAO;