//O principal objetivo deste desafio é fortalecer as habilidades em lógica de programação. 
// Aqui desenvolverá a lógica para resolver o problema.

let amigos = [];
let resultadoSorteio = [];
let indiceAtual = 0;

function adicionarAmigo() {
    let nomeAdicionado = document.getElementById("amigo").value.trim();

    if (nomeAdicionado === "") {
        alert("Por favor, insira um nome.");
        return;
    }

    amigos.push(nomeAdicionado);
    document.getElementById("amigo").value = "";
    listaAmigosAtualizada();
}

function sortearAmigo() {
    const botaoSortear = document.querySelector(".button-draw");
    const resultadoLista = document.getElementById("resultado");

    if (botaoSortear.dataset.state === "reiniciar") {
        reiniciarJogo();
        return;
    }

    if (amigos.length < 2) {
        alert("Adicione pelo menos dois amigos antes de sortear.");
        return;
    }

    if (resultadoSorteio.length === 0) {
        const escolhaAmigosLista = [...amigos];
        embaralharListaAmigos(escolhaAmigosLista);

        resultadoSorteio = [];
        indiceAtual = 0;

        for (let i = 0; i < amigos.length; i++) {
            if (amigos[i] === escolhaAmigosLista[i]) {
                return sortearAmigo();
            }
            resultadoSorteio.push({
                amigo: amigos[i],
                amigoSecreto: escolhaAmigosLista[i],
            });
        }

        document.getElementById("listaAmigos").style.display = "none";
        resultadoLista.innerHTML = ""; 
    }

    if (indiceAtual < resultadoSorteio.length) {
        resultadoLista.textContent = `O amigo secreto sorteado é: ${resultadoSorteio[indiceAtual].amigoSecreto}`;
        indiceAtual++;
    } else {
        resultadoLista.innerHTML = `Todos os amigos já foram sorteados!`;
        
        botaoSortear.innerHTML = `<img src="assets/play_circle_outline.png" alt="Ícone de play"> Reiniciar Jogo`;
        botaoSortear.dataset.state = "reiniciar"; 
    }
}

function listaAmigosAtualizada() {
    let listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = "";

    amigos.forEach(amigo => {
        const li = document.createElement("li");
        li.textContent = amigo;
        listaAmigos.appendChild(li);
    });
}

function embaralharListaAmigos(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function reiniciarJogo() {
    amigos = [];
    resultadoSorteio = [];
    indiceAtual = 0;

    document.getElementById("resultado").textContent = "";
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("listaAmigos").style.display = "block";

    document.getElementById("amigo").value = "";
    
    const botaoSortear = document.querySelector(".button-draw");
    
    botaoSortear.innerHTML = `<img src="assets/play_circle_outline.png" alt="Ícone de play"> Sortear amigo`;
    botaoSortear.dataset.state = "sortear";
}