import { View, Text } from "react-native";
import "@/global.css"
import { useEffect, useState } from "react";
import { User, fetchUser } from "@/lib/utils/fetchUser";
import { Ionicons } from "@expo/vector-icons"

export function HomepageClock() {
    const [user, setUser] = useState<User | null>(null);
    const [time, setTime] = useState(new Date());
    const heures = String(time.getHours()).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");
    const dateShort = time.toLocaleDateString("fr-FR", {
        weekday: "short",
        day: "numeric",
        month: "short",
    });

    useEffect(() => {
        fetchUser("assmat").then(({ data, error }) => {
            setUser(data);
        })
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <View>
            <View className="mt-8">
                <Text className="text-[12px] font-semibold text-ink-soft">Bonjour {user?.prenom}</Text>
                <Text className="font-black tracking-[2px] text-[30px] text-ink mt-0.5">Acceuil</Text>
            </View>
            <View className="w-full mt-6 rounded-[22px] bg-violet px-5 py-5 shadow-xl">
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-3">
                        <View className="w-11 h-11 rounded-full bg-white/15 items-center justify-center">
                            <Ionicons name="time-outline" size={19} color="#fff" />
                        </View>
                        <Text className="font-extrabold text-[32px] text-white">
                            {heures}<Text className="text-rose">:</Text>{minutes}
                        </Text>
                    </View>
                    <View className="items-end">
                        <View className="flex-row items-center gap-1.5 bg-white/15 rounded-full px-2.5 py-1">
                            <View className="w-1.5 h-1.5 rounded-full bg-green" />
                                <Text className="text-white text-[10px] font-bold">En direct</Text>
                            </View>
                            <Text className="text-white/70 text-[12px] font-semibold mt-2">{dateShort}</Text>
                        </View>
                </View>
            </View>
        </View>
    )
}