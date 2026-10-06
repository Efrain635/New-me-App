import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
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
  bg: "#F4F9F6",
  dark: "#0F3D3E",
  green: "#3E8E4F",
  greenDeep: "#1F6B45",
  text: "#1F2D2E",
  muted: "#6B7C7A",
  white: "#FFFFFF",
};

/* ---------- Componentes pequeños ---------- */

function StatCard({ icon, tint, bg, label, value, sub, progress }) {
  return (
    <View style={[styles.statCard, { backgroundColor: bg }]}>
      <View style={[styles.statIcon, { backgroundColor: tint + "22" }]}>
        <Ionicons name={icon} size={22} color={tint} />
      </View>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
      {progress != null ? (
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${progress}%`, backgroundColor: tint },
            ]}
          />
        </View>
      ) : null}
      <Text style={styles.statSub}>{sub}</Text>
    </View>
  );
}

/* ---------- Pantalla ---------- */

export default function HomeScreen() {
  const params = useLocalSearchParams();
  const [totalCigarettes, setTotalCigarettes] = useState(params.totalCigarettes ? parseInt(params.totalCigarettes as string) : 0);
  const [daysWithoutSmoking, setDaysWithoutSmoking] = useState(params.daysWithoutSmoking ? parseInt(params.daysWithoutSmoking as string) : 0);
  const [showNotifications, setShowNotifications] = useState(false);

  // Actualizar cuando recibimos nuevos params de smokedtoday
  useEffect(() => {
    if (params.totalCigarettes) {
      setTotalCigarettes(parseInt(params.totalCigarettes as string));
    }
    if (params.daysWithoutSmoking) {
      setDaysWithoutSmoking(parseInt(params.daysWithoutSmoking as string));
    }
  }, [params.totalCigarettes, params.daysWithoutSmoking]);

  const notifications = [
    { id: 1, title: "¡Felicidades!", message: "Has completado 3 días sin fumar 🎉", time: "Hace 2h" },
    { id: 2, title: "Recordatorio", message: "No olvides registrar tu progreso diario", time: "Hace 5h" },
    { id: 3, title: "Consejo del día", message: "Bebe agua para reducir las ganas de fumar", time: "Ayer" },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
        <View style={styles.scroll}>
          {/* Botón de notificación */}
          <View style={styles.notificationRow}>
            <TouchableOpacity style={styles.notificationBtn} onPress={() => setShowNotifications(!showNotifications)}>
              <Ionicons name="notifications-outline" size={32} color={C.dark} />
              <View style={styles.notificationDot} />
            </TouchableOpacity>

            {/* Nube flotante de notificaciones */}
            {showNotifications && (
              <View style={styles.notificationCloud}>
                <View style={styles.cloudHeader}>
                  <Text style={styles.cloudTitle}>Notificaciones</Text>
                  <TouchableOpacity onPress={() => setShowNotifications(false)}>
                    <Ionicons name="close" size={20} color={C.dark} />
                  </TouchableOpacity>
                </View>
                {notifications.map((notif) => (
                  <View key={notif.id} style={styles.notificationItem}>
                    <View style={styles.notificationItemDot} />
                    <View style={styles.notificationItemContent}>
                      <Text style={styles.notificationItemTitle}>{notif.title}</Text>
                      <Text style={styles.notificationItemMessage}>{notif.message}</Text>
                      <Text style={styles.notificationItemTime}>{notif.time}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Banner */}
          <LinearGradient
            colors={["#D6EDE0", "#CFE6F5"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.banner, { marginTop: 30 }]}
          >
            <View style={{ flex: 1, paddingRight: 8 }}>
              <Text style={styles.bannerTitle}>¡Vas muy bien! 💚</Text>
              <Text style={styles.bannerText}>
                Cada día es un paso más hacia una mejor versión de ti.
              </Text>
            </View>
            <Image
              source={require("../Imagen/feliz.png")}
              style={styles.bannerSun}
            />
          </LinearGradient>

          {/* Estadísticas */}
          <View style={styles.statsGrid}>
            <StatCard
              icon="ban-outline"
              tint="#E0645C"
              bg="#FFF3F2"
              label="Total cigarrillos"
              value={totalCigarettes.toString()}
              sub="acumulados"
            />
            <StatCard
              icon="calendar-outline"
              tint={C.green}
              bg="#EEF8F1"
              label="Días sin fumar"
              value={daysWithoutSmoking.toString()}
              sub="días seguidos"
            />
          </View>

          {/* Botón principal */}
          <TouchableOpacity 
            activeOpacity={0.9} 
            style={{ marginTop: 18 }} 
            onPress={() => router.push({
              pathname: "/smokedtoday",
              params: {
                totalCigarettes: totalCigarettes.toString(),
                daysWithoutSmoking: daysWithoutSmoking.toString()
              }
            })}
          >
            <LinearGradient
              colors={["#4C9A5F", "#2F7D4F"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.mainBtn}
            >
              <Feather name="edit-3" size={22} color={C.white} />
              <Text style={styles.mainBtnText}>Registrar mi día</Text>
              <Feather name="arrow-right" size={22} color={C.white} />
            </LinearGradient>
          </TouchableOpacity>

          {/* Botón Componente educativos */}
          <TouchableOpacity activeOpacity={0.9} style={styles.eduCard} onPress={() => router.push("/componentes")}>
            <View style={[styles.eduIcon, { backgroundColor: "#C9E3F7" }]}>
              <Ionicons name="book-outline" size={22} color="#3B8BD4" />
            </View>
            <Text style={styles.eduLabel}>Componente educativos</Text>
            <Text style={styles.eduValue}>Ver</Text>
            <Text style={styles.eduSub}>Recursos</Text>
          </TouchableOpacity>

          {/* Frase motivacional */}
          <View style={styles.quote}>
            <Ionicons name="heart" size={22} color={C.green} />
            <Text style={styles.quoteText}>
              "No se trata de ser perfecto, se trata de no rendirse."
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

/* ---------- Estilos ---------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  scroll: { paddingHorizontal: 20, paddingBottom: 130, paddingTop: 10 },

  notificationRow: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },
  notificationBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: C.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  notificationDot: {
    position: "absolute",
    top: 10,
    right: 11,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#E5484D",
    borderWidth: 2,
    borderColor: C.white,
  },
  notificationCloud: {
    position: "absolute",
    top: 60,
    right: 0,
    width: 280,
    backgroundColor: C.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  cloudHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  cloudTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: C.dark,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  notificationItemDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.green,
    marginTop: 6,
    marginRight: 10,
  },
  notificationItemContent: {
    flex: 1,
  },
  notificationItemTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: C.dark,
    marginBottom: 2,
  },
  notificationItemMessage: {
    fontSize: 12,
    color: C.muted,
    lineHeight: 16,
    marginBottom: 2,
  },
  notificationItemTime: {
    fontSize: 10,
    color: "#9CA3AF",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 16,
  },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  logoText: { fontSize: 30, fontWeight: "800", color: C.dark },
  logoItalic: { fontStyle: "italic", color: C.green },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 12 },
  bellBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: C.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  bellDot: {
    position: "absolute",
    top: 10,
    right: 11,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#E5484D",
    borderWidth: 2,
    borderColor: C.white,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: C.greenDeep,
    alignItems: "center",
    justifyContent: "center",
  },

  banner: {
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    minHeight: 130,
  },
  bannerTitle: { fontSize: 24, fontWeight: "800", color: C.dark },
  bannerText: { marginTop: 6, fontSize: 15, lineHeight: 22, color: C.text },
  bannerSun: { width: 84, height: 84, resizeMode: "contain", opacity: 0.9 },

  statsGrid: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
    justifyContent: "space-between",
  },
  statCard: {
    width: "48%",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  statIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  statLabel: { fontSize: 13, color: C.muted, fontWeight: "600" },
  statValue: { fontSize: 32, fontWeight: "800", color: C.dark, marginTop: 2 },
  statSub: { fontSize: 12, color: C.muted, marginTop: 2 },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E4DFF8",
    marginTop: 6,
    overflow: "hidden",
  },
  progressFill: { height: 8, borderRadius: 4 },

  mainBtn: {
    height: 62,
    borderRadius: 31,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    shadowColor: "#2F7D4F",
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  mainBtnText: { color: C.white, fontSize: 20, fontWeight: "700" },

  eduCard: {
    backgroundColor: "#E8F3FC",
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  eduIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  eduLabel: {
    fontSize: 13,
    color: "#6B7C7A",
    fontWeight: "600",
  },
  eduValue: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0F3D3E",
    marginTop: 2,
  },
  eduSub: {
    fontSize: 12,
    color: "#6B7C7A",
    marginTop: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: C.dark,
    marginTop: 26,
    marginBottom: 12,
  },

  quote: {
    marginTop: 22,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#E6F3EA",
    borderRadius: 20,
    padding: 18,
  },
  quoteText: {
    flex: 1,
    fontSize: 15,
    fontStyle: "italic",
    color: C.greenDeep,
    lineHeight: 22,
  },

  tabBar: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 24,
    height: 70,
    borderRadius: 35,
    backgroundColor: C.greenDeep,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    shadowColor: "#0F3D3E",
    shadowOpacity: 0.3,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  tabItem: {
    height: 48,
    minWidth: 48,
    paddingHorizontal: 14,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  tabItemActive: { backgroundColor: "#3E8E4F" },
  tabLabel: { color: C.white, fontWeight: "700", fontSize: 14 },
});
