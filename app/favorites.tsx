import { useRouter } from "expo-router";
import { ChevronLeft, Heart } from "lucide-react-native";
import { useMemo } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FoodCard } from "../components/FoodCard";
import { MENU_ITEMS } from "../lib/constants";
import { useResponsive } from "../lib/useResponsive";
import { useStore } from "../lib/store";

const CENTER = { maxWidth: 1152, width: "100%", alignSelf: "center" } as const;

export default function Favorites() {
  const router = useRouter();
  const { favorites } = useStore();
  const { menuColumns } = useResponsive();

  const items = useMemo(
    () => MENU_ITEMS.filter((m) => favorites.includes(m.id)),
    [favorites]
  );

  const gridData = useMemo(() => {
    const rem = items.length % menuColumns;
    if (rem === 0 || items.length === 0) return items;
    const pad = Array.from({ length: menuColumns - rem }, (_, i) => ({
      id: `__ph_${i}`,
      placeholder: true as const,
    }));
    return [...items, ...pad];
  }, [items, menuColumns]);

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={["top"]}>
      <View className="flex-row items-center gap-2 border-b border-slate-100 bg-white px-4 py-3">
        <Pressable onPress={() => router.back()} className="p-1" accessibilityLabel="Go back">
          <ChevronLeft color="#0f172a" size={24} />
        </Pressable>
        <Text className="text-lg font-black text-slate-900">Favorites</Text>
      </View>

      {items.length === 0 ? (
        <View className="flex-1 items-center justify-center gap-3 px-6">
          <View className="h-20 w-20 items-center justify-center rounded-full bg-slate-100">
            <Heart color="#cbd5e1" size={34} />
          </View>
          <Text className="text-sm font-semibold text-slate-400">
            No favorites yet. Tap the heart on any meal.
          </Text>
        </View>
      ) : (
        <FlatList
          key={menuColumns}
          data={gridData}
          keyExtractor={(it) => it.id}
          numColumns={menuColumns}
          columnWrapperClassName="gap-4 px-5"
          contentContainerClassName="gap-4 pb-10 pt-4"
          contentContainerStyle={CENTER}
          showsVerticalScrollIndicator={false}
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
      )}
    </SafeAreaView>
  );
}
