import {
  alterarStatusSolicitacao,
  STATUS_SOLICITACAO,
} from "../services/api.js";

const inpCod = document.getElementById("inpCod");
const inpStatus = document.getElementById("inpStatus");
const btnAlterar = document.getElementById("btnAlterar");
const btnVoltar = document.getElementById("btnVoltar");

inpStatus.innerHTML = STATUS_SOLICITACAO.map(
  (status) => `<option value="${status}">${status}</option>`,
).join("");
inpStatus.value = "Pendente";

btnAlterar.onclick = async () => {
  try {
    const id = Number(inpCod.value);
    if (!id) {
      alert("Informe um código válido.");
      return;
    }

    await alterarStatusSolicitacao(id, inpStatus.value);
    alert("Status atualizado com sucesso.");
  } catch (error) {
    console.error(error);
    alert("Erro ao atualizar status: " + error.message);
  }
};

btnVoltar.onclick = () => {
  window.location.href = `${import.meta.env.BASE_URL}index.html`;
};
