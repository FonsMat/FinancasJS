//area de input dos elementos da DOM

const txtValorInicial = document.getElementById('valorInicial'),
resFinal = document.getElementById('res'),
resEntradas = document.getElementById('resEntradas'),
resSaidas = document.getElementById('resSaidas'),
entradattxt = document.getElementById('entradattxt'),
saidattxt = document.getElementById('saidattxt'),
txtEntrada = {
    valor: document.getElementById('valorEntrada'),
    nome: document.getElementById('nomeEntrada')
}, txtSaida = {
    valor: document.getElementById('valorSaida'),
    nome:  document.getElementById('nomeSaida')
};

const valoresENTRADAS = JSON.parse(localStorage.getItem('veArray')) || [],
valoresSAIDA = JSON.parse(localStorage.getItem('vsArray')) || []
textosENTRADA = JSON.parse(localStorage.getItem('txteArray')) || [],
textosSAIDA = JSON.parse(localStorage.getItem('txtsArray')) || [];

//storage do valor inicial:
if(localStorage.vi){
    valorInicial.value = localStorage.vi;
}

renderEntradaText();
renderSaidaText();
//Parte da entrada:

//Essa função vai renderizar os texto e coloca-los num array para poder depois apagar com facilidade:
function renderEntradaText(){
    entradattxt.innerHTML = '';
    for (textoENTRADA of textosENTRADA){
        //criando texto dos movimentos
        const entradaElemento = document.createElement('div');
        const elementoEntradaTexto = document.createTextNode(textoENTRADA);
        entradaElemento.appendChild(elementoEntradaTexto);
        entradaElemento.style.color = '#00ff00';
        entradattxt.appendChild(entradaElemento);

        //botão de excluir
        const excluirEntrada = document.createElement('button');
        const excluirEntradaTXT = document.createTextNode('excluir');
        excluirEntrada.appendChild(excluirEntradaTXT);
        let posEnt = textosENTRADA.indexOf(textoENTRADA);
        excluirEntrada.setAttribute('onclick', `deleteEntrada(${posEnt})`);
        excluirEntrada.setAttribute('id', 'exEntrada');
        entradaElemento.appendChild(excluirEntrada);
    }
}

//função do botão adicionar q vai chamar a função a cima:
function addEntrada(){
    const entrada = {
        valor: Number((txtEntrada.valor).value),
        nome: String((txtEntrada.nome).value)
    };

    if (entrada.valor <= 0 || isNaN(entrada.valor)){
        alert('[Error] Você tentou adicionar um valor invalido!');
        (txtEntrada.valor).value = '';
        (txtEntrada.nome).value = '';
    } 
    else{
        valoresENTRADAS.push(entrada.valor);

        const textoEntrada = 'Entrada: R$' + entrada.valor + ' ' + entrada.nome;
        textosENTRADA.push(textoEntrada);
        
        (txtEntrada.valor).value = '';
        (txtEntrada.nome).value = '';

        renderEntradaText();
        saveToStorage();
    };
};

//função do botão de excluir:
function deleteEntrada(posEnt){
    textosENTRADA.splice(posEnt, 1);
    valoresENTRADAS.splice(posEnt, 1);
    renderEntradaText();
    saveToStorage();
}

//agora a parte da Saida:

function renderSaidaText(){
    saidattxt.innerHTML = '';
    for (textoSAIDA of textosSAIDA){
        //criando texto dos movimentos
        const saidaElemento = document.createElement('div');
        const elementoSaidaTexto = document.createTextNode(textoSAIDA);
        saidaElemento.appendChild(elementoSaidaTexto);
        saidaElemento.style.color = '#ff0000';
        saidattxt.appendChild(saidaElemento);

        //botão de excluir
        const excluirSaida = document.createElement('button');
        const excluirSaidaTXT = document.createTextNode('excluir');
        excluirSaida.appendChild(excluirSaidaTXT);
        let posSai = textosSAIDA.indexOf(textoSAIDA);
        excluirSaida.setAttribute('onclick', `deleteSaida(${posSai})`);
        excluirSaida.setAttribute('id', 'exSAIDA');
        saidaElemento.appendChild(excluirSaida);
    }
}
function addSaida(){
    const saida = {
        valor: Number((txtSaida.valor).value),
        nome: String((txtSaida.nome).value)
    };

    if (saida.valor <= 0 || isNaN(saida.valor)){
        alert('[ERROR] Você tentou adicionar um valor invalido!');
        (txtSaida.valor).value = '';
        (txtSaida.nome).value = '';
    }
    else{
        valoresSAIDA.push(saida.valor);

        const textoSaida = 'Saida: R$' + saida.valor + ' ' + saida.nome;
        textosSAIDA.push(textoSaida);

        (txtSaida.valor).value = '';
        (txtSaida.nome).value = '';

        renderSaidaText();
        saveToStorage();
    };
};
function deleteSaida(posSai){
    textosSAIDA.splice(posSai, 1);
    valoresSAIDA.splice(posSai, 1);
    renderSaidaText();
    saveToStorage();
};

function saveToStorage(){
    localStorage.setItem('vi', txtValorInicial.value);
    localStorage.setItem('veArray', JSON.stringify(valoresENTRADAS));
    localStorage.setItem('vsArray', JSON.stringify(valoresSAIDA));
    localStorage.setItem('txteArray', JSON.stringify(textosENTRADA));
    localStorage.setItem('txtsArray', JSON.stringify(textosSAIDA));
}

function calcular(){
    const valorInicial = Number(txtValorInicial.value);
    if (isNaN(valorInicial)){
        alert('você digitou um valor inicial invalido');
    }
    else{
        //valor entradas:
        let valorFinalENTRADAS = 0;
        for(let valorENTRADAS in valoresENTRADAS){
            valorFinalENTRADAS += valoresENTRADAS[valorENTRADAS];
        };
        resEntradas.innerText = 'Valor das entradas: R$' + valorFinalENTRADAS;

        //valor saídas:
        let valorFinalSAIDAS = 0;
        for(let valorSAIDA in valoresSAIDA){
            valorFinalSAIDAS += valoresSAIDA[valorSAIDA];
        };
        resSaidas.innerText = 'Valor das saídas: R$' + valorFinalSAIDAS;

        //valor final:
        const valorFINAL = (valorFinalENTRADAS - valorFinalSAIDAS) + valorInicial;
        resFinal.innerText = 'Valor final R$' + valorFINAL;
    } 
}