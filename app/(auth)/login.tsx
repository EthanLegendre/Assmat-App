import "@/global.css";
import { Text, View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { TopLogo } from "@/components/topLogo";
import { TopLogin } from "@/components/login/loginTop";
import { LoginForm } from "@/components/login/loginForm";
import { GoogleOrApple } from "@/components/googleOrApple";

export default function App() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ paddingTop: insets.top }}
      className="flex-1 bg-white"
      contentContainerStyle={{ paddingHorizontal: 28, paddingBottom: insets.bottom + 40 }}
    >
      <TopLogo />
      <TopLogin />
      <Text className="mt-8 font-extrabold text-[39px]">
        Ravie de te revoir
      </Text>
      <Text className="mt-2 text-ink-soft font-medium text-[17px]">
        Connect-toi pour retrouver ton espace.
      </Text>
      <LoginForm></LoginForm>
      <GoogleOrApple />
      <View className="flex-row mt-8 gap-3 self-center mb-30">
        <Text className="text-ink-faint font-semibold text-[14px]">
          Pas encore de compte ?{" "}
          <Link href={"/register"} replace className="text-violet font-bold">
            {" "}
            Créer un compte
          </Link>
        </Text>
      </View>
    </ScrollView>
  );
}
