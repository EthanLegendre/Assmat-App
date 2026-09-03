import { supabase } from "./supabase";

export type Enfant = {
  id: string;
  assmat_id: string;
  prenom: string;
  nom: string;
  date_naissance: string;
  couleur_avatar: string;
  pin_code: string;
  jours_garde: string[] | null;
  code_invitation: string | null;
  created_at: string;
  updated_at: string;
  contact_parent_nom: string;
  contact_parent_email: string;
  contact_parent_tel: string;
  photo_url: string;
};

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