import   api   from '../services/api.js'

// Referências do DOM - HTML

const btnConsultar = document.getElementById('btnConsultar');
const btnCadastrar = document.getElementById('btnCadastrar');
const btnAlterar = document.getElementById('btnAlterar');


// Lógica

btnConsultar.onclick = async ()=>{
    const response = await api.get('/fornecedorcod');
    console.log(response.data);
    
};


btnCadastrar.onclick = ()=>{
     window.location.href = `${import.meta.env.BASE_URL}src/pages/cadastrar.html`;
};

btnAlterar.onclick = ()=>{
    window.location.href = `${import.meta.env.BASE_URL}src/pages/alterar.html`;
};

btnExcluir.onclick = ()=>{
    window.location.href = `${import.meta.env.BASE_URL}src/pages/excluir.html`;
};



btnConsultar.onclick = () => {
    window.location.href= `${import.meta.env.BASE_URL}src/pages/consultar.html`;
}