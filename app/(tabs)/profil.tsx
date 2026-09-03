import { View, Text, Pressable, Image } from "react-native";
import "@/global.css"
import { checkSession } from "@/lib/checkSession";
import { use, useEffect, useState } from "react";
import { handleSignOut } from "@/lib/handleSignOut";
import { TopLogo } from "@/components/topLogo";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fetchUser, User } from "@/lib/fetchUser";

export default function App() {
    return (
        <View className="h-[100%] flex-column items-center justify-center bg-white w-[100%]">
            <Pressable
                onPress={handleSignOut}
                className="mt-2 mb-8 w-[50%] self-center rounded-2xl border-[1.5px] border-rose-deep py-3 items-center">
                {({ pressed }) => (
                <Text className={`font-bold text-[14px] ${pressed ? "text-white" : "text-rose-deep"}`}>
                    Se déconnecter
                </Text>
                )}
            </Pressable>
        </View>
    )
}