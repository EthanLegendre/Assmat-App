import { View, Text, Image } from "react-native";
import { getDateOfWeek } from "@/lib/utils/getDateWeek";
import { fetchWeekKidPlanning, PlanningDay } from "@/lib/utils/fetchWeekKidPlanning";
import { useEffect, useState } from "react";
import { Enfant } from "@/lib/kid/fetchKid";

export type EnfantPlanifie = Enfant & {
  heure_debut_prevue: string | null;
  heure_fin_prevue: string | null;
};


export function groupPlanningByDay(entries: PlanningDay[], week: Date[]) {
  return week.map((date) => {
    const dateStr = date.toISOString().split("T")[0];
    const enfantsCeJour = entries.filter((entry) => entry.date === dateStr);

    return {
      date,
      enfants: enfantsCeJour.map((entry) => ({
        ...entry.enfant,
        heure_debut_prevue: entry.heure_debut_prevue,
        heure_fin_prevue: entry.heure_fin_prevue
      })) as EnfantPlanifie[],
    };
  });
}

export function HomepageCalendar() {
  const week = getDateOfWeek();
  const debut = week[0].toISOString().split("T")[0];
  const fin = week[6].toISOString().split("T")[0];
  const [weekKid, setWeekKid] = useState<PlanningDay[] | null>(null);

  useEffect(() => {
    fetchWeekKidPlanning(debut, fin).then(({ data, error }) => {
      if (data) setWeekKid(data);
      if (error) console.error(error);
    });
  }, []);

  const planningParJour = weekKid ? groupPlanningByDay(weekKid, week) : [];

  return (
    <View className="w-full bg-white mt-8 shadow-lg rounded-[10px] flex-row justify-between px-4 py-4">
      {planningParJour.map((jour, index) => {
        const nom = jour.date.toLocaleDateString("fr-FR", { weekday: "short" });
        const numero = jour.date.getDate();
        const estAujourdhui = jour.date.toDateString() === new Date().toDateString();

        return (
          <View key={index} className="items-center gap-1.5">
            <Text className={`text-[10.5px] font-semibold ${estAujourdhui ? "text-violet-deep" : "text-ink-faint"}`}>
              {nom}
            </Text>
            <View className={`w-8 h-8 rounded-full items-center justify-center ${estAujourdhui ? "bg-violet" : ""}`}>
              <Text className={`text-[13px] font-bold ${estAujourdhui ? "text-white" : "text-ink-soft"}`}>
                {numero}
              </Text>
            </View>
            <View className="flex-column -space-x-1">
              {jour.enfants.map((enfant) => (
                !enfant.photo_url ? (
                  <View
                    key={enfant.id}
                    className="w-[12px] h-[12px] rounded-full items-center justify-center"
                    style={{ backgroundColor: enfant.couleur_avatar }}
                  >
                    <Text className=" text-[5px] text-white font-extrabold">
                      {enfant.prenom.charAt(0)}
                    </Text>
                  </View>
                ) : (
                  <Image
                    key={enfant.id}
                    source={{ uri: enfant.photo_url }}
                    className="h-[12px] w-[12px] rounded-full"
                  />
                )
              ))}
            </View>
          </View>
        );
      })}
    </View>
  );
}