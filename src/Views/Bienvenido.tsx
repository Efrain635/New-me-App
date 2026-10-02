import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen({ navigation }) {
  return (
    <LinearGradient
      colors={["#CFE6F5", "#EAF3F3", "#FAFCFB"]}
      locations={[0, 0.45, 1]}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safe}>
        {/* Logo */}
        <View style={styles.logoRow}>
          <Ionicons name="leaf" size={46} color="#2F7D4F" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.logoText}>
              New <Text style={styles.logoItalic}>me</Text>
            </Text>
            <View style={styles.logoUnderline} />
          </View>
        </View>

        {/* Título */}
        <View style={styles.textBlock}>
          <Text style={styles.title}>¡Te damos la{"\n"}bienvenida a</Text>
          <Text style={styles.titleGreen}>New me!</Text>
          <Text style={styles.subtitle}>
            Tu camino hacia una vida libre{"\n"}de humo comienza aquí.
          </Text>
        </View>

        {/* Botón */}
        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.85}
            onPress={() => navigation?.navigate("Onboarding")}
          >
            <Text style={styles.buttonText}>Empezar</Text>
            <Feather name="arrow-right" size={22} color="#fff" style={{ marginLeft: 10 }} />
          </TouchableOpacity>
        </View>

        {/* Hojas decorativas */}
        <Ionicons
          name="leaf"
          size={120}
          color="#7FAE8F"
          style={[styles.leaf, { right: -10, bottom: -10, transform: [{ rotate: "-20deg" }] }]}
        />
        <Ionicons
          name="leaf"
          size={70}
          color="#9BC2A8"
          style={[styles.leaf, { right: 70, bottom: 10, transform: [{ rotate: "15deg" }] }]}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1, paddingHorizontal: 24 },

  logoRow: { flexDirection: "row", alignItems: "center", marginTop: 24 },
  logoText: { fontSize: 38, fontWeight: "800", color: "#0F3D3E" },
  logoItalic: { fontStyle: "italic", color: "#3E8E4F", fontWeight: "700" },
  logoUnderline: {
    height: 3,
    borderRadius: 2,
    backgroundColor: "#3E8E4F",
    marginTop: 2,
    width: "90%",
  },

  textBlock: { marginTop: 40 },
  title: { fontSize: 34, fontWeight: "800", color: "#0F3D3E", lineHeight: 42 },
  titleGreen: { fontSize: 38, fontWeight: "800", color: "#3E8E4F", lineHeight: 46 },
  subtitle: { marginTop: 14, fontSize: 18, color: "#4A5568", lineHeight: 28 },

  bottom: { marginTop: 40 },
  button: {
    height: 66,
    borderRadius: 33,
    backgroundColor: "#4C8F5A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2F7D4F",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  buttonText: { color: "#fff", fontSize: 22, fontWeight: "700" },

  leaf: { position: "absolute", opacity: 0.6 },
});
