import { Modal, View, Text, Pressable } from "react-native";
import { Enfant } from "@/lib/fetchKid";
import { Ionicons } from "@expo/vector-icons";
import { handleDeleteKid } from "@/lib/handleDeleteKid";
import { router } from "expo-router";

type Props = {
  enfant: Enfant | null;
  onClose: () => void;
};

export function KidInfo({ enfant, onClose }: Props) {
  return (
    <Modal visible={!!enfant} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={{ backgroundColor: "rgba(0,0,0,0.5)" }} className="flex-1 items-center justify-center" onPress={onClose}>
        {enfant && (
          <Pressable onPress={(e) => e.stopPropagation()} className="bg-white rounded-3xl p-6 mx-8 w-[85%]">
            <View className="flex-row border-b-[1px] py-5 border-b-[#EFE3F3]">
                <View className="w-11 h-11 rounded-full items-center justify-center" style={{ backgroundColor: enfant.couleur_avatar }}>
                    <Text className="text-white font-extrabold">{enfant.prenom.charAt(0)}</Text>
                </View>
                <View className="ml-3">
                    <Text className="font-bold text-[14.5px] text-ink">{enfant.prenom}</Text>
                    <Text className="text-ink-soft text-[12px] font-medium mt-0.5">{enfant.contact_parent_email}</Text>
                </View>
            </View>
            <Pressable className="flex-row items-center mt-10">
                <View className="bg-[#D6E4FA] rounded-[7px] p-3">
                    <Ionicons name="play" color={"#3B6FD6"} size={16} />
                </View>
                <View className="flex-col ml-4">
                    <Text className="font-bold text-[15px]">Lancer une session</Text>
                    <Text className="text-ink-soft text-[12px] mt-1">Nécessite le code du parent</Text>
                </View>
            </Pressable>
            <Pressable className="flex-row items-center mt-10">
                <View className="bg-[#F2ECFB] rounded-[7px] p-3">
                    <Ionicons name="newspaper-outline" size={15} color={"#5B21B6"} />
                </View>
                <View className="flex-col ml-4">
                    <Text className="font-bold text-[15px]">Voir la fiche</Text>
                    <Text className="text-ink-soft text-[12px] mt-1">Infos, parents, historique</Text>
                </View>
            </Pressable>
            <Pressable className="flex-row items-center mt-10">
                <View className="bg-[#E8F7EF] rounded-[7px] p-3">
                    <Ionicons name="cube-outline" size={16} color={"#2FAE6B"} />
                </View>
                <View className="flex-col ml-4">
                    <Text className="font-bold text-[15px]">Rapport du jour</Text>
                    <Text className="text-ink-soft text-[12px] mt-1">Text, vocal ou photo</Text>
                </View>
            </Pressable>
            <Pressable className="flex-row items-center mt-10 border-b-[1px] pb-6 border-b-[#EFE3F3]">
                <View className="bg-[#EFE3F3] rounded-[7px] p-3">
                    <Ionicons name="create-outline" size={16} color={"#424242"} />
                </View>
                <View className="flex-col ml-4">
                    <Text className="font-bold text-[15px]">Modifier les infos</Text>
                </View>
            </Pressable>
            <Pressable className="flex-row items-center mt-10" onPress={() => {onClose(); handleDeleteKid(enfant.id)}}>
                <View className="bg-red-100 rounded-[7px] p-3">
                    <Ionicons name="trash-outline" size={18} color={"red"} />
                </View>
                <View className="flex-col ml-4">
                    <Text className="font-bold text-[15px] text-red-500">Retirer l'enfant</Text>
                </View>
            </Pressable>
            <Pressable className="flex-row w-full bg-[#EFE3F3] rounded-[10px] h-11 mt-8 justify-center items-center" onPress={onClose}>
                <Text className="text-[#424242] font-bold text-[13px]">Annuler</Text>
            </Pressable>
          </Pressable>
        )}
      </Pressable>
    </Modal>
  );
}