import { supabase } from "./supabase";
import { router } from "expo-router";

export async function handleSignOut() {
    await supabase.auth.signOut();
    router.replace("/login");
}