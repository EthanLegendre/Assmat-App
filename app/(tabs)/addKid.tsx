import { View, Text, Pressable, Image, TextInput, ScrollView } from "react-native";
import "@/global.css"
import { checkSession } from "@/lib/checkSession";
import { use, useEffect, useState } from "react";
import { handleSignOut } from "@/lib/handleSignOut";
import { TopLogo } from "@/components/topLogo";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fetchUser, User } from "@/lib/fetchUser";
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router";
import { handleAddKid } from "@/lib/handleAddKid";
import { pickAndUploadPicture } from "@/lib/uploadPicture";
import { supabase } from "@/lib/supabase";

export default function App() {
    const insets = useSafeAreaInsets();
    const [color, setColor] = useState(0);
    const [loading, setLoading] = useState(false);
    const [nomEnfant, setNomEnfant] = useState("");
    const [prenomEnfant, setPrenomEnfant] = useState("");
    const [dateNaissance, setDateNaissance] = useState("");
    const [nomParent, setNomParent] = useState("");
    const [tel, setTel] = useState("");
    const [email, setEmail] = useState("");
    const [avatarColor, setAvatarColor] = useState("#F2559C")
    const [urlPhoto, setUrlPhoto] = useState("");

    async function onPressPickPicture() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return;
        }
        const { url, error} = await pickAndUploadPicture(user.id);
        if (error) {
            console.error(error);
            return;
        }
        if (url) {
            setUrlPhoto(url);
        }
    }

    async function onPressAddKid() {
        const { error } = await handleAddKid(nomEnfant, prenomEnfant, dateNaissance, email, tel, nomParent, avatarColor, urlPhoto);

        if (error) {
            return;
        }
        router.replace("/homepage");
    }
    return (
        <ScrollView   style={{ paddingTop: insets.top }} className="flex-1 bg-white" contentContainerStyle={{ paddingHorizontal: 28, paddingBottom: 40 }}>
            <TopLogo></TopLogo>
            <View className="flex-row items-center mt-10">
                <Pressable className="bg-[#F2ECFB] rounded-full p-3" onPress={() => router.push("/homepage")}>
                    <Ionicons name="arrow-back-outline" size={20} color="#221733" />
                </Pressable>
                <Text className="ml-3 font-bold text-[28px]">Ajouter un enfant</Text>
            </View>

            <View className="w-full flex-col justify-center items-center mt-10">
                <View className="relative">
                    {!urlPhoto ? 
                        <View className="bg-[#F2ECFB] rounded-full p-8 shadow-lg">
                            <Ionicons name="person-outline" size={25} color="#5B21B6" />
                        </View>
                        :
                        <Image source={{ uri: urlPhoto }} className="w-[78px] h-[78px] rounded-full"></Image>
                        }
                    <Pressable className="absolute right-0 bottom-0 w-8 h-8 rounded-full bg-violet border-[3px] border-white items-center justify-center shadow-lg" onPress={() => {onPressPickPicture(); setUrlPhoto("")}}>
                        <Ionicons name="camera-outline" size={14} color="#fff" />
                    </Pressable>
                </View>
            </View>
            <View className="w-100% flex-row justify-center mt-6">
                <Text className="font-semibold text-[#7A6C8C]">
                    Ajouter une photo (facultatif)
                </Text>
            </View>
                <View className="flex-row justify-center gap-3 mt-6">
                <Pressable className={`w-8 h-8 rounded-full bg-[#F2559C] border-2 ${color === 0 ? "border-ink" : "border-transparent"}`} onPress={() => {setColor(0); setAvatarColor("#F2559C")}}/>
                <Pressable className={`w-8 h-8 rounded-full bg-[#7C3AED] border-2 ${color === 1 ? "border-ink" : "border-transparent"}`} onPress={() => {setColor(1); setAvatarColor("#7C3AED")}}/>
                <Pressable className={`w-8 h-8 rounded-full bg-[#C9A9E9] border-2 ${color === 2 ? "border-ink" : "border-transparent"}`} onPress={() => {setColor(2); setAvatarColor("#C9A9E9")}}/>
                <Pressable className={`w-8 h-8 rounded-full bg-[#6FCF97] border-2 ${color === 3 ? "border-ink" : "border-transparent"}`} onPress={() => {setColor(3); setAvatarColor("#6FCF97")}}/>
                <Pressable className={`w-8 h-8 rounded-full bg-[#F2B84B] border-2 ${color === 4 ? "border-ink" : "border-transparent"}`} onPress={() => {setColor(4); setAvatarColor("#F2B84B")}}/>
            </View>
            <Text className="mt-9 text-[17px] font-bold text-[#5B21B6]">
                Information de l'enfant
            </Text>
            <View className="mt-6 flex-row self-center">
                <View className="w-[40%]">
                    <Text className="font-bold text-ink">Prénom</Text>
                    <TextInput value={prenomEnfant} onChangeText={setPrenomEnfant} autoCapitalize="words"  className="mt-2 mb-5 border-b-[1px] border-[#B7A9C9] h-[35px]" placeholderTextColor="#B7A9C9" placeholder="Léo"></TextInput>
                </View>
                <View className="w-[50%] ml-10">
                    <Text className="font-bold text-ink">Nom</Text>
                    <TextInput value={nomEnfant} onChangeText={setNomEnfant} autoCapitalize="words" className="mt-2 mb-5 border-b-[1px] border-[#B7A9C9] h-[35px]" placeholderTextColor="#B7A9C9" placeholder="Martin"></TextInput>
                </View>
            </View>
            <View className="w-full mt-1">
                <Text className="font-bold text-ink">Date de naissance</Text>
                <TextInput value={dateNaissance} onChangeText={setDateNaissance} keyboardType="numbers-and-punctuation" className="mt-2 mb-5 border-b-[1px] border-[#B7A9C9] h-[30px]" placeholderTextColor="#B7A9C9" placeholder="JJ / MM / AAAA"></TextInput>
            </View>
            <Text className="mt-9 text-[17px] font-bold text-[#5B21B6]">
                Contact du parent
            </Text>
            <View className="w-full mt-7">
                <Text className="font-bold text-ink">Nom de famille</Text>
                <TextInput value={nomParent} onChangeText={setNomParent} autoCapitalize="words" className="mt-2 mb-5 border-b-[1px] border-[#B7A9C9] h-[30px]" placeholderTextColor="#B7A9C9" placeholder="Martin"></TextInput>
            </View>
            <View className="mt-6 flex-row self-center">
                <View className="w-[40%]">
                    <Text className="font-bold text-ink">Téléphone</Text>
                    <TextInput value={tel} onChangeText={setTel} keyboardType="phone-pad" autoComplete="tel" className="mt-2 mb-5 border-b-[1px] border-[#B7A9C9] h-[35px]" placeholderTextColor="#B7A9C9" placeholder="06 12 34 65 27"></TextInput>
                </View>
                <View className="w-[50%] ml-10">
                    <Text className="font-bold text-ink">Email</Text>
                    <TextInput value={email} onChangeText={setEmail} keyboardType="email-address" autoComplete="email" autoCapitalize="none" className="mt-2 mb-5 border-b-[1px] border-[#B7A9C9] h-[35px]" placeholderTextColor="#B7A9C9" placeholder="sophie.martin@gmail.com"></TextInput>
                </View>
            </View>
            <View className="flex-row bg-[#FFDDEF] mt-5 h-25 items-center px-4 py-4 rounded-[10px]">
                <Ionicons name="alert-circle-outline" color={"#D63384"} size={20}></Ionicons>
                <Text className="font-medium text-[#D63384] text-[15px] ml-5 mr-4">Un code à 4 chiffres sera généré pour cet enfant. Tu pourras le retrouver sur sa fiche.</Text>
            </View>
            <Pressable className="px-8 h-15 rounded-[17px] shadow-lg justify-center items-center mt-8 bg-violet" onPress={() => {setLoading(true); onPressAddKid()}}>
                <Text className="font-bold text-white text-[16px]">
                    {!loading ? "Ajouter l'enfant" : "chargement ..."}
                </Text>
            </Pressable>
        </ScrollView>
    )
}