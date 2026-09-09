import { handleDeleteKid } from "@/lib/kid/handleDeleteKid";
import { Enfant, fetchKid } from "@/lib/kid/fetchKid";
import { createSession } from "@/lib/session/createSession";
import { stopSession } from "@/lib/session/stopSession";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Modal, Pressable, Text, View, TextInput, Image } from "react-native";
import { checkKidInSession } from "@/lib/kid/checkKidInSession";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addToPlanning } from "@/lib/utils/addToPlanning";

type Props = {
    visible: boolean;
    date: Date;
    onClose: () => void;
};

export function PlanningForm({ visible, date, onClose }: Props) {
    const [kids, setKids] = useState<Enfant[]>([]);
    const [heureArrivée, setHeureArrivée] = useState<Date>(new Date())
    const [heureDepart, setHeureDepart] = useState<Date>(new Date())
    const [indexPick, setIndexPick] = useState(0);

    useEffect(() => {
        fetchKid().then(({ data, error}) => {
            if (data) {
                setKids(data);
            }
            if (error) {
                console.error(error);
            }
        })
    })
    if (!visible) {
        return;
    }
  return (
    <Modal
      visible={true}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
        <Pressable
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            className="flex-1 items-center justify-center"
            onPress={onClose}
        >
        </Pressable>
        <View className="bg-white rounded pb-20 pt-5 px-10">
            <Text className="text-[40px] font-bold">{date.toLocaleDateString("fr-FR")}:</Text>
            <Text className="font-semibold text-[15px] py-5">Selectionner un enfant :</Text>
            <View className="flex-row gap-20 mt-2 flex-wrap justify-center">
                {kids.map((enfant, index) => (
                    <Pressable key={index} onPress={() => setIndexPick(index)}>
                        <View className={`border-1 pt-2 px-3 rounded-[10px] pb-3 shadow-lg flex-column items-center ${index === indexPick ? "border-violet bg-lavender-pale" : "border-ink-faint"}`}>
                                {!enfant.photo_url ? (
                                    <View
                                    className="w-[80px] h-[80px] rounded-full items-center justify-center"
                                    style={{ backgroundColor: enfant.couleur_avatar }}
                                    >
                                        <Text className="text-white font-extrabold">
                                            {enfant.prenom.charAt(0)}
                                        </Text>
                                    </View>
                                    ) : (
                                    <Image
                                    source={{ uri: enfant.photo_url }}
                                    className="h-[80px] w-[80px] rounded-full">
                                    </Image>
                                )}
                                <Text className="mt-3 font-semibold">{enfant.prenom}</Text>
                                <Text>{enfant.nom}</Text>
                        </View>
                    </Pressable>
                ))}
            </View>
            <View className="flex-row">
                <View className="flex-column justify-center items-center mt-10">
                    <Text className="font-bold text">Heure d'arrivée:</Text>
                    <DateTimePicker
                        value={heureArrivée}
                        mode="time"
                        is24Hour={true}
                        display="spinner"
                        onChange={(event, date) => {
                            if (date) setHeureArrivée(date);
                        }}
                        style={{ transform: [{ scale: 0.8 }] }}
                    />
                </View>
                <View className="flex-column justify-center items-center mt-10">
                    <Text className="font-bold text">Heure de départ:</Text>
                    <DateTimePicker
                        value={heureDepart}
                        mode="time"
                        is24Hour={true}
                        display="spinner"
                        onChange={(event, date) => {
                            if (date) setHeureDepart(date);
                        }}
                        style={{ transform: [{ scale: 0.8 }] }}
                    />
                </View>
            </View>
            <Pressable
                onPress={() => {onClose(); addToPlanning(kids[indexPick].id, heureArrivée, heureDepart, date)}}
                className="px-8 h-15 rounded-[17px] shadow-lg justify-center items-center mt-8 bg-violet"
            >
                <Text className="font-bold text-white text-[16px]">Ajouter au planning</Text>
            </Pressable>
        </View>
    </Modal>
  );
}
