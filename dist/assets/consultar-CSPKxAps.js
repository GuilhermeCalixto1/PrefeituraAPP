import"./style-COyOslQ-.js";import{S as u,l as v,a as m}from"./api-CdzKJSeH.js";const p=document.getElementById("btnVoltar"),g=document.getElementById("btnAtualizar"),s=document.getElementById("statusFiltro"),n=document.getElementById("ordemCodigo"),r=document.getElementById("resultadoConsultaSolicitacoes");function o(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function S(t){return t?new Date(t).toLocaleString("pt-BR"):"-"}function $(t,a){t.innerHTML=u.map(e=>`<option value="${e}" ${e===a?"selected":""}>${e}</option>`).join("")}function y(t){if(!Array.isArray(t)||t.length===0){r.innerHTML=`
      <div class="estado-vazio">
        <h3>Nenhuma solicitação encontrada</h3>
        <p>Use o filtro acima ou cadastre uma nova solicitação.</p>
      </div>
    `;return}r.innerHTML=`
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
          ${t.map(a=>`
                <tr>
                  <td>${a.id??"-"}</td>
                  <td>${o(a.nome_solicitante??"-")}</td>
                  <td>${o(a.bairro??"-")}</td>
                  <td>${o(a.tipo_servico??"-")}</td>
                  <td>${o(a.descricao??"-")}</td>
                  <td><span class="status-badge">${o(a.status??"-")}</span></td>
                  <td>${S(a.created_at)}</td>
                  <td>
                    <div class="status-action">
                      <select data-status-select data-id="${a.id}"></select>
                      <button data-save-status data-id="${a.id}" type="button">Salvar</button>
                    </div>
                  </td>
                </tr>
              `).join("")}
        </tbody>
      </table>
    </div>
  `,r.querySelectorAll("[data-status-select]").forEach(a=>{const e=Number(a.dataset.id),l=t.find(d=>d.id===e);$(a,l?.status??"Pendente")}),r.querySelectorAll("[data-save-status]").forEach(a=>{a.addEventListener("click",async()=>{const e=Number(a.dataset.id),d=r.querySelector(`[data-status-select][data-id="${e}"]`).value,h=a.innerText;a.disabled=!0,a.innerText="Salvando...";try{await m(e,d),await i(),alert("Status atualizado com sucesso!")}catch(c){console.error("Erro ao atualizar status:",c),alert("Erro ao atualizar status: "+c.message)}finally{a.innerText=h,a.disabled=!1}})})}async function i(){r.innerHTML="<h3>Carregando solicitações...</h3>";try{const t=await v(s.value,n.value);y(t)}catch(t){console.error("Erro ao carregar solicitações:",t),r.innerHTML=`
      <div class="estado-vazio">
        <h3>Não foi possível carregar as solicitações</h3>
        <p>${o(t.message)}</p>
      </div>
    `}}s.innerHTML=["Todas",...u].map(t=>`<option value="${t}">${t}</option>`).join("");s.value="Todas";n.innerHTML=[{value:"desc",label:"Código: maior para menor"},{value:"asc",label:"Código: menor para maior"}].map(t=>`<option value="${t.value}">${t.label}</option>`).join("");n.value="desc";s.addEventListener("change",i);n.addEventListener("change",i);g.addEventListener("click",i);p.onclick=()=>{window.location.href="/index.html"};i();
