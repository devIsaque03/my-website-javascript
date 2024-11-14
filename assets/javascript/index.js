// alert("Login: visita@gmail.com\npassword: visit")

const button = document.getElementById('meuBotao');
const URL = 'http://localhost:3000/users';

button.addEventListener('click', async (event) => {
    event.preventDefault();
    const inputlogin = document.getElementById('login');
    const inputpassword = document.getElementById('password');

    const users = await chamarAPI ();

    if (users && users.length > 0) {
        const user = users.find(user => user.email === inputlogin.value && user.password === inputpassword.value);

        if (user) {
            alert("Login bem-sucedido");
            window.location.href = "./assets/html/main.html";
        } else {
            alert("Login ou senha incorretos");
        }
    } else {
        alert("Não foi possível acessar os dados dos usuários.");
    };
});

document.getElementsByClassName("containerformlogin")[0].classList.toggle("display-flex");

const createaccount = document.getElementById("createaccount");

createaccount.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementsByClassName("containerformlogin")[0].classList.toggle("display-flex");
    document.getElementsByClassName("containerformcreate")[0].classList.toggle("display-flex");

    const create = document.getElementById('create');

    create.addEventListener('click', async (event) => {
        event.preventDefault();
        const createusername = document.getElementById('createusername').value;
        const createlogin = document.getElementById('createlogin').value
        const createpassword = document.getElementById('createpassword').value
        const repeatcreatepassword = document.getElementById('repeatcreatepassword').value
        const users = await chamarAPI ();

        if ( createusername.length > 0 && createlogin > 0  && createpassword > 0) {
            if (users && users.find(user => user.username === createusername)) {
                document.getElementById('pusername').classList.toggle("display-flex");
            } else {
                var checkcreateusername = true;
            }

            if (users && users.find(user => user.email === createlogin)) {
                document.getElementById('pemail').classList.toggle("display-flex");
            } else {
                var checkcreateemail = true;
            }

            if (createpassword.length < 8) {
                document.getElementById('pissmall').classList.toggle("display-flex")
            } else {
                if (createpassword === repeatcreatepassword) {
                    var checkcreatepassword = true;
                } else {
                    document.getElementById('pnorepeat').classList.toggle("display-flex")
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
    document.getElementsByClassName("containerformcreate")[0].classList.toggle("display-flex");
    document.getElementsByClassName("containerformlogin")[0].classList.toggle("display-flex");
});

const forgotpassword = document.getElementsByClassName('forgotpassword')[0];

forgotpassword.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementsByClassName("containerformlogin")[0].classList.toggle("display-flex");
    document.getElementsByClassName("containerformsendcode")[0].classList.toggle("display-flex");
    alert('Essa parte ainda não é completamente funcional, falta incrementar um backend')
});

const send = document.getElementsByClassName('send')[0];

send.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementsByClassName("containerformsendcode")[0].classList.toggle("display-flex");
    document.getElementsByClassName("containerformcheckcode")[0].classList.toggle("display-flex");
});

const backemail = document.getElementsByClassName('backemail')[0];

backemail.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementsByClassName("containerformcheckcode")[0].classList.toggle("display-flex");
    document.getElementsByClassName("containerformsendcode")[0].classList.toggle("display-flex");
})

const check = document.getElementsByClassName("check")[0];

check.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementsByClassName("containerformcheckcode")[0].classList.toggle("display-flex");
    document.getElementsByClassName("containerformnewpassword")[0].classList.toggle("display-flex");
});

const replace = document.getElementsByClassName('replace')[0];

replace.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementsByClassName("containerformnewpassword")[0].classList.toggle("display-flex");
    document.getElementsByClassName("containerformlogin")[0].classList.toggle("display-flex");
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
        .then(data => console.log('USUÁRIO CRIADO:' + data ))
        .catch(error => console.error('Erro:', error));
}