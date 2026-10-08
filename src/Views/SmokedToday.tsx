import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const C = {
  dark: "#0F3D3E",
  green: "#3E8E4F",
  greenDeep: "#1F6B45",
  greenSoft: "#E3F2E8",
  border: "#D5E6DB",
  muted: "#6B7C7A",
  white: "#FFFFFF",
};

const OPTIONS = [
  { key: "1-5", label: "1 - 5", count: 1 },
  { key: "6-10", label: "6 - 10", count: 2 },
  { key: "11-15", label: "11 - 15", count: 3 },
  { key: "16-20", label: "16 - 20", count: 4 },
  { key: "20+", label: "Más de 20", count: 5 },
  { key: "otro", label: "Otro", count: 0 },
];

// 5 notificaciones de consejos para cuando fuma poco
const LOW_SMOKE_ADVICE = [
  "Deja de fumar que tienes tiempo de hacerlo 💪",
  "Cada cigarrillo menos es un paso hacia la libertad 🌱",
  "Tu cuerpo te agradecerá cada decisión saludable 💚",
  "Empieza hoy, tu yo del futuro te lo agradecerá 🎯",
  "No es tarde para cambiar, empieza ahora mismo 🚀",
];

// 5 notificaciones de advertencias para cuando fuma mucho
const HIGH_SMOKE_WARNING = [
  "⚠️ Esto es algo serio y hay que dejarlo ya",
  "⚠️ Tu salud está en riesgo, toma conciencia",
  "⚠️ El tabaco destruye tu cuerpo gradualmente",
  "⚠️ Piensa en tu familia y seres queridos",
  "⚠️ Cada cigarrillo cuenta, detente a tiempo",
];

// 10 felicitaciones diferentes para cuando no fuma
const CONGRATULATIONS = [
  "¡Felicitaciones! Dejaste de fumar hoy 🎉",
  "¡Excelente! Un día más libre de tabaco 💚",
  "¡Bravo! Tu salud te está agradeciendo 🌟",
  "¡Increíble! Eres más fuerte que la adicción 💪",
  "¡Fantástico! Siguiendo el camino correcto 🎯",
  "¡Maravilloso! Un logro para celebrar 🏆",
  "¡Genial! Cada día sin fumar es una victoria ⭐",
  "¡Perfecto! Tu determinación es inspiradora 🌈",
  "¡Magnífico! Eres un ejemplo a seguir 💫",
  "¡Sorprendente! Sigue construyendo tu futuro brillante ✨",
];

/* Mini ilustración de cigarrillos hecha con Views */
function Cigs({ count }: { count: number }) {
  if (count === 0) {
    return <Feather name="edit-2" size={22} color={C.greenDeep} />;
  }
  return (
    <View style={{ gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} style={styles.cig}>
          <View style={styles.cigFilter} />
          <View style={styles.cigBody} />
          <View style={styles.cigAsh} />
        </View>
      ))}
    </View>
  );
}

function Radio({ selected }: { selected: boolean }) {
  return (
    <View style={[styles.radio, selected && styles.radioOn]}>
      {selected ? <View style={styles.radioDot} /> : null}
    </View>
  );
}

export default function SmokedTodayScreen() {
  const params = useLocalSearchParams();
  const currentTotal = params.totalCigarettes ? parseInt(params.totalCigarettes as string) : 0;
  const currentDays = params.daysWithoutSmoking ? parseInt(params.daysWithoutSmoking as string) : 0;
  
  const [smoked, setSmoked] = useState(true);
  const [amount, setAmount] = useState<string | null>(null);
  const [other, setOther] = useState("");
  const [showBanner, setShowBanner] = useState(false);
  const [bannerMessage, setBannerMessage] = useState("");
  const [bannerType, setBannerType] = useState<"success" | "advice" | "warning">("success");
  const [bannerIndex, setBannerIndex] = useState(0);
  const [messageQueue, setMessageQueue] = useState<string[]>([]);

  const canContinue =
    smoked === false ||
    (smoked && amount && (amount !== "otro" || other.trim().length > 0));

  const handleContinue = () => {
    if (smoked === false) {
      // No fumó - enviar 10 felicitaciones
      setMessageQueue(CONGRATULATIONS);
      setBannerType("success");
      setBannerIndex(0);
      setShowBanner(true);
      setBannerMessage(CONGRATULATIONS[0]);
    } else if (amount) {
      // Fumó - determinar cantidad
      let cigCount = 0;
      if (amount === "otro") {
        cigCount = parseInt(other) || 0;
      } else {
        const ranges: Record<string, number> = { "1-5": 3, "6-10": 8, "11-15": 13, "16-20": 18, "20+": 25 };
        cigCount = ranges[amount] || 0;
      }
      
      // Si fuma poco (10 o menos): consejos
      // Si fuma mucho (11 o más): advertencias serias
      if (cigCount <= 10) {
        setMessageQueue(LOW_SMOKE_ADVICE);
        setBannerType("advice");
      } else {
        setMessageQueue(HIGH_SMOKE_WARNING);
        setBannerType("warning");
      }
      setBannerIndex(0);
      setShowBanner(true);
      setBannerMessage(messageQueue[0]);
    }
  };

  const handleNextBanner = () => {
    if (bannerIndex < messageQueue.length - 1) {
      const nextIndex = bannerIndex + 1;
      setBannerIndex(nextIndex);
      setBannerMessage(messageQueue[nextIndex]);
    } else {
      // Terminó la secuencia de notificaciones
      setShowBanner(false);
      if (smoked === false) {
        const newDays = currentDays + 1;
        router.push({
          pathname: "/home",
          params: { 
            daysWithoutSmoking: newDays.toString(),
            totalCigarettes: currentTotal.toString()
          }
        });
      } else {
        let cigCount = 0;
        if (amount === "otro") {
          cigCount = parseInt(other) || 0;
        } else {
          const ranges: Record<string, number> = { "1-5": 3, "6-10": 8, "11-15": 13, "16-20": 18, "20+": 25 };
          cigCount = ranges[amount] || 0;
        }
        const newTotal = currentTotal + cigCount;
        router.push({
          pathname: "/home",
          params: { 
            cigarettes: cigCount.toString(),
            totalCigarettes: newTotal.toString(),
            daysWithoutSmoking: currentDays.toString()
          }
        });
      }
    }
  };

  return (
    <LinearGradient
      colors={["#EAF4EE", "#F7FBF8", "#EAF4EE"]}
      style={{ flex: 1 }}
    >
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          {/* Banner de notificaciones */}
          {showBanner && (
            <View style={[styles.notificationBanner, 
              bannerType === "success" && styles.bannerSuccess,
              bannerType === "advice" && styles.bannerAdvice,
              bannerType === "warning" && styles.bannerWarning
            ]}>
              <View style={styles.bannerContent}>
                <Text style={styles.bannerTitle}>
                  {bannerType === "success" ? "¡Felicitaciones!" : 
                   bannerType === "advice" ? "Consejo" : "Advertencia"}
                </Text>
                <Text style={styles.bannerMessage}>{bannerMessage}</Text>
                <Text style={styles.bannerProgress}>{bannerIndex + 1} de {messageQueue.length}</Text>
              </View>
              <TouchableOpacity style={styles.bannerButton} onPress={handleNextBanner}>
                <Text style={styles.bannerButtonText}>Siguiente</Text>
              </TouchableOpacity>
            </View>
          )}

          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Cabecera: logo + progreso */}
            <View style={styles.topRow}>
              <View style={styles.logoRow}>
                <Ionicons name="leaf" size={28} color={C.greenDeep} />
                <Text style={styles.logoText}>
                  New <Text style={styles.logoItalic}>me</Text>
                </Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Paso 4 de 5</Text>
              </View>
            </View>

            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: "80%" }]} />
            </View>

            {/* Título */}
            <Text style={styles.title}>¿Fumaste hoy?</Text>
            <Text style={styles.subtitle}>
              Sé honesto/a, esto nos ayuda a seguir apoyándote.
            </Text>

            {/* Sí / No */}
            <View style={styles.yesNoRow}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={[styles.yesNo, smoked === true && styles.yesNoOn]}
                onPress={() => setSmoked(true)}
              >
                <Radio selected={smoked === true} />
                <Text style={styles.yesNoText}>Sí, fumé</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.85}
                style={[styles.yesNo, smoked === false && styles.yesNoOn]}
                onPress={() => {
                  setSmoked(false);
                  setAmount(null);
                }}
              >
                <Radio selected={smoked === false} />
                <Text style={styles.yesNoText}>No, no fumé</Text>
              </TouchableOpacity>
            </View>

            {/* Cantidad (solo si fumó) */}
            {smoked ? (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>¿Cuántos consumiste?</Text>
                <Text style={styles.cardSub}>
                  Selecciona la cantidad aproximada de cigarrillos.
                </Text>

                <View style={styles.grid}>
                  {OPTIONS.map((o) => {
                    const on = amount === o.key;
                    return (
                      <TouchableOpacity
                        key={o.key}
                        activeOpacity={0.85}
                        style={[styles.option, on && styles.optionOn]}
                        onPress={() => setAmount(o.key)}
                      >
                        <View style={styles.optionIcon}>
                          <Cigs count={o.count} />
                        </View>
                        <Text style={[styles.optionText, on && { color: C.greenDeep }]}>
                          {o.label}
                        </Text>
                        {on ? (
                          <Ionicons
                            name="checkmark-circle"
                            size={18}
                            color={C.green}
                            style={styles.optionCheck}
                          />
                        ) : null}
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {amount === "otro" ? (
                  <TextInput
                    style={styles.input}
                    placeholder="Escribe la cantidad aquí..."
                    placeholderTextColor="#8FA29B"
                    keyboardType="number-pad"
                    value={other}
                    onChangeText={setOther}
                  />
                ) : null}
              </View>
            ) : (
              <View style={[styles.card, styles.goodCard]}>
                <Ionicons name="heart" size={30} color={C.green} />
                <Text style={styles.goodTitle}>¡Excelente trabajo!</Text>
                <Text style={styles.goodText}>
                  Un día más sin fumar es un gran logro. Sigue así.
                </Text>
              </View>
            )}
          </ScrollView>

          {/* Botones fijos abajo */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.backBtn}
              activeOpacity={0.8}
              onPress={() => router.back()}
            >
              <Feather name="arrow-left" size={20} color={C.greenDeep} />
              <Text style={styles.backText}>Atrás</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flex: 1 }}
              activeOpacity={0.9}
              disabled={!canContinue}
              onPress={handleContinue}
            >
              <LinearGradient
                colors={canContinue ? ["#4C9A5F", "#2F7D4F"] : ["#B9CFC1", "#B9CFC1"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.nextBtn}
              >
                <Text style={styles.nextText}>Continuar</Text>
                <Feather name="arrow-right" size={20} color={C.white} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 20 },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  logoText: { fontSize: 26, fontWeight: "800", color: C.dark },
  logoItalic: { fontStyle: "italic", color: C.green },
  badge: {
    backgroundColor: "#CDEBD7",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: { color: C.greenDeep, fontWeight: "700", fontSize: 13 },

  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#D5E6DB",
    marginTop: 14,
    overflow: "hidden",
  },
  progressFill: { height: 6, borderRadius: 3, backgroundColor: C.green },

  title: { fontSize: 34, fontWeight: "800", color: C.dark, marginTop: 22 },
  subtitle: { fontSize: 16, color: C.muted, marginTop: 6, lineHeight: 23 },

  yesNoRow: { flexDirection: "row", gap: 12, marginTop: 20 },
  yesNo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: C.white,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: C.border,
    paddingVertical: 18,
    paddingHorizontal: 14,
  },
  yesNoOn: { backgroundColor: C.greenSoft, borderColor: C.green },
  yesNoText: { fontSize: 16, fontWeight: "700", color: C.dark, flexShrink: 1 },

  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#9BAFA6",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOn: { borderColor: C.green },
  radioDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: C.green },

  card: {
    marginTop: 16,
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: C.border,
    padding: 16,
  },
  cardTitle: { fontSize: 19, fontWeight: "800", color: C.dark },
  cardSub: { fontSize: 14, color: C.muted, marginTop: 4 },

  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 14 },
  option: {
    width: "31.2%",
    flexGrow: 1,
    minHeight: 96,
    backgroundColor: C.white,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: C.border,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  optionOn: { backgroundColor: C.greenSoft, borderColor: C.green },
  optionIcon: { height: 36, justifyContent: "center", marginBottom: 6 },
  optionText: { fontSize: 14, fontWeight: "700", color: C.dark },
  optionCheck: { position: "absolute", top: 6, right: 6 },

  cig: { flexDirection: "row", alignItems: "center", width: 44, height: 5 },
  cigFilter: {
    width: 14,
    height: 5,
    backgroundColor: "#E8933C",
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  cigBody: { flex: 1, height: 5, backgroundColor: "#F1F4F2" },
  cigAsh: {
    width: 4,
    height: 5,
    backgroundColor: "#9AA5A0",
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },

  input: {
    marginTop: 14,
    backgroundColor: C.white,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: C.green,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 16,
    color: C.dark,
  },

  goodCard: { alignItems: "center", paddingVertical: 28, gap: 8 },
  goodTitle: { fontSize: 20, fontWeight: "800", color: C.dark },
  goodText: { fontSize: 15, color: C.muted, textAlign: "center", lineHeight: 22 },

  footer: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 14,
  },
  backBtn: {
    height: 58,
    paddingHorizontal: 22,
    borderRadius: 29,
    borderWidth: 1.5,
    borderColor: C.greenDeep,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: C.white,
  },
  backText: { fontSize: 16, fontWeight: "700", color: C.greenDeep },
  nextBtn: {
    height: 58,
    borderRadius: 29,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  nextText: { color: C.white, fontSize: 18, fontWeight: "700" },

  /* Banner de notificaciones */
  notificationBanner: {
    position: "absolute",
    top: 50,
    left: 16,
    right: 16,
    backgroundColor: C.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
    zIndex: 100,
  },
  bannerSuccess: {
    borderWidth: 2,
    borderColor: C.green,
  },
  bannerAdvice: {
    borderWidth: 2,
    borderColor: "#3498DB",
  },
  bannerWarning: {
    borderWidth: 2,
    borderColor: "#E74C3C",
  },
  bannerContent: {
    marginBottom: 12,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: C.dark,
    marginBottom: 4,
  },
  bannerMessage: {
    fontSize: 15,
    color: C.muted,
    lineHeight: 22,
    marginBottom: 8,
  },
  bannerProgress: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "600",
  },
  bannerButton: {
    backgroundColor: C.green,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  bannerButtonText: {
    color: C.white,
    fontSize: 16,
    fontWeight: "700",
  },
});
