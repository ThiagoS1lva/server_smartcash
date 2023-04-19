const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

const CLIENTE_SCHEMA = `
CREATE TABLE IF NOT EXISTS "categories" (
    "name" varchar(64),
    "id" int
);`;

function criarTabelaCliente () {
    db.run(CLIENTE_SCHEMA, (error) => {
        if (error) console.log("erro ao criar tabela de clientes");
    });
}

db.serialize( () => {
    criarTabelaCliente();
});