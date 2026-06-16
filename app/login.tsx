import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { Lock, Mail, UtensilsCrossed } from "lucide-react-native";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "../components/Toast";
import { DEMO_EMAIL, DEMO_PASSWORD } from "../lib/constants";
import { useStore } from "../lib/store";
import { useResponsive } from "../lib/useResponsive";

export default function Login() {
  const router = useRouter();
  const { login } = useStore();
  const toast = useToast();
  const { isWide } = useResponsive();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit() {
    if (!email.includes("binus.ac.id")) {
      toast.show("Please use a valid @binus.ac.id email!", "error");
      return;
    }
    if (password.length < 4) {
      toast.show("Password must be at least 4 characters.", "error");
      return;
    }
    login(email);
    toast.show("Signed in successfully!");
    router.replace("/(tabs)");
  }

  function useDemo() {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    login(DEMO_EMAIL, "Demo Student", "2502461183");
    toast.show("Logged in with demo account");
    router.replace("/(tabs)");
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerClassName="flex-grow justify-center px-6 py-8"
          keyboardShouldPersistTaps="handled"
        >
          <View
            className={
              isWide
                ? "w-full max-w-5xl self-center flex-row overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl"
                : "w-full"
            }
          >
            {/* Desktop hero panel */}
            {isWide && (
              <LinearGradient
                colors={["#f97316", "#ef4444"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1 }}
              >
                <View className="flex-1 justify-between p-12">
                  <View className="flex-row items-center gap-3">
                    <View className="h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
                      <UtensilsCrossed color="#fff" size={26} />
                    </View>
                    <Text className="text-3xl font-black text-white">bfull</Text>
                  </View>
                  <View className="gap-4">
                    <Text className="text-4xl font-black leading-tight text-white">
                      Skip the queue.{"\n"}Enjoy instant food.
                    </Text>
                    <Text className="text-base font-medium leading-6 text-orange-50">
                      Order ahead at kantin binus, pay cashless, and track your
                      meal in real time — pick it up the moment it&apos;s ready.
                    </Text>
                    <View className="mt-2 gap-2">
                      {[
                        "Real-time order tracking",
                        "Cashless QRIS payment",
                        "No more waiting in line",
                      ].map((t) => (
                        <View key={t} className="flex-row items-center gap-2">
                          <View className="h-1.5 w-1.5 rounded-full bg-white" />
                          <Text className="text-sm font-semibold text-orange-50">
                            {t}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                  <Text className="text-xs font-medium text-orange-100">
                    Human &amp; Computer Interaction · BINUS University
                  </Text>
                </View>
              </LinearGradient>
            )}

            {/* Form column */}
            <View className={isWide ? "w-[440px] justify-center p-12" : "w-full"}>
              {/* Mobile brand header */}
              {!isWide && (
                <View className="mb-8 items-center">
                  <LinearGradient
                    colors={["#f97316", "#ef4444"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="mb-4 h-16 w-16 items-center justify-center rounded-2xl"
                  >
                    <UtensilsCrossed color="#fff" size={30} />
                  </LinearGradient>
                  <Text className="text-4xl font-black tracking-tight text-slate-900">
                    bfull
                  </Text>
                  <Text className="mt-1 text-sm font-medium text-slate-500">
                    Skip the queue, enjoy instant food at{" "}
                    <Text className="font-semibold text-brand-500">
                      kantin binus
                    </Text>
                  </Text>
                </View>
              )}

              <View
                className={
                  isWide
                    ? ""
                    : "rounded-3xl border border-slate-100 bg-white p-7 shadow-sm"
                }
              >
                <Text className="mb-5 text-2xl font-bold text-slate-800">
                  Sign In
                </Text>

                <Field
                  label="Student Email"
                  icon={<Mail color="#94a3b8" size={18} />}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="alex@binus.ac.id"
                  keyboardType="email-address"
                />
                <Field
                  label="Password"
                  icon={<Lock color="#94a3b8" size={18} />}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  secureTextEntry
                />

                <Pressable
                  onPress={onSubmit}
                  className="mt-2 overflow-hidden rounded-2xl active:opacity-90"
                >
                  <LinearGradient
                    colors={["#f97316", "#ef4444"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <View className="w-full items-center py-4">
                      <Text className="text-sm font-bold tracking-wide text-white">
                        Enter App
                      </Text>
                    </View>
                  </LinearGradient>
                </Pressable>

                <Pressable onPress={useDemo} className="mt-3 items-center py-3">
                  <Text className="text-sm font-semibold text-slate-500">
                    Try the{" "}
                    <Text className="font-bold text-brand-600">
                      demo account
                    </Text>
                  </Text>
                </Pressable>

                <View className="mt-4 flex-row justify-center">
                  <Text className="text-sm font-medium text-slate-500">
                    Don&apos;t have an account?{" "}
                  </Text>
                  <Link href="/register" asChild>
                    <Pressable>
                      <Text className="text-sm font-bold text-brand-600">
                        Register
                      </Text>
                    </Pressable>
                  </Link>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

interface FieldProps {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChangeText: (t: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: "email-address" | "default";
}

export function Field({
  label,
  icon,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType = "default",
}: FieldProps) {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </Text>
      <View className="flex-row items-center gap-3 rounded-2xl border border-slate-200 px-4">
        {icon}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#cbd5e1"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize="none"
          className="flex-1 py-3.5 text-sm font-medium text-slate-900"
        />
      </View>
    </View>
  );
}
