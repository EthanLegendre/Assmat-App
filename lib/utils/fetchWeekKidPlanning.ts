import { supabase } from "@/lib/supabase";
import { Enfant } from "@/lib/kid/fetchKid";

export type PlanningDay = {
    id: string;
    enfant_id: string;
    date: string;
    heure_debut_prevue: string | null;
    heure_fin_prevue: string | null;
    enfant: Enfant;
};

export async function fetchWeekKidPlanning(dateDebut: string, dateFin: string): Promise<{ data: PlanningDay[] | null; error: string | null}> {
    const { data, error } = await supabase
        .from("planning")
        .select("*, enfant(*)")
        .gte("date", dateDebut)
        .lte("date", dateFin);
    
    if (error) {
        return { data: null, error: error.message };
    }
    return { data: data as PlanningDay[], error: null};
}