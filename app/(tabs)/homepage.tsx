import { View, Text, Pressable, ScrollView, Image } from "react-native";
import "@/global.css"
import { checkSession } from "@/lib/checkSession";
import { use, useEffect, useState } from "react";
import { handleSignOut } from "@/lib/handleSignOut";
import { TopLogo } from "@/components/topLogo";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fetchUser, User } from "@/lib/fetchUser";
import { router } from "expo-router";
import { fetchKid, Enfant } from "@/lib/fetchKid";
import { Ionicons } from "@expo/vector-icons"
import { KidInfo } from "@/components/kidInfo";

export default function App() {
    const insets = useSafeAreaInsets();
    const [valideSession, setValideSession] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const date = new Date();
    const [time, setTime] = useState(new Date());
    const dateString = date.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
    })
    const dateClean = dateString.charAt(0).toUpperCase() + dateString.slice(1);
    const [enfants, setEnfants] = useState<Enfant[]>([]);
    const [showInfoKid, setSHowInfoKid] = useState(false);
    const [activeKid, setActiveKid] = useState<Enfant | null>(null);

    useEffect(() => {
        checkSession().then((ok) => {
            if (ok) {
                setValideSession(true);
            }
        })
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

    useEffect(() => {
        fetchKid().then(({ data, error}) => {
            if (data) {
                setEnfants(data);
            }
        })
    })

    const dateShort = time.toLocaleDateString("fr-FR", {
        weekday: "short",
        day: "numeric",
        month: "short",
    });

    const heures = String(time.getHours()).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");

    if (!valideSession) {
        return null;
    }
    return (
        <ScrollView   style={{ paddingTop: insets.top }} className="flex-1 bg-white" contentContainerStyle={{ paddingHorizontal: 28, paddingBottom: 40 }}>
            <TopLogo />

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



            <View className="flex-row justify-between mt-4">
                <Text className="font-bold text-[16px] text-ink mt-7">Les enfants</Text>
                <Text className="font-semibold text-ink-soft text-ink mt-7">0 en garde</Text>
            </View>
            
            <View className="mt-5 border-1 border-[#E5D4FF] rounded-[20px] px-2 py-4 bg-white shadow-xl">
                {enfants.map((enfant) => (
                <View key={enfant.id} className="flex-row items-center justify-between border-b-1 border-[#E5D4FF] rounded-2xl px-4 py-3 mb-4">
                    <View className="flex-row items-center gap-3">
                        {!enfant.photo_url ?
                        <View className="w-[50px] h-[50px] rounded-full items-center justify-center" style={{ backgroundColor: enfant.couleur_avatar }}>
                            <Text className="text-white font-extrabold">{enfant.prenom.charAt(0)}</Text>
                        </View>
                        :
                        <Image source={{ uri: enfant.photo_url}} className="h-[50px] w-[50px] rounded-full"></Image>}
                        <View>
                            <Text className="font-bold text-[14.5px] text-ink">{enfant.prenom}</Text>
                            <Text className="text-ink-soft text-[12px] font-medium mt-0.5">Prévu à 16h30</Text>
                        </View>
                    </View>
                    <Pressable className="w-9 h-9 rounded-full bg-violet items-center justify-center" onPress={() => {setActiveKid(enfant); setSHowInfoKid(true)}}>
                        <Ionicons name="chevron-forward" color="#fff" size={16} />
                    </Pressable>
                </View>
                ))}

            <Pressable className="mt-6 flex-row w-full h-14 justify-center items-center rounded-[14px] border-[1.5px] border-ink-faint mb-4" style={{ borderStyle: "dashed" }} onPress={() => router.push("/addKid")}>
                <Text className="font-semibold text-[15px] text-violet-deep">
                    +  Ajouter un enfant
                </Text>
            </Pressable>
            </View>

            {activeKid && (
                <KidInfo enfant={activeKid} onClose={() => setActiveKid(null)} />
            )}
        </ScrollView>
    )
}