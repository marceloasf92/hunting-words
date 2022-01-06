// 1 - Definir um array de 20 palavras com menos de 10 letras cada;
const arrayPalavras = [
    'luigi',
    'mario',
    'yoshi',
    'toad',
    'encanador',
    'bowser',
    'cogumelo',
    'moeda',
    'kooper',
    'castelo',
    'planta',
    'consertar',
    'boo',
    'nintendo',
    'super',
    'estrela',
    'irmaos',
    'tartaruga',
    'missil',
    'world'
]

// 2 - Fazer com que 3 palavras sejam selecionadas aleatóriamente 
function palavrasAleatorias(array) {
    let palavras = [];

    while (palavras.length < 3) {
        let posicao = array[Math.floor(Math.random() * array.length)];
        if (palavras.indexOf(posicao) === -1) {
            palavras.push(posicao);
        }

    }
    return palavras;
}
palavrasAleatorias(arrayPalavras);

let letras = 'abcdefghiklmnopqrstuvwxyz';

// 3 - Criar um array bidmensional de 10x10

function mapHandle(){
    const map = [
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
    ];
    return map

}
let map = mapHandle();

// 4 - Fazer com que 3 palavras sejam colocadas aleatóriamente em um array bidmensional de 10x10
function empurrar(palavra, x, y, map) {
    
    for (let i = 0; i < palavra.length; i++) {
        map[x][y] = palavra[i];

        y++;
    }
}

let varControl = palavrasAleatorias(arrayPalavras);

function adicionarPalavras(varControl) {
    

    let arrLinha = [];
    map = mapHandle();
    while (arrLinha.length < 3) {
        let linha = Math.floor(Math.random() * map.length);
        if (arrLinha.indexOf(linha) === -1) {
            arrLinha.push(linha);
        }
    }

    for (let c = 0; c < varControl.length; c++) {

        let palavra = varControl[c];
        let linha = arrLinha[c];
        let coluna = Math.floor(Math.random() * (map[0].length - palavra.length));
        empurrar(palavra, linha, coluna, map);

    }


}
adicionarPalavras(varControl);

const divContainer = document.getElementById('container');
const main = document.getElementById('main');

function palavrasSelecionadas(varControl) {
    const divMostrarPalavras = document.createElement('div');
    divMostrarPalavras.classList.add('mostrarPalavras');
    main.appendChild(divMostrarPalavras);
    const title = document.createElement('h2');
    divMostrarPalavras.classList.add('divPalavras')
    divMostrarPalavras.appendChild(title);
    const frase1 = document.createElement('p');
    divMostrarPalavras.appendChild(frase1);
    frase1.innerText = varControl[0].toUpperCase();
    const frase2 = document.createElement('p');
    divMostrarPalavras.appendChild(frase2);
    frase2.innerText = varControl[1].toUpperCase();
    const frase3 = document.createElement('p');
    divMostrarPalavras.appendChild(frase3);
    frase3.innerText = varControl[2].toUpperCase();


}
palavrasSelecionadas(varControl)

// Construção do array
const buildLinha = (linhaAtual, linha) => {

    for (let coluna = 0; coluna < linhaAtual.length; coluna++) {

        const valorAtual = linhaAtual[coluna];


        const div = document.createElement('div');
        divContainer.appendChild(div);

        if (valorAtual === '') {
            div.innerText = letras.split('')[Math.floor(Math.random() * letras.length)].toUpperCase();

        } else {

            div.classList.add('letrasCorretas');
            div.setAttribute('clicked', 'false')
            div.innerText = valorAtual.toUpperCase();

            // div.style.backgroundColor = 'red';
        }
    }


}

const buildMap = () => {
    for (let linha = 0; linha < map.length; linha++) {
        const linhaAtual = map[linha];
        buildLinha(linhaAtual, linha);
    }
}
buildMap();


//5 - Informar ao usuário quando a palavra for clicada

let counter = 0;
let lengthControl = varControl.toString().length - 2;
const divWinner = document.createElement('div');
divWinner.classList.add('divWinner');
divWinner.classList.add('hidden');
document.body.appendChild(divWinner);

const eventOnClick = (e) => {
    
    const target = e.target;
    


    if (target.classList.contains('letrasCorretas')) {
        target.style.backgroundColor = 'orange';
        if(target.getAttribute('clicked') === 'false'){
            target.setAttribute('clicked', 'true');
            counter++;
            
        }
        
        if (lengthControl === counter) {
            main.style.opacity = '20%';
            divWinner.style.display = 'flex';


        }

    }
    
}


divContainer.addEventListener('click', eventOnClick);

function createWinner() {
    divWinner.innerHTML = 'Você ganhou!';
    divWinner.style.visibility = 'visible';

    const button = document.createElement("BUTTON");
    button.classList.add('buttonWinner');
    button.id = 'buttonWinner'
    button.innerText = 'Reset';
    divWinner.appendChild(button);

}
createWinner()



const pageReset = () => {
    main.style.opacity = '100%';
    const divContainerReset = document.getElementById('container');
    divContainerReset.innerHTML = '';
    divWinner.style.display = 'none';
    let novasPalavras = palavrasAleatorias(arrayPalavras);
    adicionarPalavras(novasPalavras);
    palavrasSelecionadas(novasPalavras);
    const divMostrarPalavras = document.querySelector('.mostrarPalavras');
    divMostrarPalavras.remove();
    counter = 0;
    lengthControl = novasPalavras.toString().length - 2;
    buildMap();

}

const buttonWinner = document.getElementById('buttonWinner');
buttonWinner.addEventListener('click', pageReset);