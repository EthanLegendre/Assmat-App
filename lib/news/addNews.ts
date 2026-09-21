import { supabase } from "../supabase";

export async function addNews(title:string, description:string, photoUrl: string | null, vocalUrl: string | null, typeId: number, sessionId: string): Promise<{ error: string | null}> {
    const type = [
        "timing",
        "food",
        "activity",
        "sleep"
    ]
    
    const { error } = await supabase.from("news").insert({
        session_garde_id: sessionId,
        titre: title,
        description: description,
        photo_url: photoUrl,
        audio_url: vocalUrl,
        type: type[typeId],
    }).select().single()
    
    if (error) {
        console.error(error);
        return {error: error.message};
    }
    return {error: null};
}