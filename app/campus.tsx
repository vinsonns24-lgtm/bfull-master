import { useRouter } from "expo-router";
import { Check, MapPin, X } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { CAMPUSES } from "../lib/constants";
import { useStore } from "../lib/store";

export default function CampusPicker() {
  const router = useRouter();
  const { campusId, setCampus } = useStore();

  return (
    <View className="flex-1 justify-end bg-slate-900/60">
      <View className="max-h-[80%] rounded-t-3xl bg-white pb-6">
        <View className="flex-row items-center justify-between border-b border-slate-100 px-6 py-4">
          <View>
            <Text className="text-lg font-black text-slate-900">
              Choose your campus
            </Text>
            <Text className="text-xs font-medium text-slate-500">
              Pick where you&apos;ll grab your order
            </Text>
          </View>
          <Pressable onPress={() => router.back()} className="p-1">
            <X color="#94a3b8" size={22} />
          </Pressable>
        </View>

        <ScrollView contentContainerClassName="p-4 gap-2">
          {CAMPUSES.map((c) => {
            const active = c.id === campusId;
            return (
              <Pressable
                key={c.id}
                onPress={() => {
                  setCampus(c.id);
                  router.back();
                }}
                className={`flex-row items-center gap-3 rounded-2xl border p-4 ${
                  active
                    ? "border-brand-200 bg-brand-50"
                    : "border-slate-100 bg-white"
                }`}
              >
                <View
                  className={`h-10 w-10 items-center justify-center rounded-xl ${
                    active ? "bg-brand-500" : "bg-slate-100"
                  }`}
                >
                  <MapPin color={active ? "#fff" : "#94a3b8"} size={18} />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-bold text-slate-900">
                    {c.name}
                  </Text>
                  <Text className="text-xs font-medium text-slate-500">
                    {c.area}
                  </Text>
                </View>
                {active && <Check color="#ea580c" size={20} />}
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}
