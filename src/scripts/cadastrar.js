import  api  from '../services/api.js';



// Referências do DOM HTML

const inpNome = document.getElementById('inpNome');
const inpEmail = document.getElementById('inpEmail');
const inpUf = document.getElementById('inpUf');
const inpPassword = document.getElementById('inpPassword');
const inpLevel = document.getElementById('inpLevel');

const btnCadastrar = document.getElementById('btnCadastrar');
const btnLimpar = document.getElementById('btnLimpar');
const btnVoltar = document.getElementById('btnVoltar');

// Lógica de Programação

function getDados(){
    const nome = inpNome.value;
    const email = inpEmail.value;
    const uf = inpUf.value;
    const password = inpPassword.value;
    const level = inpLevel.value;

    const dados = {
        'nome':nome,
        'email':email,
        'uf':uf,
        'password':password,
        'level':level
    }
    //console.log(dados);
    return dados;
}


async function createFor(dados){
    try {const response = await api.post('/fornecedor',dados);
    console.log(response);
    alert('Cadastro Realizado');
    }

    catch (error){
        console.error(error);
        alert('Error');

    }
}


btnCadastrar.onclick = ()=>{
    const dados = getDados();
    createFor(dados);
} 

btnVoltar.onclick = ()=>{
    window.location.href = `${import.meta.env.BASE_URL}index.html`;
};

btnLimpar.onclick = ()=>{
     inpNome.value = '';
     inpEmail.value = '';
     inpUf.value = '';
     inpPassword.value = '';
     inpLevel.value = '';
     inpCod.value = '';
    
};