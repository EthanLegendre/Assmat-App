import { HomepageCalendar } from "@/components/homepage/homepageCalendar";
import { HomepageClock } from "@/components/homepage/homepageClock";
import { HomepageKidsRow } from "@/components/homepage/homepageKidsRow";
import { TopLogo } from "@/components/topLogo";
import "@/global.css";
import { checkSession } from "@/lib/session/checkSession";
import { getNbrKidInSession } from "@/lib/session/getNbrKidInSession";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function App() {
  const insets = useSafeAreaInsets();
  const [valideSession, setValideSession] = useState(false);
  const [nbrEnfantInSession, setNbrEnfantInSession] = useState(0);

  useEffect(() => {
    checkSession().then((ok) => {
      if (ok) {
        setValideSession(true);
      }
    });
  }, []);

  useEffect(() => {
    getNbrKidInSession().then(({ count, error}) => {
      if (count) {
        setNbrEnfantInSession(count);
      }
      if (error) {
        console.error(error);
      }
    })
  })

  if (!valideSession) {
    return null;
  }
  return (
    <ScrollView
      style={{ paddingTop: insets.top }}
      className="flex-1 bg-white"
      contentContainerStyle={{ paddingHorizontal: 28, paddingBottom: insets.bottom + 40 }}
    >
      <TopLogo />
      <HomepageClock />
      <Pressable onPress={() => router.replace("/planning")}>
        <HomepageCalendar />
      </Pressable>
      <View className="flex-row justify-between mt-4">
        <Text className="font-bold text-[16px] text-ink mt-7">Les enfants</Text>
        <Text className="font-semibold text-ink-soft text-ink mt-7">
          <Text className="font-black text-black text-[16px]">{nbrEnfantInSession}</Text>
          {"  "}en garde
        </Text>
      </View>
      <HomepageKidsRow />
    </ScrollView>
  );
}
