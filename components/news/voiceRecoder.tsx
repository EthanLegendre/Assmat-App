// components/news/VoiceRecorder.tsx
import { View, Text, Pressable } from "react-native";
import { useAudioRecorder, useAudioPlayer, RecordingPresets, AudioModule } from "expo-audio";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  onRecorded: (uri: string) => void;
};

export function VoiceRecorder({ onRecorded }: Props) {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [recordedUri, setRecordedUri] = useState<string | null>(null);

  const player = useAudioPlayer(recordedUri ?? undefined);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    AudioModule.requestRecordingPermissionsAsync();
  }, []);

  useEffect(() => {
    if (!isRecording) return;
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [isRecording]);

  async function startRecording() {
    setRecordedUri(null);
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
    setIsRecording(true);
    setSeconds(0);
  }

  async function stopRecording() {
    await audioRecorder.stop();
    setIsRecording(false);
    if (audioRecorder.uri) {
      setRecordedUri(audioRecorder.uri);
    }
  }

  function togglePlayback() {
    if (isPlaying) {
      player.pause();
      setIsPlaying(false);
    } else {
      player.seekTo(0);
      player.play();
      setIsPlaying(true);
    }
  }

  function confirmRecording() {
    if (recordedUri) {
      onRecorded(recordedUri);
    }
  }

  function discardRecording() {
    setRecordedUri(null);
    setSeconds(0);
  }

  if (!isRecording && !recordedUri) {
    return (
      <Pressable
        onPress={startRecording}
        className="flex-1 py-5 items-center justify-center gap-2 rounded-[16px] border-[1.5px] border-dashed border-[#E5D4FF] bg-lavender-pale"
      >
        <View className="w-9 h-9 rounded-full bg-white items-center justify-center">
          <Ionicons name="mic-outline" size={16} color="#5B21B6" />
        </View>
        <Text className="text-[12px] font-bold text-ink">Message vocal</Text>
      </Pressable>
    );
  }

  if (isRecording) {
    return (
      <View className="flex-1 flex-row items-center gap-3 bg-lavender-pale rounded-[16px] px-4 py-4">
        <View className="w-9 h-9 rounded-full bg-red-600 items-center justify-center">
          <Ionicons name="mic" size={16} color="#fff" />
        </View>
        <Text className="text-[13px] font-bold text-ink flex-1">
          {String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")}
        </Text>
        <Pressable onPress={stopRecording} className="w-9 h-9 rounded-full bg-white border-[1.5px] border-[#E5D4FF] items-center justify-center">
          <Ionicons name="stop" size={14} color="#221733" />
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-lavender-pale rounded-[16px] px-4 py-4">
      <View className="flex-row items-center gap-3 mb-3">
        <Pressable onPress={togglePlayback} className="w-9 h-9 rounded-full bg-violet items-center justify-center">
          <Ionicons name={isPlaying ? "pause" : "play"} size={16} color="#fff" />
        </Pressable>
        <Text className="text-[12px] font-bold text-ink flex-1">
          {String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")}
        </Text>
      </View>
      <View className="flex-row gap-2">
        <Pressable onPress={discardRecording} className="flex-1 py-2 rounded-[10px] border-[1.5px] border-red-500 items-center">
          <Text className="text-[11px] font-bold text-red-500">Supprimer</Text>
        </Pressable>
        <Pressable onPress={confirmRecording} className="flex-1 py-2 rounded-[10px] bg-violet items-center">
          <Text className="text-[11px] font-bold text-white">Validé</Text>
        </Pressable>
      </View>
    </View>
  );
}