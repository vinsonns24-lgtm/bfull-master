import { useRouter } from "expo-router";
import { ChevronLeft, Ticket } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VOUCHERS } from "../lib/constants";

const CENTER = { maxWidth: 640, width: "100%", alignSelf: "center" } as const;

export default function Vouchers() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={["top"]}>
      <View className="flex-row items-center gap-2 border-b border-slate-100 bg-white px-4 py-3">
        <Pressable onPress={() => router.back()} className="p-1" accessibilityLabel="Go back">
          <ChevronLeft color="#0f172a" size={24} />
        </Pressable>
        <Text className="text-lg font-black text-slate-900">My Vouchers</Text>
      </View>

      <ScrollView
        contentContainerClassName="gap-3 p-5"
        contentContainerStyle={CENTER}
      >
        <Text className="text-xs font-medium text-slate-500">
          Apply a voucher on the checkout screen before paying.
        </Text>
        {VOUCHERS.map((v) => (
          <View
            key={v.id}
            className="flex-row items-center gap-4 overflow-hidden rounded-2xl border border-slate-100 bg-white"
          >
            <View className="items-center justify-center self-stretch bg-brand-500 px-4">
              <Ticket color="#fff" size={24} />
            </View>
            <View className="flex-1 py-4 pr-4">
              <Text className="text-base font-black text-slate-900">
                {v.label}
              </Text>
              <Text className="text-xs font-medium text-slate-500">
                {v.desc}
              </Text>
              <View className="mt-1.5 self-start rounded-md bg-slate-100 px-2 py-0.5">
                <Text className="text-[11px] font-black tracking-wider text-slate-600">
                  {v.code}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
