import api from "../services/api.js";

// Referências do DOM - HTML
const btnVoltar = document.getElementById("btnVoltar");
const nomeFornecedor = document.getElementById("nomeFornecedor");
const resultadoConsultaNome = document.getElementById("resultadoConsultaNome");

// Lógica de Programação')

function renderTableFornecedores(fornecedores) {
  console.log("Construindo a tabela....");
  if (!Array.isArray(fornecedores) || fornecedores?.length === 0) {
    resultadoConsultaNome.innerHTML = `<h3>Nenhum registro encontrado</h3>`;
  } else {
    fornecedores.sort((a, b) => {
      return a.codfor - b.codfor;
    });
    resultadoConsultaNome.innerHTML = `
                                          <div class="tabela-fornecedor-container">
                                            <table class="tabela-fornecedor">
                                              <thead>
                                                    <th>Código</th>
                                                    <th>Nome</th>
                                                    <th>Email</th>
                                                    <th>UF</th>
                                                    <th>Level</th>
                                              </thead>
                                              <tbody>
                                                    ${fornecedores
                                                      .map((f) => {
                                                        return `
                                                              <tr>
                                                                  <td>${f.codfor}</td>
                                                                  <td>${f.nome} </td>
                                                                  <td>${f.email} </td>
                                                                  <td>${f.uf}</td>
                                                                  <td>${f.level} </td>
                                                              </tr>
                                                            `;
                                                      })
                                                      .join("")}
                                              </tbody>
                                            </table>  
                                          </div>
                                          `;
  }
}

function renderLoading() {
  resultadoConsultaNome.innerHTML = `<h3>Buscando no banco de dados...</h3>`;
}

nomeFornecedor.oninput = async () => {
  console.log("Executando a consulta no banco de dados....");
  const nome = nomeFornecedor.value;
  renderLoading();
  if (!nome) {
    const response = await api.get("/fornecedornome");
    let fornecedores = response.data;
    console.log(fornecedores);
    console.log("Carregando todos os registros....");
    renderTableFornecedores(fornecedores);
  } else {
    const response = await api.get(`/fornecedorByNome/${nome}`);
    let fornecedores = response.data;
    console.log(fornecedores);
    console.log("Carregando todos os registros....");
    renderTableFornecedores(fornecedores);
  }
};

btnVoltar.onclick = () => {
  window.location.href = `${import.meta.env.BASE_URL}index.html`;
};
