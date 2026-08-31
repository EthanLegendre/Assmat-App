import "@/global.css"
import { Text, View } from "react-native";
import { Link } from 'expo-router'
import { SafeAreaView } from "react-native-safe-area-context";
 
export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-bg x-10">
      <Link href={"/register"}>Register</Link>
    </SafeAreaView>
  );
}