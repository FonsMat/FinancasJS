const txtValorInicial = document.getElementById('valorInicial'), valorFinal = document.getElementById('res'), transações = document.getElementById('transações'),
txtEntrada = {
    valor: document.getElementById('valorEntrada'),
    nome: document.getElementById('nomeEntrada')
}, txtSaida = {
    valor: document.getElementById('valorSaida'),
    nome:  document.getElementById('nomeSaida')
};

const valores = [];

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

        valores.push(entrada.valor);
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

        valores.push(0 - saida.valor);
    };
};

function calcValorFinal(){
    const valorInicial = Number(txtValorInicial.value);
    if (isNaN(valorInicial)){
        alert('você digitou um valor inicial invalido')
    }
    else{
        let valorFinalTransacoes = 0;
        for (let valor in valores){
            valorFinalTransacoes += valores[valor];
        };

        const valorFinalTotal = valorFinalTransacoes + valorInicial;

        valorFinal.innerText = 'Valor Final: R$' + valorFinalTotal;
    }
}