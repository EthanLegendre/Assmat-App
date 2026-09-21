import { View, Image, Text } from "react-native";

export function TopLogoParent() {
    return (
        <View className="flex-row items-center justify-between ml-2 mt-5 px-6">
            <View className="flex-row items-center">
                  <Image source={require("@/assets/images/toctoc-icon-512.png")} className="w-15 h-15"></Image>
                <View className="flex-row ml-2">
                    <Text className="text-[#7C3AED] text-[20px] font-inter-black">ki</Text>
                    <Text className="text-[#D63384] text-[20px] font-inter-black">toc</Text>
                </View>
            </View>
            <View>
                <Image source={require("@/assets/images/mediaskol_logo.png")} className="h-15 w-16 mt-[-4px]"></Image>
            </View>
        </View> 
    )  
};