import { TopLogo } from "@/components/topLogo";
import { Enfant, fetchOneKid } from "@/lib/kid/fetchKid";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function App() {
  const insets = useSafeAreaInsets();
  const [enfant, setEnfant] = useState<Enfant | null>(null);
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isCopy, setIsCopy] = useState(false);

  async function copyToClipboard(text: string) {
    await Clipboard.setStringAsync(text);
  }

  useEffect(() => {
    setIsCopy(false);
    if (!id) return;
    fetchOneKid(id).then(({ data, error }) => {
      if (data) setEnfant(data);
      if (error) console.error(error);
    });
  }, [id]);
  if (!enfant) {
    return null;
  }
  return (
    <ScrollView
      style={{ paddingTop: insets.top }}
      className="flex-1 bg-white"
      contentContainerStyle={{ paddingHorizontal: 28, paddingBottom: 40 }}
    >
      <TopLogo></TopLogo>
      <View className="flex-row items-center justify-between mt-10">
        <Pressable
          className="bg-[#F2ECFB] rounded-full p-4"
          onPress={() => router.push("/homepage")}
        >
          <Ionicons name="arrow-back-outline" size={20} color="#221733" />
        </Pressable>
        <Pressable
          className="flex-row items-center bg-white py-2.5 px-5 rounded-full border-1 border-[#E5D4FF]"
          onPress={() => {
            router.replace("/editKid");
          }}
        >
          <Ionicons
            name="create-outline"
            color={"#5B21B6"}
            size={17}
          ></Ionicons>
          <Text className="ml-2 text-[#5B21B6] font-bold">Modifier</Text>
        </Pressable>
      </View>
      <View className="flex-column justify-center items-center py-10">
        {!enfant.photo_url ? (
          <View
            className="w-[100px] h-[100px] rounded-full items-center justify-center shadow-lg border-4 border-white"
            style={{ backgroundColor: enfant.couleur_avatar }}
          >
            <Text className="text-white text-[35px] font-bold">
              {enfant.prenom.charAt(0)}
            </Text>
          </View>
        ) : (
          <Image
            source={{ uri: enfant.photo_url }}
            className="h-[100px] w-[100px] rounded-full border-4 border-white shadow-lg"
          ></Image>
        )}
        <View className="flex-row gap-1 mt-3">
          <Text className="font-bold text-[25px]">{enfant.prenom}</Text>
          <Text className="font-bold text-[25px]">{enfant.nom}</Text>
        </View>
        <Text className="text-ink-soft">3 ans - né le 12 mars 2023</Text>
        <View className="flex-column mt-30 w-full py-3 bg-[#F2ECFB] rounded-[13px] shadow-lg">
          <Text className="text-[#5B21B6] font-bold mt-2 ml-3 text-[17px]">
            Code parent
          </Text>
          <View className="flex-row justify-between mt-4 items-center">
            <Text className="tracking-[10px] font-extrabold text-[25px] ml-3">
              {enfant.code_invitation}
            </Text>
            <Pressable
              onPress={() => {
                setIsCopy(true);
                copyToClipboard(enfant.code_invitation);
              }}
            >
              {!isCopy ? (
                <Ionicons
                  name="copy-outline"
                  className="bg-white mr-3 p-4 rounded-full border-1 border-[#5B21B6]"
                  size={20}
                ></Ionicons>
              ) : (
                <Ionicons
                  name="checkmark-outline"
                  className="bg-white mr-3 p-4 rounded-full border-1 border-[#5B21B6]"
                  size={20}
                ></Ionicons>
              )}
            </Pressable>
          </View>
          {isCopy && (
            <Text className="text-[#] ml-[40%] text-[10px] font-bold">
              Copier !
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
