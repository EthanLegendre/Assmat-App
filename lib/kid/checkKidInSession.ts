import { supabase } from "@/lib/supabase";

export async function checkKidInSession(idKid: string): Promise<boolean> {
    const { data: session, error } = await supabase.from("session_garde").select("*").eq("enfant_id", idKid).eq("status", "en_cours").maybeSingle();
    if (error) {
        console.error(error);
        return false;
    }
    return session !== null;
}