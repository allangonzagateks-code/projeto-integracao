// server.js — o coração do nosso back-end
const express = require('express');
const { listarRecados, criarRecado, apagarRecado } = require('./database');

const app = express();
const PORTA = 3000;

// Middlewares: "filtros" que rodam antes das rotas
app.use(express.json());           // entende o corpo das requisições em JSON
app.use(express.static('public')); // entrega o front-end da pasta public

// ROTA 1 — Listar todos os recados
app.get('/api/recados', (req, res) => {
  res.json(listarRecados());
});

// ROTA 2 — Criar um recado novo
app.post('/api/recados', (req, res) => {
  const { autor, mensagem } = req.body || {};

  if (!autor?.trim() || !mensagem?.trim()) {
    return res.status(400).json({ erro: 'Preencha autor e mensagem.' });
  }

  const novo = criarRecado(autor.trim(), mensagem.trim());
  res.status(201).json(novo);
});

// ROTA 3 — Apagar um recado pelo id
app.delete('/api/recados/:id', (req, res) => {
  const apagou = apagarRecado(Number(req.params.id));

  if (!apagou) {
    return res.status(404).json({ erro: 'Recado não encontrado.' });
  }

  res.status(204).end();
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});