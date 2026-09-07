import { supabase } from "@/lib/supabase";

export async function createSession(enfantId: string) {
    const currentDate = new Date();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { data: null, error: "User not connected"};
    }

    const { data, error} = await supabase.from("session_garde").insert({
        enfant_id: enfantId,
        date: currentDate.toISOString().split("T")[0],
        heure_debut: currentDate.toTimeString().split(" ")[0],
        status: "en_cours"
    }).select().single();

    if (error) {
        return { data: null, error: error.message}
    }
    return { data, error: null};
}