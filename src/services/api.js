import { createClient } from "@supabase/supabase-js";

// Substitua estas strings pelos valores reais do seu painel do Supabase
const supabaseUrl = "https://nwinufbkbmpqowycabhu.supabase.co";
const supabaseKey = "sb_publishable_P7lq2lLn1RZtK1L5qRftRA_FUuBZqrM";

export const supabase = createClient(supabaseUrl, supabaseKey);
