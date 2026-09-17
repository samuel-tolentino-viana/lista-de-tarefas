// VARIÁVEIS IMUTÁVEIS

const adicionarTarefa = document.querySelector('.botao-adicionartarf');
const aviso = document.querySelector('.aviso');
const ul = document.querySelector('ul');
const tag = document.querySelector('.tag');

// LISTA 

let lista = [];

if(localStorage.getItem('tarefas') !== null) {
  lista = JSON.parse(localStorage.getItem('tarefas'));
}

for(let tarefa of lista) {
  criarLista(tarefa);
};

// FUNÇÕES COMPLEMENTARES

function criarLista(tarefas) {
  let trocar = false;

  const novaTarefa = document.createElement('li');
  novaTarefa.setAttribute('class', 'cada-tarefa');
  const texto = document.createElement('p');
  ul.appendChild(novaTarefa);
  novaTarefa.appendChild(texto);
  texto.innerText = tarefas.texto;

  const botoes = document.createElement('div');
  botoes.setAttribute('class', 'botoestaref');
  novaTarefa.appendChild(botoes);

  novaTarefa.addEventListener('click', () => {
    abrirBotoes(botoes);
  });

  const concluir = document.createElement('button');
  concluir.setAttribute('class', 'concluir');
  botoes.appendChild(concluir);
  concluir.innerText = 'Concluir';
  concluir.addEventListener('click', () => {
    if(!trocar) {
      concluirTarefa(novaTarefa, concluir, tarefas);
    }
    else {
      reverter(novaTarefa, concluir);
      trocarModo(tarefas);
    };
    trocar = !trocar;
  });

  const excluir = document.createElement('button');
  excluir.setAttribute('class', 'excluir');
  botoes.appendChild(excluir);
  excluir.innerText = 'Excluir';

  excluir.addEventListener('click', () => {
    deletar(novaTarefa, texto)
  });

  if(tarefas.concluida) {
    novaTarefa.classList.add('tarefa-concluida');
    reverter(novaTarefa, concluir);
  }

};

function abrirBotoes(botoes) {
  botoes.classList.toggle('botoestaref');
};

// CONCLUIR

function concluirTarefa(novaTarefa, concluir, tarefa) {
  novaTarefa.classList.add('tarefa-concluida');
  concluir.classList.add('reverter');
  concluir.classList.remove('concluir');
  concluir.innerText = 'Reverter';

  tarefa.concluida = true;

  localStorage.setItem('tarefas', JSON.stringify(lista));
};

function reverter(novaTarefa, concluir) {
  novaTarefa.classList.remove('tarefa-concluida');
  concluir.classList.add('concluir');
  concluir.classList.remove('reverter');
  concluir.innerText = 'Concluir';

};
function trocarModo(tarefa) {
  tarefa.concluida = false;

  localStorage.setItem('tarefas', JSON.stringify(lista));
}

// EXCLUIR

function deletar(itemLista, textoLista) {
  itemLista.remove();
  let itemParaRemover = lista.indexOf(textoLista.textContent);
  lista.splice(itemParaRemover, 1);

  localStorage.setItem('tarefas', JSON.stringify( lista));
};

function removerTag() {
  tag.style.display = 'none'; // RETIRA A TAG
};

// FUNÇÃO AO CLICAR EM ADICIONAR

adicionarTarefa.addEventListener('click', () => {

  const input = document.getElementById('add-tarefa'); // PEGA O VALOR QUE FOI DIGITADO

  const valorDoInput = input.value;
  const tarefaDigitada = valorDoInput.trim(); // TIRA OS ESPAÇOS DO VALOR DIGITADO
  
  if(tarefaDigitada.length == 0) { // SE NADA FOR DIGITADO

    alert('Digite uma tarefa!'); // MANDA O ALERT

    aviso.innerHTML = 'Digite algo acima!';
    aviso.style.paddingTop = '8px'; // E O TEXTO DE AVISO
  }

  else { // SE NÃO

    aviso.innerHTML = ''; // SE ALGO FOR DIGITADO, REMOVE O AVISO

    let tarefaJaExiste = false;

    for(let tarefa of lista) {
      if(tarefa.texto == tarefaDigitada) {
        tarefaJaExiste = true;
      }
    };

    if(!tarefaJaExiste) {
      const item = {
        texto: tarefaDigitada,
        concluida: false
      };

      lista.push(item); 
      // ADICIONA O QUE FOI DIGITADO NO INPUT NA ARRAY, SÓ QUE AGORA COMO FORMA DE OBJETO PARA VERIFICAR SE É CONCLUIDO OU NÃO
    
      localStorage.setItem('tarefas', JSON.stringify(lista)); // ADICIONA NO LOCALSTORAGE A LISTA COM O ITEM ADICIONADO

      criarLista(item);
    } else {
        alert('A tarefa já existe!');
      }
    
    input.value = ''; // PEGA O CAMPO DE DIGITAÇÃO E, APÓS ENVIAR, CRIAR A LISTA, ORGANIZAR TUDO E OS BOTÕES, REMOVE OQUE ESTAVA DIGITADO NO CAMPO.

    input.focus();

    if(lista.length == 1) {
    tag.style.display = 'none';
    };

  };
});

tag.addEventListener('click', removerTag);

// ESTOU ESCREVENDO MUITOS COMENTÁRIOS PARA EU APRENDER A 'LER' OS SCRIPTS E CÓDIGOS

// FAZER MAIS FUNCTION SEPARADAS PRA REUTILIZAÇÃO