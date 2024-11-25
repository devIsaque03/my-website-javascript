// alert("Login: visita@gmail.com\npassword: visita")

// API URL
const URL = 'http://localhost:3000/users';

const button = document.getElementById('meuBotao');
const containerlogin = document.getElementsByClassName("containerformlogin")[0];
const containercreate = document.getElementsByClassName("containerformcreate")[0];
const containersend = document.getElementsByClassName("containerformsendcode")[0];
const containercheck = document.getElementsByClassName("containerformcheckcode")[0];
const containernewpassword = document.getElementsByClassName("containerformnewpassword")[0];

// Login verification event
button.addEventListener('click', async (event) => {
    event.preventDefault();

    const inputlogin = document.getElementById('login').value;
    const inputpassword = document.getElementById('password').value;

    // Chama função da API
    const users = await chamarAPI ();   

    // 
    if (users && users.length > 0) {
        const user = users.find(user => user.email === inputlogin && user.password === inputpassword);

        if (user) {
            await fetchAndStoreUser(inputlogin);
            alert("Login bem-sucedido");
            window.location.href = "./assets/html/main.html";
        } else {
            alert("Login ou senha incorretos");
        }
    } else {
        alert("Não foi possível acessar os dados dos usuários.");
    };
});

const createaccount = document.getElementById("createaccount");

createaccount.addEventListener('click', (event) => {
    event.preventDefault();
    containerlogin.classList.toggle("display-flex");
    containerlogin.classList.toggle("display-none");
    containercreate.classList.toggle("display-flex");
    containercreate.classList.toggle("display-none");

    const create = document.getElementById('create');

    create.addEventListener('click', async (event) => {
        event.preventDefault();
        const createusername = document.getElementById('createusername').value;
        const createlogin = document.getElementById('createlogin').value
        const createpassword = document.getElementById('createpassword').value
        const repeatcreatepassword = document.getElementById('repeatcreatepassword').value
        const users = await chamarAPI ();

        const pusername = document.getElementsByClassName("pusername")[0];
        const pemail = document.getElementsByClassName("pemail")[0];
        const pissmall = document.getElementsByClassName("pissmall")[0];
        const pnorepeat = document.getElementsByClassName("pnorepeat")[0];


        if ( createusername.length > 0 && createlogin.length > 0  && createpassword.length > 0) {
            if (users && users.find(user => user.username === createusername)) {
                pusername.classList.toggle("display-flex");
                pusername.classList.toggle("display-none");
            } else {
                var checkcreateusername = true;
            }

            if (users && users.find(user => user.email === createlogin)) {
                pemail.classList.toggle("display-flex");
                pemail.classList.toggle("display-none");
            } else {
                var checkcreateemail = true;
            }

            if (createpassword.length < 8) {
                pissmall.classList.toggle("display-flex");
                pissmall.classList.toggle("display-none");
            } else {
                if (createpassword === repeatcreatepassword) {
                    var checkcreatepassword = true;
                } else {
                    pnorepeat.classList.toggle("display-flex");
                    pnorepeat.classList.toggle("display-none");
                }
            }        

            if (checkcreateusername && checkcreateemail && checkcreatepassword) {
                await adduser(createusername, createlogin, createpassword);
            }
        }
    });
});
const backlogin = document.getElementsByClassName('backlogin')[0];

backlogin.addEventListener('click', (event) => {
    event.preventDefault();
    containercreate.classList.toggle("display-flex");
    containercreate.classList.toggle("display-none");
    containerlogin.classList.toggle("display-flex");
    containerlogin.classList.toggle("display-none");
});

const forgotpassword = document.getElementsByClassName('forgotpassword')[0];

forgotpassword.addEventListener('click', (event) => {
    event.preventDefault();
    containerlogin.classList.toggle("display-flex");
    containerlogin.classList.toggle("display-none");
    containersend.classList.toggle("display-flex");
    containersend.classList.toggle("display-none");
    alert('Essa parte até o final ainda não é completamente funcional, primeiro precisa incrementar um backend para o envio de email')
});

const send = document.getElementsByClassName('send')[0];

send.addEventListener('click', (event) => {
    event.preventDefault();
    containersend.classList.toggle("display-flex");
    containersend.classList.toggle("display-none");
    containercheck.classList.toggle("display-flex");
    containercheck.classList.toggle("display-none");
});

const backemail = document.getElementsByClassName('backemail')[0];

backemail.addEventListener('click', (event) => {
    event.preventDefault();
    containercheck.classList.toggle("display-flex");
    containercheck.classList.toggle("display-none");
    containersend.classList.toggle("display-flex");
    containersend.classList.toggle("display-none");
})

const check = document.getElementsByClassName("check")[0];

check.addEventListener('click', (event) => {
    event.preventDefault();
    containercheck.classList.toggle("display-flex");
    containercheck.classList.toggle("display-none");
    containernewpassword.classList.toggle("display-flex");
    containernewpassword.classList.toggle("display-none");
});

const replace = document.getElementsByClassName('replace')[0];

replace.addEventListener('click', (event) => {
    event.preventDefault();
    containernewpassword.classList.toggle("display-flex");
    containernewpassword.classList.toggle("display-none");
    containerlogin.classList.toggle("display-flex");
    containerlogin.classList.toggle("display-none");
});

async function chamarAPI() {
    try {
        const resp = await fetch(URL);
        if (resp.status === 200) {
            const users = await resp.json();    
            return users;
        }
    } catch (error) {
        console.error("Erro ao chamar a API:", error);
    }
    return null;
}

async function adduser(username, email, password) {
    console.log(5)
    fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, email: email, password: password})
      })
        .then(response => response.json())
        .then(data => console.log('USUÁRIO CRIADO:'))
        .catch(error => console.error('Erro:', error));
}

async function fetchAndStoreUser(email) {
    try {
        // Fazer a requisição à API
        const resp = await fetch(`http://localhost:3000/users?email=${email}`);

        // Verificar se a resposta foi bem-sucedida
        if (resp.status === 200) {
            const data = await resp.json(); // Parse do JSON
            if (data.length > 0) {
                console.log("ID do usuário:", data[0].id);
                // Armazenar o ID no localStorage
                localStorage.setItem('currentUserId', data[0].id);
            } else {
                console.warn("Usuário não encontrado com o e-mail fornecido.");
            }
        } else {
            console.error("Erro na resposta da API:", resp.status);
        }
    } catch (error) {
        alert('Erro ao se comunicar com a API');
        console.error("Erro ao chamar a API:", error);
    }
}

// http://localhost:3000/users?email=isaqueacs7@gmail.com