import { getSessionByKidId } from "@/lib/session/getSessionByIdKid";
import { tempsEcoule } from "@/lib/utils/tempsEcoule";

export async function updateSessionTimeKid(idKid: string): Promise<string | null> {
    const { data: session } = await getSessionByKidId("en cours", idKid);

    if (!session) {
        return null;
    }

    return tempsEcoule(session.heure_debut);
}