import "@/global.css"
import { Text, View, Pressable, TextInput, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link, router } from 'expo-router'
import Checkbox from 'expo-checkbox'
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { handleLogin } from "@/lib/handleLogin";

export default function App() {
    const insets = useSafeAreaInsets();
    const [checked, setcheck] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    async function onPresseLogin() {
        setErrorMessage("");
        const { error } = await handleLogin(email, password);

        if (error) {
            setErrorMessage(error.message);
            return;
        }
        router.replace("/homepage");
    }


    return (
        <View style={{ paddingTop: insets.top }} className="flex-1 bg-white px-10">
            <View className="flex-row justify-between items-center">
                <Text className="text-violet font-extrabold text-[30px]">Toctoc</Text>
                <Image source={require("@/assets/images/mediaskol_logo.png")} className="h-15 w-16 mt-[-4px]"></Image>
            </View>
            <View className="flex-row bg-lavender-pale rounded-full p-1.5 mt-10 self-center">
                <Pressable className="px-8 py-3.5 rounded-full bg-white shadow-lg justify-center">
                    <Text className="font-bold text-violet text-[15px]">
                        Connexion
                    </Text>
                </Pressable>
                <Pressable className="px-8 py-3.5 rounded-full justify-center">
                    <Text className="font-bold text-ink-soft text-[15px]">
                        Inscription
                    </Text>
                </Pressable>
            </View>
            <Text className="mt-8 font-extrabold text-[39px]">Ravie de te revoir</Text>
            <Text className="mt-2 text-ink-soft font-medium text-[17px]">Connect-toi pour retrouver ton espace.</Text>
            <View className="w-full mt-14">
                <Text className="font-bold text-ink">Adresse email</Text>
                <TextInput keyboardType="email-address" value={email} onChangeText={setEmail} className="mt-2 mb-5 border-b-[1px] border-[#B7A9C9] h-[30px]" placeholderTextColor="#B7A9C9" placeholder="prenom@exemple.com"></TextInput>
            </View>
            <View className="w-full mt-1">
                <Text className="font-bold text-ink">Mot de passe</Text>
                <TextInput secureTextEntry value={password} onChangeText={setPassword} className="mt-2 mb-5 border-b-[1px] border-[#B7A9C9] h-[30px]" placeholderTextColor="#B7A9C9" placeholder="••••••••"></TextInput>
            </View>
            <View className="flex-row items-center gap-4 mt-2">
                <Checkbox value={checked} onValueChange={setcheck} color={checked ? "#7C3AED" : undefined} className=""></Checkbox>
                <Text className="font-semibold text-[14px] text-[#7A6C8C]">Se souvenir de moi <Text className="font_bold text-[#D63384]"> Mot de passe oublié ?</Text></Text>
            </View>
            {errorMessage ? (
                <Text className="text-rose-deep text-xs font-medium mt-2">{errorMessage}</Text>
            ) : null}
            <Pressable onPress={onPresseLogin} className="px-8 h-15 rounded-[17px] shadow-lg justify-center items-center mt-8 bg-violet">
                <Text className="font-bold text-white text-[16px]">
                    Se connecter
                </Text>
            </Pressable>
            <View className="flex-row items-center gap-3 mt-7">
                <View className="flex-1 h-[2px] bg-line" />
                <Text className="text-s text-ink-faint font-medium">ou continuer avec</Text>
                <View className="flex-1 h-[2px] bg-line" />
            </View>
            <View className="flex-row w-full items-center gap-6 justify-center">
                <Pressable className="flex-row h-15 gap-4 rounded-[17px] justify-center items-center mt-5 border-[1px] border-ink-faint w-40">
                    <Image source={require("@/assets/images/google_logo.png")} className="w-7 h-7"></Image>
                    <Text className="font-bold text-[14px]">
                        Google
                    </Text>
                </Pressable>
                <Pressable className="flex-row h-15 gap-4 rounded-[17px] justify-center items-center mt-5 border-[1px] border-ink-faint w-40">
                    <Image source={require("@/assets/images/logo-apple.png")} className="w-7 h-7"></Image>
                    <Text className="font-bold text-[14px]">
                        Apple
                    </Text>
                </Pressable>
            </View>
            <View className="flex-row mt-8 gap-3 self-center">
                <Text className="text-ink-faint font-semibold text-[14px]">Pas encore de compte ? <Link href={"/register"} replace className="text-violet font-bold"> Créer un compte</Link></Text>
            </View>
        </View>
    );
}