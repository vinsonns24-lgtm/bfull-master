import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft, Clock, Star } from "lucide-react-native";
import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FoodCard } from "../../components/FoodCard";
import { CATEGORIES, getTenant, tenantItems } from "../../lib/constants";
import { useResponsive } from "../../lib/useResponsive";
import type { Category } from "../../lib/types";

const CENTER = { maxWidth: 1152, width: "100%", alignSelf: "center" } as const;

export default function TenantDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { menuColumns } = useResponsive();
  const [category, setCategory] = useState<Category>("All");

  const tenant = getTenant(id);
  const items = useMemo(() => {
    const all = tenant ? tenantItems(tenant.id) : [];
    return category === "All"
      ? all
      : all.filter((i) => i.category === category);
  }, [tenant, category]);

  const cats = useMemo(() => {
    const present = new Set(
      (tenant ? tenantItems(tenant.id) : []).map((i) => i.category)
    );
    return CATEGORIES.filter((c) => c === "All" || present.has(c));
  }, [tenant]);

  const gridData = useMemo(() => {
    const rem = items.length % menuColumns;
    if (rem === 0 || items.length === 0) return items;
    const pad = Array.from({ length: menuColumns - rem }, (_, i) => ({
      id: `__ph_${i}`,
      placeholder: true as const,
    }));
    return [...items, ...pad];
  }, [items, menuColumns]);

  if (!tenant) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-slate-500">Tenant not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 bg-slate-50">
      <FlatList
        key={menuColumns}
        data={gridData}
        keyExtractor={(it) => it.id}
        numColumns={menuColumns}
        columnWrapperClassName="gap-4 px-5"
        contentContainerClassName="gap-4 pb-10"
        contentContainerStyle={CENTER}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Banner */}
            <View className="relative h-52 bg-slate-200">
              <Image
                source={{ uri: tenant.banner }}
                style={{ width: "100%", height: "100%" }}
                contentFit="cover"
                transition={250}
              />
              <LinearGradient
                colors={["rgba(0,0,0,0.35)", "transparent", "rgba(0,0,0,0.55)"]}
                style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
              />
              <SafeAreaView edges={["top"]} className="absolute left-0 top-0">
                <Pressable
                  onPress={() => router.back()}
                  accessibilityLabel="Go back"
                  className="m-4 h-9 w-9 items-center justify-center rounded-full bg-black/40 active:bg-black/60"
                >
                  <ChevronLeft color="#fff" size={22} />
                </Pressable>
              </SafeAreaView>
            </View>

            {/* Tenant info card */}
            <View className="mx-5 -mt-10 flex-row items-center gap-4 rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
              <View
                className={`h-16 w-16 items-center justify-center rounded-2xl ${tenant.logoColor}`}
              >
                <Text className="text-lg font-black text-white">
                  {tenant.initials}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-lg font-black text-slate-900">
                  {tenant.name}
                </Text>
                <Text className="text-xs font-medium text-slate-400">
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
                    {"Rp".repeat(tenant.priceLevel)} · {tenant.cuisine}
                  </Text>
                </View>
              </View>
            </View>

            {/* Category filter */}
            <View className="px-5 pt-5">
              <Text className="mb-3 text-lg font-black text-slate-800">
                Menu
              </Text>
              <FlatList
                horizontal
                data={cats}
                keyExtractor={(c) => c}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="gap-2 pb-4"
                renderItem={({ item: cat }) => {
                  const active = cat === category;
                  return (
                    <Pressable
                      onPress={() => setCategory(cat)}
                      className={`rounded-full px-5 py-2.5 ${
                        active ? "bg-slate-900" : "bg-white"
                      }`}
                    >
                      <Text
                        className={`text-xs font-bold ${
                          active ? "text-white" : "text-slate-500"
                        }`}
                      >
                        {cat}
                      </Text>
                    </Pressable>
                  );
                }}
              />
            </View>
          </View>
        }
        renderItem={({ item }) => {
          if ("placeholder" in item) return <View className="flex-1" />;
          return (
            <View className="flex-1">
              <FoodCard
                item={item}
                onPress={() => router.push(`/food/${item.id}`)}
              />
            </View>
          );
        }}
      />
    </View>
  );
}
