import { supabase } from "./supabase";
import { router } from "expo-router";

export async function checkSession() {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        router.replace("/login");
        return false;
    } else {
        return true;
    }
}