const botaoSobre = document.getElementById('sobre-btn');
const botaoContato = document.getElementById('contato-btn');
const botaoProjetos = document.getElementById('projetos-btn');
const conteudo = document.getElementById('conteudo');

let textoVisivel = false;

botaoSobre.addEventListener('click', () => {
    if (!textoVisivel) {
        conteudo.innerHTML = `
            <ul>
                <li>Sou estudante do 5º período de Ciência da Computação na Universidade Católica de Pernambuco.</li>
                <li>Já estagiei dando aula de robótica para crianças na Escola Municipal Antônio Farias Filho, adquirindo certa experiência nesse processo.</li>
                <li>Atualmente trabalho em uma Corretora de Seguros realizando manutenções nos computadores, ensinando outros colaboradores a utilizar algumas ferramentas para fazer cotações de seguro.</li>
            </ul>
        `;
        conteudo.classList.remove('conteudo-escondido');
        conteudo.classList.add('animar-fade'); 
        textoVisivel = true;
    } else {
        conteudo.innerHTML = '';
        conteudo.classList.add('conteudo-escondido');
        textoVisivel = false;
    }
});

botaoContato.addEventListener('click', () => {
    window.open('https://github.com/Edualex0', '_blank');
});

botaoProjetos.addEventListener('click', () => {
    if (conteudo.classList.contains('conteudo-escondido')) {
        conteudo.innerHTML = `
            <h2>Bulls and Cows</h2>
            <p>Adivinhe o número secreto! Digite um número de 4 dígitos diferentes.</p>
            <input type="text" id="palpite" maxlength="4" placeholder="Digite seu palpite" style="padding: 5px; border-radius: 5px;">
            <button id="enviar-palpite" style="padding: 5px 10px; margin-left: 10px; border-radius: 5px;">Enviar</button>
            <button id="mostrar-resposta" style="padding: 5px 10px; margin-left: 10px; border-radius: 5px;">Mostrar Resposta</button>
            <div id="resultado" style="margin-top: 20px;"></div>
            <h3>Tentativas</h3>
            <ul id="tentativas-lista" style="text-align: left;"></ul>
        `;
        conteudo.classList.remove('conteudo-escondido');
        conteudo.classList.add('animar-fade'); 
        iniciarJogo(); 
    } else {
        conteudo.innerHTML = ''; 
        conteudo.classList.add('conteudo-escondido'); 
    }
});

function iniciarJogo() {
    const numeroSecreto = gerarNumeroSecreto();
    let tentativas = []; 

    const botaoEnviar = document.getElementById('enviar-palpite');
    const botaoMostrarResposta = document.getElementById('mostrar-resposta');
    const resultado = document.getElementById('resultado');
    const listaTentativas = document.getElementById('tentativas-lista');
    const botaoTentarNovamente = document.createElement('button');

    botaoTentarNovamente.style.padding = "5px 10px";
    botaoTentarNovamente.style.marginTop = "20px";
    botaoTentarNovamente.style.borderRadius = "5px";
    botaoTentarNovamente.textContent = "Tentar Novamente";
    botaoTentarNovamente.style.display = "none"; 

    conteudo.appendChild(botaoTentarNovamente);

    botaoEnviar.addEventListener('click', () => {
        const palpite = document.getElementById('palpite').value;
        if (palpite.length !== 4 || new Set(palpite).size !== 4 || isNaN(palpite)) {
            resultado.innerHTML = "<p>Digite um número válido de 4 dígitos diferentes!</p>";
            return;
        }

        let bulls = 0;
        let cows = 0;

        for (let i = 0; i < 4; i++) {
            if (palpite[i] === numeroSecreto[i]) {
                bulls++;
            } else if (numeroSecreto.includes(palpite[i])) {
                cows++;
            }
        }

        if (bulls === 4) {
            resultado.innerHTML = "<h3>Parabéns! Você acertou o número secreto: " + numeroSecreto + "</h3>";
            botaoTentarNovamente.style.display = "inline-block"; 
        } else {
            resultado.innerHTML = `<p>${bulls} Bulls, ${cows} Cows</p>`;
        }

        const tentativa = document.createElement('li');
        tentativa.textContent = `Palpite: ${palpite} → 🐂 Bulls: ${bulls} | 🐄 Cows: ${cows}`;
        tentativas.unshift(tentativa); 

        if (tentativas.length > 10) {
            tentativas.pop(); 
        }

        listaTentativas.innerHTML = '';
        tentativas.forEach(tentativa => {
            listaTentativas.appendChild(tentativa);
        });

        document.getElementById('palpite').value = '';
    });

    botaoMostrarResposta.addEventListener('click', () => {
        resultado.innerHTML = `<h3>Resposta: ${numeroSecreto}</h3>`;
    });

    botaoTentarNovamente.addEventListener('click', () => {
        resultado.innerHTML = "";
        listaTentativas.innerHTML = "";
        document.getElementById('palpite').value = "";
        botaoTentarNovamente.style.display = "none"; 
        iniciarJogo(); 
    });
}

function gerarNumeroSecreto() {
    let numeros = [];
    while (numeros.length < 4) {
        let digito = Math.floor(Math.random() * 10).toString();
        if (!numeros.includes(digito)) {
            numeros.push(digito);
        }
    }
    return numeros.join('');
}
