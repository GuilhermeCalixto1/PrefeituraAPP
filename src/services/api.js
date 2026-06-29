import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nwinufbkbmpqowycabhu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53aW51ZmJrYm1wcW93eWNhYmh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2Njg0MDYsImV4cCI6MjA5ODI0NDQwNn0.0kJp4Dve6mg-CKXGhmICTbZQ_9eivO3dsRX5MtcP9Nk";

export const supabase = createClient(supabaseUrl, supabaseKey);

export const STATUS_SOLICITACAO = [
  "Pendente",
  "Em andamento",
  "Concluída",
  "Cancelada",
];

export async function listarSolicitacoes(
  statusFiltro = "Todas",
  ordemCodigo = "desc",
) {
  let query = supabase
    .from("Prefeitura")
    .select(
      "id,nome_solicitante,bairro,tipo_servico,descricao,status,created_at",
    )
    .order("id", { ascending: ordemCodigo === "asc" });

  if (statusFiltro && statusFiltro !== "Todas") {
    query = query.eq("status", statusFiltro);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function criarSolicitacao(solicitacao) {
  const payload = {
    ...solicitacao,
    status: solicitacao.status || "Pendente",
  };

  const { data, error } = await supabase
    .from("Prefeitura")
    .insert([payload])
    .select("id")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function alterarStatusSolicitacao(id, statusSolicitacao) {
  const { data, error } = await supabase
    .from("Prefeitura")
    .update({ status: statusSolicitacao })
    .eq("id", id)
    .select("id,status")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function atualizarSolicitacao(id, solicitacao) {
  const { data, error } = await supabase
    .from("Prefeitura")
    .update({
      nome_solicitante: solicitacao.nome_solicitante,
      bairro: solicitacao.bairro,
      tipo_servico: solicitacao.tipo_servico,
      descricao: solicitacao.descricao,
      status: solicitacao.status || "Pendente",
    })
    .eq("id", id)
    .select("id")
    .single();

  if (error) {
    throw error;
  }

  return data;
}
