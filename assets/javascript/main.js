// Pegar usuário logado
const currentUserId = localStorage.getItem('currentUserId'); // Não precisa de JSON.parse
console.log('ID recuperado do localStorage:', currentUserId);

if (currentUserId) {
  console.log('Usuário logado:', currentUserId);
  // Aqui você pode buscar mais informações do usuário se necessário
} else {
  console.log('Nenhum usuário logado.');
  // Redirecionar para login se não estiver logado
  // window.location.href = '../../index.html';
}
