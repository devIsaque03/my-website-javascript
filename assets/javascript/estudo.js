/*  Banco de Dados ------------------------------------------------------------------------------------
users - id, username, email, password, foreignkey
settings - 
financial - id, foreignkey, initbalance
movement - id, foreignkey, day, month, year, object, description, type, sourceId, paymentMethod, value
source - id, foreignkey, bank, name, pix, debitcard, creditcard, limitedcard
trainings -
tasks - 
goals -
timeline -
*/

document.getElementsByTagName('li');
document.getElementsByClassName('textos');
document.getElementById('título');

// ------------------------------------------

document.querySelectorAll('.primeira-classe .primeira-classe')
document.querySelectorAll('li .opcao')

// ------------------------------------------

document.createElement(/* element */)
document.removeChild(/* element */)
document.appendChild(/* element */) // adiciona um elemento
document.replaceChild(/*new element, old element */) // substitui um elemento

// ------------------------------------------

const meuElemento = document.getElementById("meu-elemento").classList.toggle("dark-mode")

meuElemento.classList.add("novo-estilo")
meuElemento.classList.remove("classe")
meuElemento.classList.toggle("dark-mode") // se não tiver, ele coloca... se tiver, ele tira

// ------------------------------------------

document.getElementsByTagName("p").style.color = "blue" //acessando diretamente o CSS de um elemento

// ------------------------------------------

mouseover
mouseout

click 
dbclick 

Change 
load 

input

const botao = document.getElementById("meuBotao")

botao.addEventListener("click", outraFuncao)

// ------------------------------------------

Id.innerHTML = "Mudei!"