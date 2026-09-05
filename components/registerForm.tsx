import "@/global.css"
import { Pressable, View, Text, TextInput } from "react-native"
import Checkbox from 'expo-checkbox'
import { useState } from "react";
import { handleSignUp } from "@/lib/handleSignUp";
import { router } from "expo-router";

export function RegisterForm() {
    const [checked, setcheck] = useState(false);
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [role, setRole] = useState<"assmat" | "parent">("assmat");

    async function onPressSignUp() {
        if (!checked) {
            setErrorMessage("Merci d'accepter les conditions d'utilisation");
            return;
        }
        setLoading(true);
        setErrorMessage("");
        const { error } = await handleSignUp(nom, prenom, email, password, role);
        if (error) {
            setErrorMessage(error.message);
            setLoading(false);
            return;
        }
        setLoading(false);
        router.replace("/");
    }

    return (
        <View className="flex-column">
            <View className="flex-row gap-7 mt-5">
                <View className="flex-row items-center gap-4">
                    <Checkbox value={role === "assmat"} onValueChange={() => setRole("assmat")} color={role === "assmat" ? "#7C3AED" : undefined} className=""></Checkbox>
                    <Text className="font-semibold text-[14px] text-[#7A6C8C]">Assmat</Text>
                </View>
                <View className="flex-row items-center gap-4">
                    <Checkbox value={role === "parent"} onValueChange={() => setRole("parent")} color={role === "parent" ? "#7C3AED" : undefined} className=""></Checkbox>
                    <Text className="font-semibold text-[14px] text-[#7A6C8C]">Parent</Text>
                </View>
            </View>
            <View className="mt-6 flex-row self-center">
                <View className="w-[40%]">
                    <Text className="font-bold text-ink">Prénom</Text>
                    <TextInput autoCapitalize="words" value={prenom} onChangeText={setPrenom}  className="mt-2 mb-5 border-b-[1px] border-[#B7A9C9] h-[30px]" placeholderTextColor="#B7A9C9" placeholder="prénom"></TextInput>
                </View>
                <View className="w-[50%] ml-10">
                    <Text className="font-bold text-ink">Nom</Text>
                    <TextInput autoCapitalize="words" value={nom} onChangeText={setNom} className="mt-2 mb-5 border-b-[1px] border-[#B7A9C9] h-[30px]" placeholderTextColor="#B7A9C9" placeholder="Nom"></TextInput>
                </View>
            </View>
            <View className="w-full mt-1">
                <Text className="font-bold text-ink">Adresse email</Text>
                <TextInput keyboardType="email-address" autoComplete="email" autoCapitalize="none" value={email} onChangeText={setEmail}  className="mt-2 mb-5 border-b-[1px] border-[#B7A9C9] h-[30px]" placeholderTextColor="#B7A9C9" placeholder="prenom@exemple.com"></TextInput>
            </View>
            <View className="w-full mt-1">
                <Text className="font-bold text-ink">Mot de passe</Text>
                <TextInput secureTextEntry value={password} onChangeText={setPassword}  className="mt-2 mb-5 border-b-[1px] border-[#B7A9C9] h-[30px]" placeholderTextColor="#B7A9C9" placeholder="8 caractères minimum"></TextInput>
            </View>
            <View className="flex-row items-center gap-4">
                <Checkbox value={checked} onValueChange={setcheck} color={checked ? "#7C3AED" : undefined} className=""></Checkbox>
                <Text className="font-semibold text-[14px] text-[#7A6C8C]">J'accepte les <Text className="font_bold text-[#5B21B6]">conditions d'utilisation</Text> et la <Text className="font_bold text-[#5B21B6]">politique de confidentialité</Text></Text>
            </View>
            {errorMessage ? (
                <Text className="text-rose-deep text-xs font-medium mt-2">{errorMessage}</Text>
            ) : null}
            <Pressable className="px-8 h-15 rounded-[17px] shadow-lg justify-center items-center mt-8 bg-violet" onPress={onPressSignUp} disabled={loading}>
                <Text className="font-bold text-white text-[16px]">
                    {loading ? "Création en cours ..." : "Créer ton compte"}
                </Text>
            </Pressable>
        </View>
    )
}