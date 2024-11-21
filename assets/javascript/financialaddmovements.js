const back = document.getElementById('backSummaryFinancial')

back.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('1')

    const summaryFinancial = document.getElementsByClassName('containerSummaryFinancial');
    const movements = document.getElementsByClassName('containerMovementsFinancial');

    summaryFinancial.classList.toggle("display-none");
    movements.classList.toggle("display-none");
})

const valorInput = document.getElementById('valor');
const resultado = document.getElementById('resultado');

// Formatar entrada enquanto o usuário digita
valorInput.addEventListener('input', function () {
    let valor = valorInput.value;

    // Remove tudo que não for número
    valor = valor.replace(/\D/g, '');

    // Adiciona zeros caso o valor seja menor que 1 real
    valor = (valor / 100).toFixed(2); // Divide por 100 e mantém duas casas decimais

    // Formata como moeda (R$)
    valor = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // Atualiza o campo de entrada
    valorInput.value = valor;
});

// Capturar e exibir valor formatado no envio
document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault();

    const valorFormatado = valorInput.value;
    resultado.textContent = `Valor inserido: ${valorFormatado}`;
});