import { supabase } from "@/lib/supabase";

export type Session = {
    id: string;
    enfant_id: string;
    date: string;
    heure_debut: string;
    heure_fin: string | null;
    status: "en_cours" | "terminee";
}

export async function getSessionByKidId(idKid: string, status: "en_cours" | "terminee"): Promise<{ data: Session | null; error: string | null }> {
    const { data, error } = await supabase
        .from("session_garde")
        .select("*")
        .eq("enfant_id", idKid)
        .eq("status", status)
        .maybeSingle();

    if (error) {
        return { data: null, error: error.message };
    }
    return { data, error: null };
}