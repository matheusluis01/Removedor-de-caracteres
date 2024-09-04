document.getElementById('removerCaracteres').addEventListener('click', function() {
    var texto = document.getElementById('inputTexto').value;
    var textoLimpo = texto.replace(/[^0-9a-zA-Z]/g, ''); 
    armazenarResultado(textoLimpo);
});

document.getElementById('removerComEspaco').addEventListener('click', function() {
    var texto = document.getElementById('inputTexto').value;
    var textoComEspaco = texto.replace(/[^0-9a-zA-Z]/g, ' ').replace(/\s+/g, ' ').trim();
    document.getElementById('resultado').value = textoComEspaco;
    armazenarResultado(textoComEspaco);
});

document.getElementById('limparTexto').addEventListener('click', function() {
    document.getElementById('inputTexto').value = ''; 

document.getElementById('limparResultado').addEventListener('click', function() {
    document.getElementById('resultado').value = ''; 
});

document.getElementById('copiarResultado').addEventListener('click', function() {
    var resultado = document.getElementById('resultado').value;
    navigator.clipboard.writeText(resultado).then(function() {
        alert('Resultado copiado para a área de transferência!');
    }, function(err) {
        alert('Falha ao copiar o resultado: ', err);
    });
});

document.getElementById('limparHistorico').addEventListener('click', function() {
    localStorage.clear(); 
    document.getElementById('resultadosAnteriores').innerHTML = ''; 
});

document.getElementById('colarTexto').addEventListener('click', function() {
    navigator.clipboard.readText().then(function(text) {
        document.getElementById('inputTexto').value = text;
    }).catch(function(err) {
        alert('Falha ao colar o texto: ', err);
    });
});

function armazenarResultado(resultado) {
    // Exibe o resultado na caixa de resultados
    document.getElementById('resultado').value = resultado;
    
    // Armazena o resultado no histórico
    let historico = localStorage.getItem('historicoResultados') || '';
    historico += resultado + '\n';
    localStorage.setItem('historicoResultados', historico);
    
    exibirResultadosAnteriores(historico);
}

function exibirResultadosAnteriores(historico) {
    document.getElementById('resultadosAnteriores').textContent = historico;
}

// Exibe os resultados armazenados ao recarregar a página
window.onload = function() {
    var historico = localStorage.getItem('historicoResultados');
    if (historico) {
        exibirResultadosAnteriores(historico);
    }
};
