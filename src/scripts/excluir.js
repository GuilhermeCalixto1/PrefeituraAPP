import { supabase } from "../services/api.js";

const inpCodigo = document.getElementById("inpCodigo");
const btnExcluir = document.getElementById("btnExcluir");
const btnVoltar = document.getElementById("btnVoltar");

btnExcluir.onclick = async () => {
  try {
    const id = Number(inpCodigo.value);

    if (!id) {
      alert("Informe um código válido.");
      return;
    }

    const confirmou = confirm(
      "Tem certeza que deseja excluir esta solicitação?",
    );

    if (!confirmou) {
      return;
    }

    const { error } = await supabase.from("Prefeitura").delete().eq("id", id);

    if (error) {
      throw error;
    }

    alert("Solicitação excluída com sucesso.");
    inpCodigo.value = "";
  } catch (error) {
    console.error("Erro ao excluir solicitação:", error);
    alert("Erro ao excluir solicitação: " + error.message);
  }
};

btnVoltar.onclick = () => {
  window.location.href = `${import.meta.env.BASE_URL}index.html`;
};
