import { supabase } from "./supabase";

export async function handleSignUp(nom: string, prenom: string, email: string, password: string, role: "assmat" | "parent") {
    const { data, error} = await supabase.auth.signUp({
        email,
        password
    });
    if (error) {
        return { error };
    }
    if (data.user) {
        const { error: profileError } = await supabase.from(role).insert({
            id: data.user.id,
            prenom,
            nom,
            email
        });
        if (profileError) {
            return { error: profileError};
        }
    }
    return { error: null};
}