import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system/legacy";
import { decode } from "base64-arraybuffer";
import { supabase } from "@/lib/supabase";

export async function pickAndUploadPicture(userId: string): Promise<{ url: string | null; error: string | null }> {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
        return { url: null, error: "no permission" };
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 0.7,
        allowsEditing: true,
        aspect: [1, 1],
    });

    if (result.canceled) {
        return { url: null, error: null };
    }

    const uri = result.assets[0].uri;

    const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
    });
    const arrayBuffer = decode(base64);

    const filename = `${userId}/${Date.now()}.jpg`;
    const { error: uploadError } = await supabase.storage
        .from("pictures")
        .upload(filename, arrayBuffer, { contentType: "image/jpeg" });

    if (uploadError) {
        return { url: null, error: uploadError.message };
    }

    const { data } = supabase.storage.from("pictures").getPublicUrl(filename);
    return { url: data.publicUrl, error: null };
}