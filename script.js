const botaoSobre = document.getElementById('sobre-btn');
const conteudo = document.getElementById('conteudo');
const botaoContato = document.getElementById('contato-btn');

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
