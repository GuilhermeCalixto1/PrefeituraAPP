import api from '../services/api.js';
//Referencias DOM

const inpCodigo = document.getElementById('inpCodigo');
const btnExcluir = document.getElementById("btnExcluir");
const btnVoltar = document.getElementById("btnVoltar");

//Logica

async function exclusao(){
    const codfor = inpCodigo.value;
    const resposta = await api.delete(`/fornecedor/${codfor}`);
    console.log(resposta);
};

btnExcluir.onclick = ()=>{
    exclusao();
}

btnVoltar.onclick = ()=>{
    window.location.href = `${import.meta.env.BASE_URL}index.html`;
};
