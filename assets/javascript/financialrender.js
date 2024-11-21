const currentUserId = localStorage.getItem('currentUserId'); // Não precisa de JSON.parse
console.log('ID recuperado do localStorage:', currentUserId);

if (currentUserId) {
  console.log('Usuário logado:', currentUserId);
  // Aqui você pode buscar mais informações do usuário se necessário
} else {
  console.log('Nenhum usuário logado.');
  // Redirecionar para login se não estiver logado
  window.location.href = '../../index.html';
}

const bodymovements = document.getElementsByClassName('bodymovements');

(async function renderMovements() {

    async function fetchMovementsUser(id) {
        try {
            const resp = await fetch(`http://localhost:3000/movement?foreignkey=${id}`);
            if (resp.ok) {
                const data = await resp.json();
                return data; // Retorna os dados do banco
            } else {
                console.error("Erro na resposta da API:", resp.status);
                return [];
            }
        } catch (error) {
            console.error("Erro ao chamar a API:", error);
            return [];
        }
    }
    
// Mapeamento de SourceID para nomes de bancos
const sourceMapping = {
    1: "Nubank",
    2: "Itaú",
    3: "Santander",
};

// Formatação de moeda
function formatCurrency(value, type) {
    const formattedValue = value.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
    return type === "output" ? `- ${formattedValue}` : formattedValue;
}

// Formatação de data
function formatDate(dateStr) {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
}

// Renderização dos movimentos
async function renderMovements() {
    const currentUserId = localStorage.getItem("currentUserId");
    if (!currentUserId) {
        window.location.href = "../../index.html";
        return;
    }

    const movements = await fetchMovementsUser(currentUserId);
    const tableBody = document.querySelector(".bodymovements");

    movements.forEach((movement) => {
        const row = document.createElement("tr");

        // Formatando os campos
        const dateCell = document.createElement("td");
        dateCell.textContent = formatDate(movement.date);

        const objectCell = document.createElement("td");
        objectCell.textContent = movement.object;

        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = `${movement.description}`;

        const sourceCell = document.createElement("td");
        sourceCell.textContent = sourceMapping[movement.sourceId] || "Unknown";

        const paymentMethodCell = document.createElement("td");
        paymentMethodCell.textContent = movement.paymentMethod;

        const valueCell = document.createElement("td");
        valueCell.classList.add("money");

        const cifraoCell = document.createElement("span");
        cifraoCell.textContent = "R$ ";

        const moneyCell = document.createElement("span");
        moneyCell.textContent = formatCurrency(movement.value, movement.type);

        // Adicionando os elementos dentro de valueCell
        valueCell.appendChild(cifraoCell);
        valueCell.appendChild(moneyCell);

        // Adicionando células à linha
        row.appendChild(dateCell);
        row.appendChild(objectCell);
        row.appendChild(descriptionCell);
        row.appendChild(sourceCell);
        row.appendChild(paymentMethodCell);
        row.appendChild(valueCell);

        // Adicionando a linha ao corpo da tabela
        tableBody.appendChild(row);
    });
}

// Chamada para renderizar os movimentos ao carregar a página
renderMovements();
    
})();

const filterByMonth = (movements, month, year) => {
    return movements.filter((movement) => {
      const date = new Date(movement.date);
      return date.getMonth() + 1 === month && date.getFullYear() === year;
    });
};

const filterByDay = (movements, day, month, year) => {
    return movements.filter((movement) => {
        const date = new Date(movement.date);
        return (
            date.getDate() === day &&
            date.getMonth() + 1 === month &&
            date.getFullYear() === year
        );
    });
};

async function fetchMovementsUser(id) {
    try {
        const resp = await fetch(`http://localhost:3000/movement?foreignkey=${id}`);
        if (resp.status === 200) {
            const data = await resp.json();
            if (data.length > 0) {
                console.log('Tudo certo!');
                return data; // Retorna os dados da API
            } else {
                console.warn("Nenhum movimento encontrado para o usuário.");
                return []; // Retorna um array vazio se não houver dados
            }
        } else {
            console.error("Erro na resposta da API:", resp.status);
            return null; // Retorna null em caso de erro
        }
    } catch (error) {
        alert('Erro ao se comunicar com a API');
        console.error("Erro ao chamar a API:", error);
        return null;
    }
}

