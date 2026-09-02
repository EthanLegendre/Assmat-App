import { supabase } from "./supabase";

export async function handleLogin(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
            email,
            password
    })
    return { error };
}