const btnCadastrar = document.getElementById("btnCadastrar");
const btnSolicitacoes = document.getElementById("btnSolicitacoes");
const btnAlterarStatus = document.getElementById("btnAlterarStatus");
const btnExcluir = document.getElementById("btnExcluir");

btnCadastrar.onclick = () => {
  window.location.href = `${import.meta.env.BASE_URL}src/pages/cadastrar.html`;
};

btnSolicitacoes.onclick = () => {
  window.location.href = `${import.meta.env.BASE_URL}src/pages/consultar.html`;
};

btnAlterarStatus.onclick = () => {
  window.location.href = `${import.meta.env.BASE_URL}src/pages/alterar.html`;
};

btnExcluir.onclick = () => {
  window.location.href = `${import.meta.env.BASE_URL}src/pages/excluir.html`;
};
