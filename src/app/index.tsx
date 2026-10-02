import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  return (
    <LinearGradient
      colors={["#CFE6F5", "#EAF3F3", "#FAFCFB"]}
      locations={[0, 0.45, 1]}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safe} edges={['left', 'right', 'bottom']}>
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
        <View style={styles.textBlock}>
          <View style={styles.titleRow}>
            <View style={styles.titleTextContainer}>
              <Text style={styles.title}>¡Te damos la bienvenida a</Text>
              <Text style={styles.titleGreen}>New me!</Text>
              <Text style={styles.subtitle} numberOfLines={1}>Como estudiantes de odontología.</Text>
              <Text style={styles.subtitle} numberOfLines={1}>Dirigimos esta app al público masculino</Text>
              <Text style={styles.subtitle} numberOfLines={1}>con el único objetivo de poder informales y </Text>
              <Text style={styles.subtitle} numberOfLines={1}>concientizarle sobre los efectos del tabaco en su salud bucal</Text>
            </View>
            <Image source={require("../Imagen/Dienteycigarrillo.png")} style={styles.welcomeImage} />
          </View>
        </View>

        {/* Botón */}
        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.85}
            onPress={() => router.push("/home")}
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
  logoImage: { width: 70, height: 70, resizeMode: "contain" },
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
  titleRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", position: "relative" },
  titleTextContainer: { flex: 1, maxWidth: "100%" },
  title: { fontSize: 40, fontWeight: "800", color: "#0F3D3E", lineHeight: 48 },
  titleGreen: { fontSize: 42, fontWeight: "800", color: "#3E8E4F", lineHeight: 50 },
  subtitle: { marginTop: 4, fontSize: 15, color: "#4A5568", lineHeight: 23 },
  textLineContainer: { marginBottom: 8 },
  textLine: { height: 2, backgroundColor: "#4A5568", opacity: 0.3, marginTop: 4 },
  welcomeImage: { width: 280, height: 280, resizeMode: "contain", position: "absolute", right: -70, top: -80 },

  bottom: { marginTop: 120, alignItems: "center" },
  button: {
    height: 75,
    width: "85%",
    borderRadius: 37,
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
  buttonText: { color: "#fff", fontSize: 24, fontWeight: "700" },

  leaf: { position: "absolute", opacity: 0.6 },
});
