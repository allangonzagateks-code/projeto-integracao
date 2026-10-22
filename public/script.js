// script.js — o front-end conversando com o back-end
const API = '/api/recados';

const form = document.getElementById('form-recado');
const campoAutor = document.getElementById('autor');
const campoMensagem = document.getElementById('mensagem');
const lista = document.getElementById('lista-recados');

// 1. Buscar os recados no servidor e mostrar na tela
async function carregarRecados() {
  const resposta = await fetch(API);          // GET /api/recados
  const recados = await resposta.json();

  lista.innerHTML = '';

  if (recados.length === 0) {
    lista.innerHTML = '<p class="vazio">Nenhum recado ainda. Seja a primeira pessoa!</p>';
    return;
  }

  recados.forEach((recado) => {
    const card = document.createElement('article');
    card.className = 'recado';

    const autor = document.createElement('p');
    autor.className = 'autor';
    autor.textContent = recado.autor;          // textContent evita que alguém injete HTML

    const texto = document.createElement('p');
    texto.className = 'texto';
    texto.textContent = recado.mensagem;

    const rodape = document.createElement('div');
    rodape.className = 'rodape';

    const data = document.createElement('span');
    data.textContent = recado.criado_em;

    const botao = document.createElement('button');
    botao.className = 'btn-apagar';
    botao.textContent = 'Apagar';
    botao.addEventListener('click', () => apagarRecado(recado.id));

    rodape.append(data, botao);
    card.append(autor, texto, rodape);
    lista.appendChild(card);
  });
}

// 2. Enviar um recado novo para o servidor
form.addEventListener('submit', async (evento) => {
  evento.preventDefault(); // impede a página de recarregar

  const resposta = await fetch(API, {          // POST /api/recados
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      autor: campoAutor.value,
      mensagem: campoMensagem.value,
    }),
  });

  if (!resposta.ok) {
    const erro = await resposta.json();
    alert(erro.erro);
    return;
  }

  form.reset();
  carregarRecados();
});

// 3. Apagar um recado
async function apagarRecado(id) {
  if (!confirm('Quer mesmo apagar esse recado?')) return;

  await fetch(`${API}/${id}`, { method: 'DELETE' }); // DELETE /api/recados/:id
  carregarRecados();
}

// Quando a página abre, carrega os recados
carregarRecados();