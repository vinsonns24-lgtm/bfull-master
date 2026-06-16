import { useRouter } from "expo-router";
import { ChevronDown, MapPin } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { CAMPUSES } from "../lib/constants";
import { useStore } from "../lib/store";

/** Tappable location selector that opens the campus picker. */
export function CampusPill({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const { campusId } = useStore();
  const campus = CAMPUSES.find((c) => c.id === campusId) ?? CAMPUSES[0];

  return (
    <Pressable
      onPress={() => router.push("/campus")}
      accessibilityLabel="Change campus"
      className="flex-row items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 active:bg-slate-200"
    >
      <MapPin color="#f97316" size={13} />
      <View>
        {!compact && (
          <Text className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
            Pickup at
          </Text>
        )}
        <Text className="text-xs font-bold text-slate-700">{campus.name}</Text>
      </View>
      <ChevronDown color="#94a3b8" size={14} />
    </Pressable>
  );
}
