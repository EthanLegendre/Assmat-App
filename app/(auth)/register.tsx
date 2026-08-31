import "@/global.css"
import { Text, View, Pressable, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function App() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top }} className="flex-1 bg-white px-10">
        <Text className="text-violet font-extrabold text-[30px]">Toctoc</Text>
        <View className="flex-row bg-lavender-pale rounded-full p-1.5 mt-14 self-center">
            
            <Pressable className="px-8 py-3.5 rounded-full justify-center">
                <Text className="font-bold text-ink-soft text-[15px]">
                    Connexion
                </Text>
            </Pressable>

            <Pressable className="px-8 py-3.5 rounded-full bg-white shadow-lg justify-center">
                <Text className="font-bold text-violet text-[15px]">
                    Inscription
                </Text>
            </Pressable>

        </View>
        <Text className="mt-8 font-extrabold text-[30px]">Créer ton compte</Text>
        <Text className="mt-2 text-ink-soft font-medium text-[18px]">Rejoins Toctoc en moins d'une minute.</Text>
        <View className="mt-10 flex-row self-center gap-">
            <View className="w-[40%]">
                <Text className="font-bold text-ink">Prénom</Text>
                <TextInput className="mt-2 mb-5 border-b-[1px] border-[#B7A9C9] h-[40px]" placeholderTextColor="#B7A9C9" placeholder="prénom"></TextInput>
            </View>
            <View className="w-[50%] ml-10">
                <Text className="font-bold text-ink">Nom</Text>
                <TextInput className="mt-2 mb-5 border-b-[1px] border-[#B7A9C9] h-[40px]" placeholderTextColor="#B7A9C9" placeholder="Nom"></TextInput>
            </View>
        </View>
        <View className="w-full mt-4">
            <Text className="font-bold text-ink">Adresse email</Text>
            <TextInput className="mt-2 mb-5 border-b-[1px] border-[#B7A9C9] h-[40px]" placeholderTextColor="#B7A9C9" placeholder="prenom@exemple.com"></TextInput>
        </View>
        <View className="w-full mt-4">
            <Text className="font-bold text-ink">Mot de passe</Text>
            <TextInput className="mt-2 mb-5 border-b-[1px] border-[#B7A9C9] h-[40px]" placeholderTextColor="#B7A9C9" placeholder="8 caractères minimum"></TextInput>
        </View>
    </View>
  );
}