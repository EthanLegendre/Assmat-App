import { supabase } from "./supabase";

export async function handleDeleteKid(idKid: string) {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return;
    }
    const { data, error } = await supabase.from("enfant").delete().eq("id", idKid);
    if (error) {
        console.error(error);
    }
}