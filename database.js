// database.js — cuida de tudo que envolve o banco de dados
// Usamos o SQLite que já vem dentro do Node.js (não precisa instalar nada!)
const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync('mural.db');

// Cria a tabela de recados na primeira vez que o servidor roda
db.exec(`
  CREATE TABLE IF NOT EXISTS recados (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    autor TEXT NOT NULL,
    mensagem TEXT NOT NULL
  )
`);g