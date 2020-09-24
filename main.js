const txtValorInicial = document.getElementById('valorInicial'), valorFinal = document.getElementById('res'), resEntradas = document.getElementById('resEntradas'), resSaidas = document.getElementById('resSaidas') , transações = document.getElementById('transações'),
txtEntrada = {
    valor: document.getElementById('valorEntrada'),
    nome: document.getElementById('nomeEntrada')
}, txtSaida = {
    valor: document.getElementById('valorSaida'),
    nome:  document.getElementById('nomeSaida')
};

const valoresTODOS = [], valoresENTRADAS = [], valoresSAIDAS = [];

function addEntrada(){
    var entrada = {
        valor: Number((txtEntrada.valor).value),
        nome: String((txtEntrada.nome).value)
    };

    if (entrada.valor <= 0 || isNaN(entrada.valor)){
        alert('[Error] Você tentou adicionar um valor invalido!');
        (txtEntrada.valor).value = '';
        (txtEntrada.nome).value = '';
    } 
    else{
        const novaEntrada = document.createElement('div');
        const novaEntradatxt = document.createTextNode('Entrada: R$' + entrada.valor + ' ' + entrada.nome);
        novaEntrada.appendChild(novaEntradatxt);
        novaEntrada.style.color = '#00ff00';
        transações.appendChild(novaEntrada);
        (txtEntrada.valor).value = '';
        (txtEntrada.nome).value = '';

        valoresTODOS.push(entrada.valor);
        valoresENTRADAS.push(entrada.valor);
    };
};

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
        const novaSaida = document.createElement('div');
        const novaSaidatxt = document.createTextNode('Saida: R$' + saida.valor + ' ' + saida.nome);
        novaSaida.appendChild(novaSaidatxt);
        novaSaida.style.color = '#ff0000';
        transações.appendChild(novaSaida);
        (txtSaida.valor).value = '';
        (txtSaida.nome).value = '';

        valoresTODOS.push(0 - saida.valor);
        valoresSAIDAS.push(saida.valor);
    };
};

function calcular(){
    const valorInicial = Number(txtValorInicial.value);
    if (isNaN(valorInicial)){
        alert('você digitou um valor inicial invalido');
    }
    else{
        //valor final:
        let valorFinalTODOS = 0;
        for (let valorTODOS in valoresTODOS){
            valorFinalTODOS += valoresTODOS[valorTODOS];
        };
        const valorFinalTotal = valorFinalTODOS + valorInicial;
        valorFinal.innerText = 'Valor final: R$' + valorFinalTotal;

        //valor entradas:
        let valorFinalENTRADAS = 0;
        for(let valorENTRADAS in valoresENTRADAS){
            valorFinalENTRADAS += valoresENTRADAS[valorENTRADAS];
        };
        resEntradas.innerText = 'Valor das entradas: R$' + valorFinalENTRADAS;

        //valor saídas:
        let valorFinalSAIDAS = 0;
        for(let valorSAIDAS in valoresSAIDAS){
            valorFinalSAIDAS += valoresSAIDAS[valorSAIDAS];
        };
        resSaidas.innerText = 'Valor das saidas: R$' + valorFinalSAIDAS;
    }
}