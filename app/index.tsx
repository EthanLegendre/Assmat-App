import "@/global.css"
import { router } from 'expo-router'
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function App() {
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      } else {
        router.replace("/homepage");
        return;
      }
    }
    checkSession();
  }, []);
  if (checkingSession) {
    return null
  }
}