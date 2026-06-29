// Importa a conexão com o Supabase configurada no api.js
import { supabase } from "../services/api.js";

const formCadastrar = document.getElementById("form-cadastrar");

formCadastrar.addEventListener("submit", async (event) => {
  event.preventDefault(); // Evita o recarregamento padrão da página

  // Captura os valores dos campos do formulário
  const nome = document.getElementById("nome").value;
  const bairro = document.getElementById("bairro").value;
  const servico = document.getElementById("servico").value;
  const descricao = document.getElementById("descricao").value;

  // Altera o texto do botão para indicar carregamento
  const btnSubmit = document.querySelector(".btn-submit");
  const textoOriginalBtn = btnSubmit.innerText;
  btnSubmit.innerText = "Cadastrando...";
  btnSubmit.disabled = true;

  try {
    // Envia os dados para a tabela 'solicitacoes' no Supabase
    const { data, error } = await supabase.from("solicitacoes").insert([
      {
        nome_solicitante: nome,
        bairro: bairro,
        tipo_servico: servico,
        descricao: descricao,
        // O banco de dados vai preencher o "status" como 'Pendente' automaticamente
      },
    ]);

    if (error) {
      throw error; // Se houver erro, joga para o catch
    }

    // Sucesso!
    alert("Solicitação cadastrada com sucesso!");
    formCadastrar.reset(); // Limpa o formulário
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    alert("Erro ao cadastrar solicitação: " + error.message);
  } finally {
    // Restaura o botão independentemente de erro ou sucesso
    btnSubmit.innerText = textoOriginalBtn;
    btnSubmit.disabled = false;
  }
});
