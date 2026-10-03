import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const C = {
  dark: "#0F3D3E",
  green: "#3E8E4F",
  greenDeep: "#1F6B45",
  muted: "#5F7370",
  white: "#FFFFFF",
};

const MODULES = [
  {
    id: 1,
    badge: "Módulo 1",
    title: "Hábitos que cuidan tu salud ante el tabaco",
    text: "Descubre cómo los buenos hábitos te ayudan a prevenir enfermedades bucales y a mantener tu salud general, libre de tabaco.",
    icon: "shield-checkmark",
    accent: "#2F8F57",
    bg: "#EAF7EF",
    border: "#BFE3CD",
    soft: "#CDEBD8",
    titleColor: "#0F4A3A",
  },
  {
    id: 2,
    badge: "Módulo 2",
    title: "Comienzo de una sonrisa",
    text: "Aprende sobre la formación y el desarrollo de los dientes.",
    icon: "happy",
    accent: "#3B8BD4",
    bg: "#E8F3FC",
    border: "#BFDDF4",
    soft: "#C9E3F7",
    titleColor: "#0F3D5E",
  },
  {
    id: 3,
    badge: "Módulo 3",
    title: "Deja el tabaco y recupera tu sonrisa",
    text: "Tu boca también se recupera. Reduce el riesgo de enfermedades y recupera la confianza en tu sonrisa.",
    icon: "sparkles",
    accent: "#7A5AD6",
    bg: "#F1EBFB",
    border: "#D8CBF2",
    soft: "#DDD0F5",
    titleColor: "#3B2477",
  },
];

function ModuleCard({ m, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.card, { backgroundColor: m.bg, borderColor: m.border }]}
    >
      {/* Contenido principal */}
      <View style={styles.cardContent}>
        {/* Espacio para imagen */}
        <View style={[styles.imagePlaceholder, { backgroundColor: m.soft }]}>
          <Ionicons name={m.icon} size={40} color={m.accent} />
          <Ionicons
            name="leaf"
            size={18}
            color={m.accent}
            style={styles.illusLeaf}
          />
        </View>

        {/* Texto */}
        <View style={styles.cardBody}>
          <Text style={[styles.badgeText, { color: m.accent }]}>{m.badge}</Text>
          <Text style={[styles.cardTitle, { color: m.titleColor }]}>{m.title}</Text>
          <Text style={styles.cardText}>
            {m.text}
          </Text>
        </View>

        {/* Flecha */}
        <View style={[styles.arrow, { backgroundColor: m.soft }]}>
          <Feather name="arrow-right" size={20} color={m.accent} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function ComponentsScreen() {
  return (
    <LinearGradient colors={["#EAF4EE", "#F7FBF8"]} style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <View style={styles.scroll}>
          {/* Logo */}
          <View style={styles.logoRow}>
            <Image source={require("../Imagen/Logo.png")} style={styles.logoImage} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.logoText}>
                New <Text style={styles.logoItalic}>me</Text>
              </Text>
              <View style={styles.logoUnderline} />
            </View>
          </View>

          {/* Título */}
          <Text style={styles.title}>Componentes</Text>
          <Text style={styles.subtitle}>
            Aquí encontrarás los temas principales que te ayudarán en tu
            formación profesional.
          </Text>

          {/* Módulos */}
          <View style={styles.list}>
            {MODULES.map((m) => (
              <ModuleCard
                key={m.id}
                m={m}
                onPress={() => router.push({ pathname: "/modulo", params: { id: m.id } })}
              />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },

  logoRow: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  logoImage: { width: 70, height: 70, resizeMode: "contain", opacity: 0.9 },
  logoText: { fontSize: 38, fontWeight: "800", color: C.dark },
  logoItalic: { fontStyle: "italic", color: C.green, fontWeight: "700" },
  logoUnderline: {
    height: 3,
    borderRadius: 2,
    backgroundColor: C.green,
    marginTop: 2,
    width: "90%",
  },

  title: { fontSize: 36, fontWeight: "800", color: C.dark, marginTop: 20 },
  subtitle: { fontSize: 16, color: C.muted, lineHeight: 24, marginTop: 8 },

  list: { marginTop: 24, gap: 16 },

  card: {
    borderRadius: 16,
    borderWidth: 1.5,
    paddingVertical: 24,
    paddingHorizontal: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  imagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  illusLeaf: { position: "absolute", right: 5, bottom: 6, opacity: 0.5 },

  cardBody: { flex: 1 },
  badgeText: { fontSize: 12, fontWeight: "800", marginBottom: 4 },
  cardTitle: { fontSize: 15, fontWeight: "800", lineHeight: 19, marginBottom: 4 },
  cardText: { fontSize: 12, color: C.muted, lineHeight: 16 },

  arrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});
