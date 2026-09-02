import { View, Text, Pressable } from "react-native";
import "@/global.css"
import { checkSession } from "@/lib/checkSession";
import { useState } from "react";
import { handleSignOut } from "@/lib/handleSignOut";

export default function App() {
    const [valideSession, setValideSession] = useState(false);
    useState(() => {
        checkSession().then((ok) => {
            if (ok) {
                setValideSession(true);
            }
        })
    })

    if (!valideSession) {
        return null;
    }
    return (
        <View className="flex-column items-center">
            <Text className="text-[30px] font-black mt-30">
                Acceuil
            </Text>
            <Pressable className="w-[40%] mt-10 border-red-500 border-1 rounded flex-row self-ceter justify-center px-4 py-2 active:bg-red-500 active:text-white" onPress={handleSignOut}>
                {({ pressed }) => (
                    <Text className={`font-bold ${pressed ? "text-white" : "text-black"}`}>
                    Se déconnecter
                    </Text>
                )}
            </Pressable>
        </View>
    )
}