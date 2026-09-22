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
import { HomepageFastActions } from "@/components/homepage/homepageFastActions";

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

  if (!valideSession) {
    return null;
  }
  return (
    <ScrollView
      style={{ paddingTop: insets.top }}
      className="flex-1 bg-white"
      contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
    >
      <View className="mx-6">
        <TopLogo />
        <HomepageClock />
        <HomepageCalendar />
      </View>
      <HomepageKidsRow />
      <View className="mx-6 mt-12">
        <HomepageFastActions/>
      </View>
    </ScrollView>
  );
}
