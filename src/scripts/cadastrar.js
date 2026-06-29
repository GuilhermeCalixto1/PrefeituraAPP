import { criarSolicitacao, STATUS_SOLICITACAO } from "../services/api.js";

const formCadastrar = document.getElementById("form-cadastrar");
const btnVoltar = document.getElementById("btnVoltar");
const statusSolicitacao = document.getElementById("statusSolicitacao");

statusSolicitacao.innerHTML = STATUS_SOLICITACAO.map(
  (status) => `<option value="${status}">${status}</option>`,
).join("");
statusSolicitacao.value = "Pendente";

formCadastrar.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const bairro = document.getElementById("bairro").value;
  const servico = document.getElementById("servico").value;
  const descricao = document.getElementById("descricao").value;
  const status = statusSolicitacao.value;

  const btnSubmit = document.getElementById("btnCadastrarSolicitacao");
  const textoOriginalBtn = btnSubmit.innerText;
  btnSubmit.innerText = "Cadastrando...";
  btnSubmit.disabled = true;

  try {
    await criarSolicitacao({
      nome_solicitante: nome,
      bairro,
      tipo_servico: servico,
      descricao,
      status,
    });

    alert("Solicitação cadastrada com sucesso!");
    formCadastrar.reset();
    statusSolicitacao.value = "Pendente";
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    alert("Erro ao cadastrar solicitação: " + error.message);
  } finally {
    btnSubmit.innerText = textoOriginalBtn;
    btnSubmit.disabled = false;
  }
});

btnVoltar.onclick = () => {
  window.location.href = `${import.meta.env.BASE_URL}index.html`;
};
