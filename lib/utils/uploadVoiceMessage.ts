import * as FileSystem from "expo-file-system/legacy"
import { decode } from "base64-arraybuffer";
import { supabase } from "../supabase";

export async function uploadVoiceMessage(userId: string, uri: string): Promise <{ url: string | null, error: string | null }> {
    const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
    });
    const arrayBuffer = decode(base64);

    const filename = `${userId}/${Date.now()}.m4a`;
    const { error: errorUpload } = await supabase.storage.from("voices").upload(filename, arrayBuffer, { contentType: "audio/m4a" });
    if (errorUpload) return { url: null, error: errorUpload.message };
    const { data } = await supabase.storage.from("voices").getPublicUrl(filename);
    return { url: data.publicUrl, error: null };
}