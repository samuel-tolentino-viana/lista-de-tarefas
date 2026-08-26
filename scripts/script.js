// VARIÁVEIS IMUTÁVEIS

const adicionarTarefa = document.querySelector('.botao-adicionartarf');
const aviso = document.querySelector('.aviso');
const ul = document.querySelector('ul');
const tag = document.querySelector('.tag');

// LISTA 

let lista = [];

// FUNÇÕES COMPLEMENTARES

if(localStorage.getItem('tarefas') !== null) {
  lista = JSON.parse(localStorage.getItem('tarefas'));
};

function abrirBotoes(botoes) {
  botoes.classList.toggle('botoestaref');
};

for(let percorrerLista of lista) {
  
};

// CONCLUIR

function concluirTarefa(novaTarefa, concluir) {
  novaTarefa.classList.add('tarefa-concluida');
  concluir.classList.add('reverter');
  concluir.classList.remove('concluir');
  concluir.innerText = 'Reverter';
};

function reverter(novaTarefa, concluir) {
  novaTarefa.classList.remove('tarefa-concluida');
  concluir.classList.add('concluir');
  concluir.classList.remove('reverter');
  concluir.innerText = 'Concluir';
};

// EXCLUIR

function deletar(itemLista, textoLista) {
  itemLista.remove();
  let itemParaRemover = lista.indexOf(textoLista.textContent);
  lista.splice(itemParaRemover, 1);
  
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

    if(lista.indexOf(tarefaDigitada) == -1) { // VAI PESQUISAR SE O ITEM DIGITADO JÁ ESTÁ NA LISTA, SE NÃO ESTIVER

      let novaTarefa = document.createElement('li'); // CRIA UMA NOVA LISTA

      novaTarefa.setAttribute('class', 'cada-tarefa'); // DÁ UMA CLASS QEU FAZ ELA FICAR UM CARD

      const textoTarefa = document.createElement('p');

      novaTarefa.appendChild(textoTarefa);

      textoTarefa.innerText = tarefaDigitada; // COLOCA O VALOR DIGITADO NO INPUT NA LISTA

      // BOTÕES
      
      const botoes = document.createElement('div');
      botoes.setAttribute('class', 'botoestaref');
      novaTarefa.appendChild(botoes); // ADICIONA A DIV DOS BOTÕES DENTRO DA LI, COMO NA ESTRUTURA ORIGINAL

      // BOTÕES CONCLUIR E EXCLUIR

      novaTarefa.addEventListener('click', () => {
        abrirBotoes(botoes);
      });

      let trocar = false;

      const concluir = document.createElement('button');
      concluir.setAttribute('class', 'concluir');
      concluir.innerText = 'Concluir';
      concluir.addEventListener('click', () => {
        if(!trocar) {
          concluirTarefa(novaTarefa, concluir);
        }
        else {
          reverter(novaTarefa, concluir);
        };
        trocar = !trocar;
      });

      const excluir = document.createElement('button');
      excluir.setAttribute('class', 'excluir');
      excluir.innerText = 'Excluir';
      excluir.addEventListener('click', () => {
        deletar(novaTarefa, textoTarefa);
      });

      // ADICIONANDO OS BOTÕES DENTRO DA ÁREA DOS BOTÕES
       
       botoes.appendChild(concluir);
       botoes.appendChild(excluir);

       ul.appendChild(novaTarefa); // ADICIONA ELA NA LISTA 

       lista.push(tarefaDigitada); // ADICIONA O QUE FOI DIGITADO NO INPUT NA ARRAY

       localStorage.setItem('tarefas', JSON.stringify(lista)); // ADICIONA NO LOCALSTORAGE A LISTA COM O ITEM ADICIONADO
      
    }
    else {
      alert('[ERRO] A tarefa já está na lista!');
    };


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