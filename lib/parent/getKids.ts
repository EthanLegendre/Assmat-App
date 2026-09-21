import { Child } from "@/types/enfant";
import { supabase } from "../supabase";
import { mapToChild } from "../utils/mapToChild";

export async function getKids(): Promise<{ kids: Child[] | null }> {
    const { data: { user }, error: errorGetUser } = await supabase.auth.getUser();

    if (errorGetUser || !user) {
        console.error(errorGetUser?.message);
        return { kids: null };
    }

    const { data, error } = await supabase
        .from("parent_enfant")
        .select("*, enfant(*)")
        .eq("parent_id", user.id);

    if (error) {
        console.error(error.message);
        return { kids: null };
    }

    return { kids: data.map((row) => mapToChild(row.enfant)) };
}