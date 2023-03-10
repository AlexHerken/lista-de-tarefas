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
    salvarTarefas();

}

const escondeForm = function() {

    editarForm.classList.toggle("esconder");
    tarefas.classList.toggle("esconder");
    listTarefas.classList.toggle("esconder");


}

const atualizarTarefa = function(texto) {

    const afazeres = document.querySelectorAll(".a-fazer");

    afazeres.forEach(function(afazeres){

        let tituloTarefa = afazeres.querySelector("h3");

        if(tituloTarefa.innerText === antigovalorInput){
            tituloTarefa.innerText = texto;
        }
    });

}

function salvarTarefas() {
    
    const litarefas = listTarefas.querySelectorAll('.a-fazer');

    const todasTarefas = [];

    for(let todo in litarefas){
        let tarefaTexto = todo.innerText;

        todasTarefas.push(tarefaTexto)
    }

    const tarefasJSON = JSON.stringify(todasTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas(){
    const tare = localStorage.getItem('tarefas');

    const litarefas = JSON.parse(tare);

    for(let todo in litarefas){
        salvarTarefa(todo);
    }
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

        editarInput.value = tituloTarefa;
        antigovalorInput = tituloTarefa;
        

    }

    if(targetEl.classList.contains("remover-tarefa")){
        elementoPai.remove();
        salvarTarefas();
    }

});

cancelarEdicao.addEventListener("click", function(e){
    e.preventDefault();

    escondeForm();
});

editarForm.addEventListener("submit", function(e){
    e.preventDefault();

    const editValorInput = editarInput.value;

    if(editValorInput){
        atualizarTarefa(editValorInput);
    }  
    
    escondeForm()
});