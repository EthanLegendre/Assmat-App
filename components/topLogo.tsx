import { Text, View, Image } from "react-native";


export function TopLogo() {
    return (
        <View className="flex-row justify-between items-center">
            <Text className="text-violet font-extrabold text-[30px]">Toctoc</Text>
            <Image source={require("@/assets/images/mediaskol_logo.png")} className="h-15 w-16 mt-[-4px]"></Image>
        </View>
    )
}