import { getSessionByKidId } from "@/lib/session/getSessionByIdKid";
import { supabase } from "@/lib/supabase";

export async function stopSession(idKid: string) {
    const { data: session, error: fetchError } = await getSessionByKidId(idKid, "en_cours");

    if (fetchError || !session) {
        return { data: null, error: fetchError ?? "Aucune session en cours pour cet enfant" };
    }

    const { data, error } = await supabase
        .from("session_garde")
        .update({
            status: "terminée",
            heure_fin: new Date().toTimeString().split(" ")[0],
        })
        .eq("id", session.id)
        .select()
        .single();

    return error ? { data: null, error: error.message } : { data, error: null };
}