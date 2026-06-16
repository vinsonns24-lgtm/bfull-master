import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Clock, Heart, Plus, Star } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { getTenant } from "../lib/constants";
import { formatRupiah } from "../lib/format";
import { useStore } from "../lib/store";
import type { MenuItem } from "../lib/types";

export function FoodCard({
  item,
  onPress,
}: {
  item: MenuItem;
  onPress: () => void;
}) {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useStore();
  const tenant = getTenant(item.tenantId);
  const fav = isFavorite(item.id);

  return (
    <Pressable
      onPress={onPress}
      className="mb-1 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm active:opacity-90"
    >
      <View className="relative h-40 bg-slate-100">
        <Image
          source={{ uri: item.image }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
          transition={250}
        />
        <View className="absolute right-3 top-3 flex-row items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 shadow-sm">
          <Clock color="#f97316" size={13} />
          <Text className="text-[11px] font-black text-slate-800">
            {item.prepTime} min
          </Text>
        </View>
        <View className="absolute left-3 top-3 flex-row items-center gap-1 rounded-full bg-slate-900/80 px-2.5 py-1">
          <Star color="#fbbf24" size={12} fill="#fbbf24" />
          <Text className="text-[11px] font-bold text-white">
            {item.rating.toFixed(1)}
          </Text>
        </View>
        <Pressable
          onPress={() => toggleFavorite(item.id)}
          accessibilityLabel={fav ? "Remove from favorites" : "Add to favorites"}
          className="absolute bottom-3 right-3 h-8 w-8 items-center justify-center rounded-full bg-white/95 shadow-sm active:opacity-80"
        >
          <Heart
            color={fav ? "#ef4444" : "#94a3b8"}
            fill={fav ? "#ef4444" : "transparent"}
            size={16}
          />
        </Pressable>
      </View>

      <View className="gap-1.5 p-3.5">
        <Text className="text-sm font-extrabold text-slate-900" numberOfLines={1}>
          {item.name}
        </Text>

        {tenant && (
          <Pressable
            onPress={() => router.push(`/tenant/${tenant.id}`)}
            className="flex-row items-center gap-1.5 self-start active:opacity-70"
          >
            <View
              className={`h-4 w-4 items-center justify-center rounded ${tenant.logoColor}`}
            >
              <Text className="text-[7px] font-black text-white">
                {tenant.initials}
              </Text>
            </View>
            <Text className="text-[11px] font-bold text-slate-500" numberOfLines={1}>
              {tenant.name}
            </Text>
          </Pressable>
        )}

        <Text
          className="text-[11px] font-medium leading-4 text-slate-400"
          numberOfLines={2}
        >
          {item.description}
        </Text>
        <View className="mt-1 flex-row items-center justify-between">
          <Text className="text-base font-black text-brand-500">
            {formatRupiah(item.price)}
          </Text>
          <View className="h-8 w-8 items-center justify-center rounded-full bg-brand-500 shadow-sm">
            <Plus color="#fff" size={18} strokeWidth={3} />
          </View>
        </View>
      </View>
    </Pressable>
  );
}
