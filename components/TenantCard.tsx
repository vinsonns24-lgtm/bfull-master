import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Clock, Star } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { tenantItems } from "../lib/constants";
import type { Tenant } from "../lib/types";

export function TenantCard({ tenant }: { tenant: Tenant }) {
  const router = useRouter();
  const count = tenantItems(tenant.id).length;

  return (
    <Pressable
      onPress={() => router.push(`/tenant/${tenant.id}`)}
      className="mb-1 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm active:opacity-90"
    >
      <View className="relative h-32 bg-slate-100">
        <Image
          source={{ uri: tenant.banner }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
          transition={250}
        />
      </View>

      <View className="flex-row items-center gap-3 p-4">
        <View
          className={`h-12 w-12 items-center justify-center rounded-2xl ${tenant.logoColor}`}
        >
          <Text className="text-sm font-black text-white">
            {tenant.initials}
          </Text>
        </View>
        <View className="flex-1">
          <Text className="text-base font-extrabold text-slate-900" numberOfLines={1}>
            {tenant.name}
          </Text>
          <Text className="text-xs font-medium text-slate-400" numberOfLines={1}>
            {tenant.tagline}
          </Text>
          <View className="mt-1.5 flex-row items-center gap-3">
            <View className="flex-row items-center gap-1">
              <Star color="#fbbf24" size={13} fill="#fbbf24" />
              <Text className="text-xs font-bold text-slate-700">
                {tenant.rating.toFixed(1)}
              </Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Clock color="#94a3b8" size={13} />
              <Text className="text-xs font-semibold text-slate-500">
                {tenant.etaMin} min
              </Text>
            </View>
            <Text className="text-xs font-semibold text-slate-500">
              {"Rp".repeat(tenant.priceLevel)}
            </Text>
            <Text className="text-xs font-semibold text-slate-400">
              · {count} items
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
