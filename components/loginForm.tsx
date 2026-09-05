import "@/global.css"
import { Pressable, View, Text, TextInput } from "react-native"
import Checkbox from 'expo-checkbox'
import { useState } from "react";
import { handleLogin } from "@/lib/handleLogin";
import { router } from "expo-router";

export function LoginForm() {
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
        <View className="flex-column">
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
        </View>
    )
}