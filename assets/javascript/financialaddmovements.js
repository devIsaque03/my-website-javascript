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

// Format input as the user types
valorInput.addEventListener('input', function () {
    let valor = valorInput.value;

    // Remove everything that is not a number
    valor = valor.replace(/\D/g, '');

    // Adds zeros if the value is less than 1 real
    valor = (valor / 100).toFixed(2); // Divide by 100 and keep two decimal places

    // Format as currency (R$)
    valor = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // Updates the input field
    valorInput.value = valor;
});

// Capture and display formatted value on submission
document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault();

    const valorFormatado = valorInput.value;
    resultado.textContent = `Valor inserido: ${valorFormatado}`;
});

// Call event on click "addmovementsbutton"
const buttonaddmovements = document.getElementById('addmovementsbutton');

buttonaddmovements.addEventListener('click', (event) => {
    event.preventDefault();

    // taking values
    const valor = document.getElementById('valor').value;
    const selectpaymentmethod = document.getElementById('selectpaymentmethod').value;
    const selectsource = document.getElementById('selectsource').value;
    const selecttype = document.getElementById('selecttype').value;
})