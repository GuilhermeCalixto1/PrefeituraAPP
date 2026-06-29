import {
  STATUS_SOLICITACAO,
  atualizarSolicitacao,
  alterarStatusSolicitacao,
  supabase,
} from "../services/api.js";

const inpCod = document.getElementById("inpCod");
const inpNome = document.getElementById("inpNome");
const inpBairro = document.getElementById("inpBairro");
const inpServico = document.getElementById("inpServico");
const inpDescricao = document.getElementById("inpDescricao");
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

    await atualizarSolicitacao(id, {
      nome_solicitante: inpNome.value,
      bairro: inpBairro.value,
      tipo_servico: inpServico.value,
      descricao: inpDescricao.value,
      status: inpStatus.value,
    });

    alert("Solicitação atualizada com sucesso.");
  } catch (error) {
    console.error(error);
    alert("Erro ao atualizar solicitação: " + error.message);
  }
};

inpCod.addEventListener("change", async () => {
  const id = Number(inpCod.value);

  if (!id) {
    return;
  }

  const { data, error } = await supabase
    .from("Prefeitura")
    .select("id,nome_solicitante,bairro,tipo_servico,descricao,status")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return;
  }

  inpNome.value = data?.nome_solicitante ?? "";
  inpBairro.value = data?.bairro ?? "";
  inpServico.value = data?.tipo_servico ?? "Iluminação Pública";
  inpDescricao.value = data?.descricao ?? "";
  inpStatus.value = data?.status ?? "Pendente";
});

btnVoltar.onclick = () => {
  window.location.href = `${import.meta.env.BASE_URL}index.html`;
};
