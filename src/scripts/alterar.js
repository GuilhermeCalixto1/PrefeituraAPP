import api from "../services/api.js";

// referências do DOM HTML

const inpCod = document.getElementById('inpCod');
const inpNome = document.getElementById('inpNome');
const inpEmail = document.getElementById('inpEmail');
const inpUf = document.getElementById('inpUf');
const inpPassword = document.getElementById('inpPassword');
const inpLevel = document.getElementById('inpLevel');

const btnAlterar = document.getElementById('btnAlterar');
const btnLimpar = document.getElementById('btnLimpar');
const btnVoltar = document.getElementById('btnVoltar');

//lógica de Programação

function getDados(){
    const nome = inpNome.value;
    const email = inpEmail.value;
    const uf = inpUf.value;
    const password = inpPassword.value;
    const level = inpLevel.value;
    
    // A constante data é um objeto JSON 
    const data ={
        nome : nome,
        email : email,
        uf : uf,
        password : password,
        level : level
    }
    return data;
}


async function updateFor(){
    try { const codfor = inpCod.value;
    const data = getDados();
    const response = await api.put(`/fornecedor/${codfor}`, data);
    console.log(response);

        alert(`Alteração Realizada`)
}

    catch(error){
          console.error(error);
        alert('Error');
    }
}


btnAlterar.onclick = ()=>{
    updateFor();
};

btnLimpar.onclick = ()=>{
     inpNome.value = '';
     inpEmail.value = '';
     inpUf.value = '';
     inpPassword.value = '';
     inpLevel.value = '';
     inpCod.value = '';
    
};

btnVoltar.onclick = ()=>{
    window.location.href = `${import.meta.env.BASE_URL}index.html`;
};