import { useRouter } from "expo-router";
import {
  ChevronRight,
  ClipboardList,
  Clock,
  HelpCircle,
  Heart,
  Info,
  LogOut,
  Plus,
  ShieldCheck,
  Ticket,
  Wallet,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "../../components/Toast";
import { formatRupiah } from "../../lib/format";
import { useResponsive } from "../../lib/useResponsive";
import { useStore } from "../../lib/store";

const CENTER = { maxWidth: 640, width: "100%", alignSelf: "center" } as const;

export default function Profile() {
  const router = useRouter();
  const {
    user,
    updateProfile,
    logout,
    walletBalance,
    points,
    minutesSaved,
    orderHistory,
    favorites,
  } = useStore();
  const toast = useToast();
  const { isWide } = useResponsive();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
    setPhone(user?.phone ?? "");
  }, [user]);

  function save() {
    if (!name.trim() || !email.includes("binus.ac.id")) {
      toast.show("Name and a valid @binus.ac.id email are required.", "error");
      return;
    }
    updateProfile({ name: name.trim(), email: email.trim(), phone: phone.trim() });
    toast.show("Profile information saved!");
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={isWide ? [] : ["top"]}>
      <View className="border-b border-slate-100 bg-white">
        <View style={CENTER} className="px-5 py-4">
          <Text className="text-xl font-black text-slate-900">
            Student Profile
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerClassName="gap-5 p-5"
          contentContainerStyle={CENTER}
          keyboardShouldPersistTaps="handled"
        >
          {/* Identity */}
          <View className="flex-row items-center gap-4 rounded-2xl border border-brand-100 bg-brand-50 p-4">
            <View className="h-14 w-14 items-center justify-center rounded-2xl bg-brand-500">
              <Text className="text-xl font-black uppercase text-white">
                {(user?.name ?? "S").charAt(0)}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-slate-800">
                {user?.name}
              </Text>
              <Text className="text-xs font-medium text-slate-500">
                NIM: {user?.studentId}
              </Text>
              <Text className="text-xs font-medium text-slate-400">
                {user?.email}
              </Text>
            </View>
          </View>

          {/* bfull Pay wallet */}
          <View className="gap-4 rounded-3xl bg-slate-900 p-5">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <Wallet color="#fb923c" size={18} />
                <Text className="text-sm font-bold text-white">bfull Pay</Text>
              </View>
              <Pressable
                onPress={() => toast.show("Top-up is coming soon", "info")}
                className="flex-row items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 active:opacity-80"
              >
                <Plus color="#fff" size={14} strokeWidth={3} />
                <Text className="text-xs font-bold text-white">Top Up</Text>
              </Pressable>
            </View>
            <View>
              <Text className="text-[11px] font-medium text-slate-400">
                Balance
              </Text>
              <Text className="text-2xl font-black text-white">
                {formatRupiah(walletBalance)}
              </Text>
            </View>
            <View className="flex-row gap-3 border-t border-white/10 pt-3">
              <Stat label="Points" value={`${points}`} />
              <Stat label="Orders" value={`${orderHistory.length}`} />
              <Stat label="Min. saved" value={`${minutesSaved}`} />
            </View>
          </View>

          {/* Quick actions */}
          <View className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
            <Row
              icon={<ClipboardList color="#ea580c" size={18} />}
              label="Order History"
              meta={`${orderHistory.length}`}
              onPress={() => router.push("/orders")}
            />
            <Divider />
            <Row
              icon={<Heart color="#ef4444" size={18} />}
              label="Favorites"
              meta={`${favorites.length}`}
              onPress={() => router.push("/favorites")}
            />
            <Divider />
            <Row
              icon={<Ticket color="#f59e0b" size={18} />}
              label="My Vouchers"
              meta="3"
              onPress={() => router.push("/vouchers")}
            />
          </View>

          {/* Settings */}
          <View className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
            <View className="flex-row items-center gap-3 px-4 py-3.5">
              <Clock color="#64748b" size={18} />
              <Text className="flex-1 text-sm font-bold text-slate-700">
                Push notifications
              </Text>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ true: "#f97316", false: "#cbd5e1" }}
                thumbColor="#ffffff"
              />
            </View>
            <Divider />
            <Row
              icon={<HelpCircle color="#64748b" size={18} />}
              label="Help & Support"
              onPress={() => toast.show("Reach us at help@bfull.app", "info")}
            />
            <Divider />
            <Row
              icon={<Info color="#64748b" size={18} />}
              label="About bfull"
              onPress={() =>
                toast.show("bfull v1.0 · HCI Project · BINUS", "info")
              }
            />
          </View>

          {/* Account details (editable) */}
          <View className="gap-4 rounded-2xl border border-slate-100 bg-white p-5">
            <Text className="text-sm font-black text-slate-800">
              Account Details
            </Text>
            <ProfileField label="Full Name" value={name} onChangeText={setName} />
            <ProfileField
              label="Student Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <ProfileField
              label="Phone Contact"
              value={phone}
              onChangeText={setPhone}
              placeholder="+62 812-3456-7890"
            />
            <Pressable
              onPress={save}
              className="mt-1 flex-row items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 active:opacity-90"
            >
              <ShieldCheck color="#fff" size={18} />
              <Text className="text-sm font-bold text-white">
                Save Information
              </Text>
            </Pressable>
          </View>

          <Pressable
            onPress={logout}
            className="flex-row items-center justify-center gap-2 rounded-xl bg-red-50 py-4 active:bg-red-100"
          >
            <LogOut color="#dc2626" size={18} />
            <Text className="text-sm font-bold text-red-600">
              Logout Student Profile
            </Text>
          </Pressable>

          <Text className="pb-2 text-center text-[11px] font-medium text-slate-400">
            bfull · University Order-Ahead Canteen{"\n"}Skip the queue at kantin
            binus
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-1">
      <Text className="text-lg font-black text-white">{value}</Text>
      <Text className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </Text>
    </View>
  );
}

function Divider() {
  return <View className="ml-14 h-px bg-slate-100" />;
}

function Row({
  icon,
  label,
  meta,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  meta?: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-3 px-4 py-3.5 active:bg-slate-50"
    >
      <View className="h-8 w-8 items-center justify-center rounded-lg bg-slate-50">
        {icon}
      </View>
      <Text className="flex-1 text-sm font-bold text-slate-700">{label}</Text>
      {!!meta && (
        <Text className="text-xs font-bold text-slate-400">{meta}</Text>
      )}
      <ChevronRight color="#cbd5e1" size={18} />
    </Pressable>
  );
}

function ProfileField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  keyboardType?: "email-address" | "default";
}) {
  return (
    <View>
      <Text className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#cbd5e1"
        keyboardType={keyboardType}
        autoCapitalize="none"
        className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900"
      />
    </View>
  );
}
