import { Redirect } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import { useStore } from "../lib/store";

export default function Index() {
  const { hydrated, user } = useStore();

  if (!hydrated) {
    return (
      <View className="flex-1 items-center justify-center bg-brand-500">
        <Text className="mb-4 text-5xl font-black text-white">bfull</Text>
        <ActivityIndicator color="#ffffff" />
      </View>
    );
  }

  return <Redirect href={user ? "/(tabs)" : "/login"} />;
}
