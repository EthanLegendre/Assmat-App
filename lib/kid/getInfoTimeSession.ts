import { supabase } from "../supabase";
import { Child } from "@/types/enfant";

function heureEnMinutes(heure: string): number {
  const parts = heure.split(":").map(Number);
  return parts[0] * 60 + parts[1];
}

export async function getInfoTimeSessionKid(enfant: Child) : Promise<{ nbrDay: number, totalHour: number, nbHourWeek: number}> {
    const { data, error} = await supabase.from("session_garde").select("heure_debut, heure_fin").eq("enfant_id", enfant.id).eq("status", "terminée");
    let totalMinute = 0;

    if (error || !data) {
        console.error(error);
        return { nbrDay: 0, totalHour: 0, nbHourWeek: 0};
    }
    data.forEach((session) => {
        if (!session.heure_debut || !session.heure_fin) return;
        const start = heureEnMinutes(session.heure_debut);
        const end = heureEnMinutes(session.heure_fin);
        
        let diff = end-start;
        if (diff < 0)
            diff += 24 * 60;
        totalMinute += diff;
    });
    const totalHour = totalMinute / 60;
    return { nbrDay: data.length, totalHour: totalHour, nbHourWeek: 0};
}