import { Search } from "lucide-react-native";
import { useMemo, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CampusPill } from "../../components/CampusPill";
import { TenantCard } from "../../components/TenantCard";
import { TENANTS } from "../../lib/constants";
import { useResponsive } from "../../lib/useResponsive";

const CENTER = { maxWidth: 1152, width: "100%", alignSelf: "center" } as const;

export default function Tenants() {
  const { isWide } = useResponsive();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TENANTS.filter(
      (t) =>
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.cuisine.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q)
    );
  }, [query]);

  const columns = isWide ? 2 : 1;

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={isWide ? [] : ["top"]}>
      {!isWide && (
        <View className="flex-row items-center justify-between border-b border-slate-100 bg-white px-5 py-3">
          <Text className="text-xl font-black text-slate-900">Tenants</Text>
          <CampusPill compact />
        </View>
      )}

      <FlatList
        key={columns}
        data={filtered}
        keyExtractor={(t) => t.id}
        numColumns={columns}
        columnWrapperClassName={columns > 1 ? "gap-4 px-5" : undefined}
        contentContainerClassName="gap-4 px-5 pb-10 pt-4"
        contentContainerStyle={CENTER}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="gap-4 pb-1">
            {isWide && (
              <View>
                <Text className="text-3xl font-black text-slate-900">
                  Browse tenants
                </Text>
                <Text className="mt-1 text-sm font-medium text-slate-500">
                  Pick a stall, then explore its menu.
                </Text>
              </View>
            )}
            <View className="flex-row items-center gap-3 rounded-2xl bg-white px-4 shadow-sm">
              <Search color="#94a3b8" size={18} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search tenants or cuisine..."
                placeholderTextColor="#94a3b8"
                className="flex-1 py-3.5 text-sm font-medium text-slate-900"
              />
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View className={columns > 1 ? "flex-1" : ""}>
            <TenantCard tenant={item} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
