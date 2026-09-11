import { TopLogo } from "@/components/topLogo";
import { fetchOneKid } from "@/lib/kid/fetchKid";
import { getInfoTimeSessionKid } from "@/lib/kid/getInfoTimeSession";
import { getSessionByKidId, Session } from "@/lib/session/getSessionByIdKid";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Child } from "@/types/enfant";

export default function App() {
  const insets = useSafeAreaInsets();
  const [child, setChild] = useState<Child | null>(null);
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isCopy, setIsCopy] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [nbrDay, setNbrDay] = useState(0);
  const [totalHour, setTotalHour] = useState(0);
  const [hourWeek, setHourWeek] = useState(0);

  async function copyToClipboard(text: string) {
    await Clipboard.setStringAsync(text);
  }

  useEffect(() => {
    setIsCopy(false);
    if (!id) return;
    fetchOneKid(id).then(({ data, error }) => {
      setChild(data);
      if (error) console.error(error);
    });
  }, [id]);

  useEffect(() => {
    if (!child) return;
    getInfoTimeSessionKid(child).then(({ nbrDay, totalHour, nbHourWeek }) => {
      setNbrDay(nbrDay);
      setHourWeek(nbHourWeek);
      setTotalHour(totalHour);
    })
  })

  useEffect(() => {
    if (!child) return;
    setSession(null);
    getSessionByKidId(child.id, "en_cours").then(({ data, error}) => {
      if (data) setSession(data);
      if (error) console.error(error);
    })

  }, [child])

  if (!child) {
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
            router.replace(`/editKid?id=${child.id}`);
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
        {!child.profilePictureUrl ? (
          <View
            className="w-[100px] h-[100px] rounded-full items-center justify-center shadow-lg border-4 border-white"
            style={{ backgroundColor: child.avatarColor }}
          >
            <Text className="text-white text-[35px] font-bold">
              {child.firstname.charAt(0)}
            </Text>
          </View>
        ) : (
          <Image
            source={{ uri: child.profilePictureUrl }}
            className="h-[100px] w-[100px] rounded-full border-4 border-white shadow-lg"
          ></Image>
        )}
        <View className="flex-row gap-1 mt-3">
          <Text className="font-bold text-[25px]">{child.firstname}</Text>
          <Text className="font-bold text-[25px]">{child.lastname}</Text>
        </View>
        <Text className="text-ink-soft">3 ans - né le 12 mars 2023</Text>
        {session && (
          <View className="bg-[#E8F7EF] flex-row items-center justify-center px-2 py-1 rounded-full mt-3 shadow-lg">
            <View className="h-3 w-3 bg-[#2FAE6B] rounded-full"></View>
            <Text className="font-bold text-[#2FAE6B]">  En garde depuis {session.heure_debut.slice(0, 5)}</Text>
          </View>
        )}

        <View className="border-t-[1.5px] w-full border-t-[#B7A9C9] border-b-[1.5px] border-b-[#B7A9C9] flex-row items-center justify-around mt-10">
          <View className="flex-column items-center justify-center w-1/3 border-r-[1.5px] border-r-[#B7A9C9] py-10">
            <Text className="font-extrabold text-[25px]">{nbrDay}</Text>
            <Text className="text-[#B7A9C9] text-[15px]">Jours</Text>
          </View>
          <View className="flex-column items-center justify-center w-1/3">
            <Text className="font-extrabold text-[25px]">{totalHour.toFixed(2)}h</Text>
            <Text className="text-[#B7A9C9] text-[15px]">Total</Text>
          </View>
          <View className="flex-column items-center justify-center w-1/3 border-l-[1.5px] border-l-[#B7A9C9] py-10">
            <Text className="font-extrabold text-[25px]">{hourWeek}h</Text>
            <Text className="text-[#B7A9C9] text-[15px]">Semaine</Text>
          </View>
        </View>

        <View className="w-full border-b-[1.5px] border-b-[#B7A9C9] justify-center">
          <Text className="font-bold text-ink-faint mt-8">REVENUE CE MOIS</Text>
          <Text className="font-semibold text-ink-soft ml-auto">Total: 8 412 €</Text>
          <View className="mt-5 flex-row justify-between items-center mb-15">
            <Text className="text-[#2FAE6B] font-black text-[30px]">1 284<Text className="font-semibold text-[17px]">,50€</Text></Text>
            <Text className="text-violet-deep font-extrabold">4,20 €/h - 3,50 €/j</Text>
          </View>
        </View>

        <View className="w-full">
          <Text className="font-bold text-ink-faint mt-8">INFORMATION</Text>
        </View>
        <View className="flex-column mt-10 w-full py-3 bg-[#F2ECFB] rounded-[13px] shadow-lg ml-20 mr-20">
          <Text className="text-[#5B21B6] font-bold mt-2 ml-3 text-[17px]">
            Code parent
          </Text>
          <View className="flex-row justify-between mt-4 items-center">
            <Text className="tracking-[10px] font-extrabold text-[25px] ml-3">
              {child.invitationCode}
            </Text>
            <Pressable
              onPress={() => {
                setIsCopy(true);
                copyToClipboard(child.invitationCode);
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
      <View className="border-t-[1.5px] border-t-[#B7A9C9] mt-10">
          <Text className="font-bold text-ink-faint mt-8">CONTACT PARENT</Text>
          <View className="flex-row mt-8 items-center">
            <View className="flex-row">
              <View className="h-15 w-15 bg-rose-deep items-center justify-center rounded-full">
                <Text className="font-black text-white">SM</Text>
              </View>
              <View className="ml-8">
                <Text className="font-bold">Sophie Martin</Text>
                <Text className="font-semibold text-ink-faint mt-1">06 12 34 65 27</Text>
              </View>
            </View>
            <View className="ml-auto flex-row">
              <View className="w-15 h-15 border-1 border-violet bg-white shadow-lg rounded-full items-center justify-center">
                <Ionicons name="call-outline" size={20}></Ionicons>
              </View>
              <View className="w-15 h-15 border-1 ml-4 border-violet bg-white shadow-lg rounded-full items-center justify-center">
                <Ionicons name="chatbubbles-outline" size={20}></Ionicons>
              </View>
            </View>
          </View>
      </View>
    </ScrollView>
  );
}
