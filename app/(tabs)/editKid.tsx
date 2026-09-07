import { TopLogo } from "@/components/topLogo";
import "@/global.css";
import { Image, Text, View } from "react-native";

export default function App() {
  return (
    <View className="h-[100%] flex-column items-center justify-center bg-white w-[100%]">
      <TopLogo></TopLogo>
      <Image
        source={require("@/assets/images/build.png")}
        className="w-70 h-70"
      ></Image>
      <Text className="font-bold text-[20px]">
        Page en cours de developement !
      </Text>
    </View>
  );
}
