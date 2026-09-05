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
            <TopLogo></TopLogo>
            <Image source={require("@/assets/images/build.png")} className="w-70 h-70"></Image>
            <Text className="font-bold text-[20px]">Page en cours de developement !</Text>
        </View>
    )
}