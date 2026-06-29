import {
  STATUS_SOLICITACAO,
  alterarStatusSolicitacao,
  listarSolicitacoes,
} from "../services/api.js";

const btnVoltar = document.getElementById("btnVoltar");
const btnAtualizar = document.getElementById("btnAtualizar");
const statusFiltro = document.getElementById("statusFiltro");
const ordemCodigo = document.getElementById("ordemCodigo");
const resultadoConsultaSolicitacoes = document.getElementById(
  "resultadoConsultaSolicitacoes",
);

function escapeHtml(valor) {
  return String(valor)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatarData(data) {
  if (!data) {
    return "-";
  }

  return new Date(data).toLocaleString("pt-BR");
}

function renderStatusOptions(selectElement, selectedStatus) {
  selectElement.innerHTML = STATUS_SOLICITACAO.map(
    (status) =>
      `<option value="${status}" ${status === selectedStatus ? "selected" : ""}>${status}</option>`,
  ).join("");
}

function renderSolicitacoes(solicitacoes) {
  if (!Array.isArray(solicitacoes) || solicitacoes.length === 0) {
    resultadoConsultaSolicitacoes.innerHTML = `
      <div class="estado-vazio">
        <h3>Nenhuma solicitação encontrada</h3>
        <p>Use o filtro acima ou cadastre uma nova solicitação.</p>
      </div>
    `;
    return;
  }

  resultadoConsultaSolicitacoes.innerHTML = `
    <div class="tabela-solicitacoes-container">
      <table class="tabela-solicitacoes">
        <thead>
          <tr>
            <th>Código</th>
            <th>Solicitante</th>
            <th>Bairro</th>
            <th>Serviço</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Criada em</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          ${solicitacoes
            .map(
              (solicitacao) => `
                <tr>
                  <td>${solicitacao.id ?? "-"}</td>
                  <td>${escapeHtml(solicitacao.nome_solicitante ?? "-")}</td>
                  <td>${escapeHtml(solicitacao.bairro ?? "-")}</td>
                  <td>${escapeHtml(solicitacao.tipo_servico ?? "-")}</td>
                  <td>${escapeHtml(solicitacao.descricao ?? "-")}</td>
                  <td><span class="status-badge">${escapeHtml(solicitacao.status ?? "-")}</span></td>
                  <td>${formatarData(solicitacao.created_at)}</td>
                  <td>
                    <div class="status-action">
                      <select data-status-select data-id="${solicitacao.id}"></select>
                      <button data-save-status data-id="${solicitacao.id}" type="button">Salvar</button>
                    </div>
                  </td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;

  resultadoConsultaSolicitacoes
    .querySelectorAll("[data-status-select]")
    .forEach((selectElement) => {
      const id = Number(selectElement.dataset.id);
      const solicitacao = solicitacoes.find((item) => item.id === id);
      renderStatusOptions(selectElement, solicitacao?.status ?? "Pendente");
    });

  resultadoConsultaSolicitacoes
    .querySelectorAll("[data-save-status]")
    .forEach((buttonElement) => {
      buttonElement.addEventListener("click", async () => {
        const id = Number(buttonElement.dataset.id);
        const selectElement = resultadoConsultaSolicitacoes.querySelector(
          `[data-status-select][data-id="${id}"]`,
        );
        const novoStatus = selectElement.value;
        const textoOriginal = buttonElement.innerText;

        buttonElement.disabled = true;
        buttonElement.innerText = "Salvando...";

        try {
          await alterarStatusSolicitacao(id, novoStatus);
          await carregarSolicitacoes();
          alert("Status atualizado com sucesso!");
        } catch (error) {
          console.error("Erro ao atualizar status:", error);
          alert("Erro ao atualizar status: " + error.message);
        } finally {
          buttonElement.innerText = textoOriginal;
          buttonElement.disabled = false;
        }
      });
    });
}

async function carregarSolicitacoes() {
  resultadoConsultaSolicitacoes.innerHTML = `<h3>Carregando solicitações...</h3>`;

  try {
    const solicitacoes = await listarSolicitacoes(
      statusFiltro.value,
      ordemCodigo.value,
    );
    renderSolicitacoes(solicitacoes);
  } catch (error) {
    console.error("Erro ao carregar solicitações:", error);
    resultadoConsultaSolicitacoes.innerHTML = `
      <div class="estado-vazio">
        <h3>Não foi possível carregar as solicitações</h3>
        <p>${escapeHtml(error.message)}</p>
      </div>
    `;
  }
}

statusFiltro.innerHTML = ["Todas", ...STATUS_SOLICITACAO]
  .map((status) => `<option value="${status}">${status}</option>`)
  .join("");
statusFiltro.value = "Todas";

ordemCodigo.innerHTML = [
  { value: "desc", label: "Código: maior para menor" },
  { value: "asc", label: "Código: menor para maior" },
]
  .map((opcao) => `<option value="${opcao.value}">${opcao.label}</option>`)
  .join("");
ordemCodigo.value = "desc";

statusFiltro.addEventListener("change", carregarSolicitacoes);
ordemCodigo.addEventListener("change", carregarSolicitacoes);
btnAtualizar.addEventListener("click", carregarSolicitacoes);

btnVoltar.onclick = () => {
  window.location.href = `${import.meta.env.BASE_URL}index.html`;
};

carregarSolicitacoes();
