import { supabase } from "@/lib/supabase";
import { Child } from "@/types/enfant";
import { mapToChild } from "../utils/mapToChild";

export async function getHeureDebut(sessionId: string): Promise<{ data: string | null; error: string | null }> {
    const { data, error } = await supabase
        .from("session_garde")
        .select("heure_debut")
        .eq("id", sessionId)
        .single();

    if (error) {
        return { data: null, error: error.message };
    }

    return { data: data.heure_debut, error: null };
}

export async function fetchKid(): Promise<{ data: Child[] | null; error: string | null}> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { data: null, error: "User not connected" };
    }
    const { data, error } = await supabase.from("enfant").select("*").eq("assmat_id", user.id);
    if (error) {
        return { data: null, error: error.message };
    }

    return {data: data.map(mapToChild), error: null};
}

export async function fetchOneKid(id :string): Promise<{ data: Child | null; error: string | null}> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { data: null, error: "User not connected" };
    }
    const { data, error } = await supabase.from("enfant").select("*").eq("id", id).single();
    if (error) {
        return { data: null, error: error.message };
    }
    return {data: mapToChild(data), error: null};
}