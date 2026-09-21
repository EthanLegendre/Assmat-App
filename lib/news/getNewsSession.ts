import { News } from "@/types/news";
import { supabase } from "../supabase";
import { getSessionByKidId } from "../session/getSessionByIdKid";
import { mapToNews } from "./mapToNews";

export async function getNewsSession(kidId: string): Promise<{ news: News[] | null, error: string | null}> {
    const { data: session, error } = await getSessionByKidId(kidId, "en_cours");

    if (error) return { news: null, error: error};
    if (!session) return { news: null, error: "L'enfant n'est plus en garde"};
    
    const { data: news, error: errorGetNews } = await supabase.from("news").select("*").eq("session_garde_id", session.id);
    if (errorGetNews) return { news: null, error: errorGetNews.message};

    return { news: news.map(mapToNews), error: null};
}