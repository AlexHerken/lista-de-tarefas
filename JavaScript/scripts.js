// captura de elementos
const tarefas = document.querySelector("#tarefas");
const inputTarefas = document.querySelector("#tarefa-input");
const listTarefas = document.querySelector("#lista-tarefas");
const editarForm = document.querySelector("#editar-form");
const editarInput = document.querySelector("#editar-input");
const cancelarEdicao = document.querySelector("#cancelar-edicao");

let antigovalorInput;


// Funcoes

const salvarTarefa = function(texto){
    const tarefa = document.createElement("div");
    tarefa.classList.add("a-fazer");

    const tituloTarefa = document.createElement("h3");
    tituloTarefa.innerText = texto;
    tarefa.appendChild(tituloTarefa);

    const botaoFeito = document.createElement("button");
    botaoFeito.classList.add("feito");
    botaoFeito.innerHTML = '<i class="fa-solid fa-check"></i>';
    tarefa.appendChild(botaoFeito);

    const botaoEditar = document.createElement("button");
    botaoEditar.classList.add("editar-tarefa");
    botaoEditar.innerHTML = '<i class="fa-solid fa-pen"></i>';
    tarefa.appendChild(botaoEditar);

    const botaoRemover = document.createElement("button");
    botaoRemover.classList.add("remover-tarefa");
    botaoRemover.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    tarefa.appendChild(botaoRemover);

    listTarefas.appendChild(tarefa);

    inputTarefas.value = "";
    inputTarefas.focus();

}

const escondeForm = function() {

    editarForm.classList.toggle("esconder");
    tarefas.classList.toggle("esconder");
    listTarefas.classList.toggle("esconder");


}

// Eventos

tarefas.addEventListener("submit", function(e){

    e.preventDefault();
    

    const valorInput = inputTarefas.value;

    if(valorInput){
        salvarTarefa(valorInput);
    }
});

document.addEventListener("click", function(e){

    const targetEl = e.target;
    const elementoPai = targetEl.closest("div");
    let tituloTarefa;

    if(elementoPai && elementoPai.querySelector("h3")){
        tituloTarefa = elementoPai.querySelector("h3").innerText;
    }

    if(targetEl.classList.contains("feito")){
        elementoPai.classList.toggle("feito");
    }

    if(targetEl.classList.contains("editar-tarefa")){

        escondeForm();

        editarForm.value = tituloTarefa;
        antigovalorInput = tituloTarefa;

    }

    if(targetEl.classList.contains("remover-tarefa")){
        elementoPai.remove();
    }

});

cancelarEdicao.addEventListener("click", function(e){
    e.preventDefault();

    escondeForm();
});