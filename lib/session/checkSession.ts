import { router } from "expo-router";
import { supabase } from "@/lib/supabase";

export async function checkSession() {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        router.replace("/login");
        return false;
    } else {
        return true;
    }
}