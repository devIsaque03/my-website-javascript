const button = document.getElementById('meuBotao');
const URL = 'http://localhost:3000/users';

button.addEventListener('click', async (event) => {
    event.preventDefault();
    const login = document.getElementById('login');
    const password = document.getElementById('password');
   
    const users = await chamarAPI ();

    if (users && users.length > 0) {
        const user = users.find(user => user.email === login.value && user.password === password.value);

        if (user) {
            alert("Login bem-sucedido")
            window.location.href = "./assets/html/main.html";
        } else {
            alert("Login ou senha incorretos")
        }
    } else {
        alert("Não foi possível acessar os dados dos usuários.");
    }


});

async function chamarAPI() {
    try {
        const resp = await fetch(URL);
        if (resp.status === 200) {
            var users = await resp.json();    
            return users;
        }
    } catch (error) {
        console.error("Erro ao chamar a API:", error);
    }
    return null;
}


/*
login.addEventListener('input', (event) => {
    const valorDigitado = event.target.value
    console.log("Usuário está digitando:", valorDigitado);
})

const login = document.getElementById('login');
    
console.log(login.value);



*/