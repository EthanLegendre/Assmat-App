import { KidInfo } from "@/components/kid/kidInfo";
import "@/global.css";
import { fetchUser, User } from "@/lib/utils/fetchUser";
import { Enfant, fetchKid } from "@/lib/kid/fetchKid";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { checkKidInSession } from "@/lib/kid/checkKidInSession";

function KidRow({ enfant, onPress }: { enfant: Enfant; onPress: () => void }) {
  const [isInSession, setIsInSession] = useState(false);

  useEffect(() => {
    checkKidInSession(enfant.id).then((setIsInSession));
  }, [enfant.id]);

  return (
    <View
        className="flex-row items-center justify-between border-b-1 border-[#E5D4FF] rounded-2xl px-4 py-3 mb-4"
    >
      <View className="flex-row items-center gap-3">
        {!enfant.photo_url ? (
          <View
            className="w-[50px] h-[50px] rounded-full items-center justify-center"
            style={{ backgroundColor: enfant.couleur_avatar }}
          >
            <Text className="text-white font-extrabold">
              {enfant.prenom.charAt(0)}
            </Text>
          </View>
        ) : (
          <Image
            source={{ uri: enfant.photo_url }}
            className="h-[50px] w-[50px] rounded-full">
          </Image>
        )}
        <View>
          <Text className="font-bold text-[14.5px] text-ink">
            {enfant.prenom}
          </Text>
          {!isInSession ? (
            <Text className="text-ink-soft text-[12px] font-medium mt-0.5">
              Prévu à 16h30
            </Text>
          ) : (
            <Text>
              In session
            </Text>
          ) }
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
  const [user, setUser] = useState<User | null>(null);
  const [enfants, setEnfants] = useState<Enfant[]>([]);
  const [activeKid, setActiveKid] = useState<Enfant | null>(null);

  useEffect(() => {
    fetchUser("assmat").then(({ data, error }) => {
      setUser(data);
      if (error) {
        console.error(error);
      }
    });
  }, []);

  useEffect(() => {
    fetchKid().then(({ data, error }) => {
      if (data) {
        setEnfants(data);
      }
      if (error) {
        console.error(error);
      }
    });
  }, []);

  return (
    <View className="mt-5 border-[1px] border-[#E5D4FF] rounded-[20px] px-2 py-4 bg-white shadow-xl">
      {enfants.map((enfant) => (
        <KidRow key={enfant.id} enfant={enfant} onPress={() => setActiveKid(enfant)} />
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

      {activeKid && (
        <KidInfo enfant={activeKid} onClose={() => setActiveKid(null)} />
      )}
    </View>
  );
}
