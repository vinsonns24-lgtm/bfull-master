import { useRouter } from "expo-router";
import { ChevronLeft, ClipboardList, Star } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getTenant } from "../lib/constants";
import { formatRupiah } from "../lib/format";
import { useStore } from "../lib/store";

const CENTER = { maxWidth: 768, width: "100%", alignSelf: "center" } as const;

export default function Orders() {
  const router = useRouter();
  const { orderHistory } = useStore();

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={["top"]}>
      <View className="flex-row items-center gap-2 border-b border-slate-100 bg-white px-4 py-3">
        <Pressable onPress={() => router.back()} className="p-1" accessibilityLabel="Go back">
          <ChevronLeft color="#0f172a" size={24} />
        </Pressable>
        <Text className="text-lg font-black text-slate-900">Order History</Text>
      </View>

      {orderHistory.length === 0 ? (
        <View className="flex-1 items-center justify-center gap-3 px-6">
          <View className="h-20 w-20 items-center justify-center rounded-full bg-slate-100">
            <ClipboardList color="#cbd5e1" size={34} />
          </View>
          <Text className="text-sm font-semibold text-slate-400">
            No past orders yet.
          </Text>
        </View>
      ) : (
        <ScrollView
          contentContainerClassName="gap-3 p-5"
          contentContainerStyle={CENTER}
          showsVerticalScrollIndicator={false}
        >
          {orderHistory.map((o) => {
            const tenant = getTenant(o.tenantId);
            return (
              <View
                key={o.id}
                className="gap-3 rounded-2xl border border-slate-100 bg-white p-4"
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-2.5">
                    <View
                      className={`h-9 w-9 items-center justify-center rounded-xl ${
                        tenant?.logoColor ?? "bg-slate-400"
                      }`}
                    >
                      <Text className="text-[10px] font-black text-white">
                        {tenant?.initials ?? "?"}
                      </Text>
                    </View>
                    <View>
                      <Text className="text-sm font-extrabold text-slate-900">
                        {tenant?.name ?? "Tenant"}
                      </Text>
                      <Text className="text-[11px] font-medium text-slate-400">
                        #{o.id} ·{" "}
                        {new Date(o.completedAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                        })}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row items-center gap-1 rounded-full bg-amber-50 px-2 py-1">
                    <Star color="#f59e0b" size={12} fill="#f59e0b" />
                    <Text className="text-xs font-bold text-amber-600">
                      {o.rating.stars}
                    </Text>
                  </View>
                </View>

                <Text className="text-xs font-medium text-slate-500" numberOfLines={2}>
                  {o.items.map((i) => `${i.quantity}× ${i.name}`).join(", ")}
                </Text>

                <View className="flex-row items-center justify-between border-t border-slate-100 pt-2">
                  <Text className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                    Picked up
                  </Text>
                  <Text className="text-sm font-black text-slate-900">
                    {formatRupiah(o.total)}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
