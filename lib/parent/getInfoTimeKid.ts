import { supabase } from "../supabase";
import { dureeEnMinutes, minutesEcoulees, minutesEnHeure, toLocalDateString } from "@/lib/parent/calculeTime";

export async function fetchMonthSessions(enfantId: string, referenceDate: Date = new Date()) {
  const debutMois = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 1);
  const finMois = new Date(referenceDate.getFullYear(), referenceDate.getMonth() + 1, 1);

  const { data, error } = await supabase
    .from("session_garde")
    .select("*")
    .eq("enfant_id", enfantId)
    .gte("date", toLocalDateString(debutMois))
    .lt("date", toLocalDateString(finMois));

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function getInfoTimeKid(kidId: string, kidMontent: number, kidIndemn: number): Promise<{ totalHour: string, totalSession: string, totalMoney: string}> {
    const { data } = await fetchMonthSessions(kidId);

    if (!data) {
        return { totalHour: "0", totalSession: "0", totalMoney: "0"};
    }

    const nbrSession = data.length;
    let totalMoney = nbrSession * kidIndemn;
    let totalMinute = 0;

    data.forEach((session) => {
        if (session.heure_debut && session.heure_fin) {
            totalMinute += dureeEnMinutes(session.heure_debut, session.heure_fin);
        }
    })

    totalMoney += (totalMinute * (kidMontent / 60));
    
    return { totalHour: minutesEnHeure(totalMinute), totalSession: nbrSession.toString(), totalMoney: totalMoney.toFixed(0).toString()}
}