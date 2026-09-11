import { KidInfo } from "@/components/kid/kidInfo";
import "@/global.css";
import { fetchUser, User } from "@/lib/utils/fetchUser";
import { fetchKid } from "@/lib/kid/fetchKid";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { checkKidInSession } from "@/lib/kid/checkKidInSession";
import { getSessionByKidId, Session } from "@/lib/session/getSessionByIdKid";
import { getMinuteEcoulees } from "@/lib/utils/getMinuteEcoule";
import { Child } from "@/types/enfant";

function KidRow({ child, onPress }: { child: Child; onPress: () => void }) {
  const [isInSession, setIsInSession] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const taux_minute = child.hourlyWageRate / 60;
  const [argent, setArgent] = useState(0);

  useEffect(() => {
    setIsInSession(false);
    checkKidInSession(child.id).then((setIsInSession));
    getSessionByKidId(child.id, "en_cours").then(({ data, error}) => {
      if (data) {
        setSession(data);
      }
      if (error) {
        console.error(error);
      }
    })
  }, [child.id]);

    useEffect(() => {
      if (!session) {
        return;
      }
      const interval = setInterval(() => {
            setArgent(getMinuteEcoulees(session.heure_debut) * taux_minute);
        }, 1000);
        return () => clearInterval(interval);
    }, [session?.heure_debut]);

  return (
    <View
        className="flex-row items-center justify-between border-b-1 border-[#E5D4FF] rounded-2xl px-4 py-3 mb-4"
    >
      <View className="flex-row items-center gap-3">
        {!child.profilePictureUrl ? (
          <View
            className="w-[50px] h-[50px] rounded-full items-center justify-center"
            style={{ backgroundColor: child.avatarColor }}
          >
            <Text className="text-white font-extrabold">
              {child.firstname.charAt(0)}
            </Text>
          </View>
        ) : (
          <Image
            source={{ uri: child.profilePictureUrl }}
            className="h-[50px] w-[50px] rounded-full">
          </Image>
        )}
        <View>
          <Text className="font-bold text-[14.5px] text-ink">
            {child.firstname}
          </Text>
          {!isInSession ? (
            <Text className="text-ink-soft text-[12px] font-medium mt-0.5">
              Prévu à 16h30
            </Text>
          ) : (
            <View className="flex-column justify-center">
              <Text className="text-[12px] text-[#2FAE6B] font-semibold">
                  En garde depuis {session?.heure_debut.slice(0, 5)}
              </Text>
              <Text className="text-[10px] font-black mt-3">
                  +{(child.dailyAllowance + argent).toFixed(2)}<Text className="text-[7px]">€</Text>
              </Text>
            </View>
          )}
        </View>
      </View>
      <Pressable
        className="w-9 h-9 rounded-full bg-violet items-center justify-center"
        onPress={onPress}
      >
        <Ionicons name="chevron-forward" color="#fff" size={16} />
      </Pressable>
    </View>
  )
}

export function HomepageKidsRow() {
  const [childs, setChilds] = useState<Child[]>([]);
  const [activeChild, setActiveChild] = useState<Child | null>(null);

  useEffect(() => {
    fetchKid().then(({ data, error }) => {
      if (data) {
        setChilds(data);
      }
      if (error) {
        console.error(error);
      }
    });
  }, []);

  return (
    <View className="mt-5 border-[1px] border-[#E5D4FF] rounded-[20px] px-2 py-4 bg-white shadow-xl">
      {childs.map((child) => (
        <KidRow key={child.id} child={child} onPress={() => setActiveChild(child)} />
      ))}

      <Pressable
        className="mt-6 flex-row w-full h-14 justify-center items-center rounded-[14px] border-[1.5px] border-ink-faint mb-4"
        style={{ borderStyle: "dashed" }}
        onPress={() => router.push("/addKid")}
      >
        <Text className="font-semibold text-[15px] text-violet-deep">
          + Ajouter un enfant
        </Text>
      </Pressable>

      {activeChild && (
        <KidInfo child={activeChild} onClose={() => setActiveChild(null)} />
      )}
    </View>
  );
}
