import { supabase } from "@/lib/supabase";

export type Enfant = {
  id: string;
  assmat_id: string;
  nom: string;
  prenom: string;
  date_naissance: string;
  couleur_avatar: string;
  photo_url: string;
  jours_garde: string[] | null;
  contact_parent_nom: string;
  contact_parent_prenom: string;
  contact_parent_telephone: string;
  contact_parent_email: string;
  code_invitation: string;
  created_at: string;
  updated_at: string;
  rémunération_taux_horaire: number;
};

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

export async function fetchKid(): Promise<{ data: Enfant[] | null; error: string | null}> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { data: null, error: "User not connected" };
    }
    const { data, error } = await supabase.from("enfant").select("*").eq("assmat_id", user.id);
    if (error) {
        return { data: null, error: error.message };
    }

    return {data, error: null};
}

export async function fetchOneKid(id :string): Promise<{ data: Enfant | null; error: string | null}> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { data: null, error: "User not connected" };
    }
    const { data, error } = await supabase.from("enfant").select("*").eq("id", id).single();
    if (error) {
        return { data: null, error: error.message };
    }
    return {data, error: null};
}