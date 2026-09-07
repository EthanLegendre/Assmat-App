import { HomepageClock } from "@/components/homepage/homepageClock";
import { HomepageKidsRow } from "@/components/homepage/homepageKidsRow";
import { TopLogo } from "@/components/topLogo";
import "@/global.css";
import { checkSession } from "@/lib/session/checkSession";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function App() {
  const insets = useSafeAreaInsets();
  const [valideSession, setValideSession] = useState(false);

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
      contentContainerStyle={{ paddingHorizontal: 28, paddingBottom: 40 }}
    >
      <TopLogo />
      <HomepageClock />
      <View className="flex-row justify-between mt-4">
        <Text className="font-bold text-[16px] text-ink mt-7">Les enfants</Text>
        <Text className="font-semibold text-ink-soft text-ink mt-7">
          0 en garde
        </Text>
      </View>
      <HomepageKidsRow />
    </ScrollView>
  );
}
