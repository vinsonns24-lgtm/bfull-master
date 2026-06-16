import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { GraduationCap, Hash, Lock, Mail, User } from "lucide-react-native";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "../components/Toast";
import { useStore } from "../lib/store";
import { Field } from "./login";

export default function Register() {
  const router = useRouter();
  const { login } = useStore();
  const toast = useToast();
  const [name, setName] = useState("");
  const [nim, setNim] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit() {
    if (!name.trim() || !nim.trim()) {
      toast.show("Please complete your name and NIM.", "error");
      return;
    }
    if (!email.includes("binus.ac.id")) {
      toast.show("NIM verification failed. Must be @binus.ac.id", "error");
      return;
    }
    if (password.length < 4) {
      toast.show("Password must be at least 4 characters.", "error");
      return;
    }
    login(email, name.trim(), nim.trim());
    toast.show("Registration complete!");
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
          <View className="w-full max-w-md self-center">
          <View className="mb-6 items-center">
            <LinearGradient
              colors={["#f97316", "#ef4444"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="mb-4 h-16 w-16 items-center justify-center rounded-2xl"
            >
              <GraduationCap color="#fff" size={30} />
            </LinearGradient>
            <Text className="text-3xl font-black tracking-tight text-slate-900">
              Create Account
            </Text>
            <Text className="mt-1 text-sm font-medium text-slate-500">
              Join bfull with your student identity
            </Text>
          </View>

          <View className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm">
            <Field
              label="Full Name"
              icon={<User color="#94a3b8" size={18} />}
              value={name}
              onChangeText={setName}
              placeholder="Alex Chandra"
            />
            <Field
              label="Student NIM / ID"
              icon={<Hash color="#94a3b8" size={18} />}
              value={nim}
              onChangeText={setNim}
              placeholder="2502461183"
            />
            <Field
              label="University Email"
              icon={<Mail color="#94a3b8" size={18} />}
              value={email}
              onChangeText={setEmail}
              placeholder="alex.chandra@binus.ac.id"
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
                    Register Account
                  </Text>
                </View>
              </LinearGradient>
            </Pressable>
          </View>

          <View className="mt-6 flex-row justify-center">
            <Text className="text-sm font-medium text-slate-500">
              Already have an account?{" "}
            </Text>
            <Link href="/login" asChild>
              <Pressable>
                <Text className="text-sm font-bold text-brand-600">Login</Text>
              </Pressable>
            </Link>
          </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
