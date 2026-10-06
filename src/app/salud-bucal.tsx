import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  LayoutAnimation,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const COLORS = {
  bg: '#0A0F0C',
  card: '#151A16',
  cardAlt: '#1C231E',
  green: '#5AB84A',
  greenSoft: 'rgba(90, 184, 74, 0.12)',
  text: '#FFFFFF',
  textSoft: '#A8B4AA',
  warning: '#FF6B5B',
  warningSoft: 'rgba(255, 107, 91, 0.12)',
  amber: '#F5B942',
};

const SECCIONES = [
  {
    id: 1,
    icono: '🦷',
    titulo: 'Manchas y decoloración dental',
    problema:
      'La nicotina y el alquitrán del tabaco se adhieren al esmalte y hacen que tus dientes se vean amarillos o marrones.',
    consejos: [
      'Mantén una buena higiene oral todos los días.',
      'Usa dentífricos antimanchas si tu dentista te lo recomienda.',
      'Pide una profilaxis y pulido profesional para eliminar las manchas acumuladas.',
    ],
  },
  {
    id: 2,
    icono: '🪥',
    titulo: 'Caries dental',
    problema:
      'El tabaco puede favorecer la aparición de caries y hacer que tu boca sea más vulnerable.',
    consejos: [
      'Cepíllate diario con pasta dental con flúor.',
      'Limpia los espacios entre tus dientes con hilo o cepillos interdentales.',
      'Acude a revisiones periódicas.',
      'Pregunta por selladores de fosas y fisuras: protegen los surcos de los molares.',
      'Ciertos ionómeros de vidrio liberan flúor y ayudan a prevenir caries.',
    ],
  },
  {
    id: 3,
    icono: '🩸',
    titulo: 'Gingivitis y periodontitis',
    problema:
      'Las encías pueden inflamarse (gingivitis). Si no se atiende, puede avanzar a periodontitis y dañar los tejidos y el hueso que sostienen tus dientes.',
    consejos: [
      'Mantén una higiene constante y realiza profilaxis profesional.',
      'Si la enfermedad ya está avanzada, el dentista puede hacer un raspado y alisado radicular para limpiar a fondo las raíces.',
    ],
  },
  {
    id: 4,
    icono: '⚠️',
    titulo: 'Cáncer oral',
    problema:
      'El consumo de tabaco es un factor de riesgo importante para el cáncer oral. Detectarlo a tiempo hace una gran diferencia.',
    consejos: [
      'No ignores heridas, manchas o cambios de color que no desaparezcan.',
      'Las revisiones con tu dentista permiten detectar alteraciones de forma temprana.',
      'Tras un tratamiento, existen restauraciones y prótesis que ayudan a recuperar funciones como hablar y masticar.',
    ],
    critico: true,
  },
];

function TarjetaSeccion({ item, abierta, onPress }: { item: any; abierta: boolean; onPress: () => void }) {
  const color = item.critico ? COLORS.warning : COLORS.green;
  const colorSuave = item.critico ? COLORS.warningSoft : COLORS.greenSoft;

  return (
    <View style={[styles.card, item.critico && { borderColor: COLORS.warning }]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.cardHeader}
      >
        <View style={[styles.iconBox, { backgroundColor: colorSuave }]}>
          <Text style={styles.iconEmoji}>{item.icono}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.cardNumber, { color }]}>0{item.id}</Text>
          <Text style={styles.cardTitle}>{item.titulo}</Text>
        </View>
        <View style={[styles.chevronBox, { backgroundColor: colorSuave }]}>
          <Text style={[styles.chevron, { color }]}>{abierta ? '−' : '+'}</Text>
        </View>
      </TouchableOpacity>

      {abierta && (
        <View style={styles.cardBody}>
          <Text style={styles.problema}>{item.problema}</Text>

          <Text style={[styles.subtitulo, { color }]}>Qué puedes hacer</Text>
          {item.consejos.map((c: string, i: number) => (
            <View key={i} style={styles.consejoRow}>
              <View style={[styles.dot, { backgroundColor: color }]} />
              <Text style={styles.consejoTexto}>{c}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

export default function SaludBucalTabacoScreen() {
  const [abierta, setAbierta] = useState<number | null>(1);

  const toggle = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAbierta(abierta === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>


        {/* Hero */}
        <LinearGradient
          colors={[COLORS.card, COLORS.cardAlt]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>SALUD BUCAL</Text>
          </View>
          <Text style={styles.heroEmoji}>🚭</Text>
          <Text style={styles.heroTitle}>¿Sabías que el tabaco también afecta tu boca?</Text>
          <Text style={styles.heroSub}>
            Fumar puede causar problemas en dientes, encías y tejidos de la boca. La buena noticia:
            con prevención y revisiones periódicas puedes detectarlos a tiempo.
          </Text>
        </LinearGradient>

        {/* Stats rápidas */}
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>problemas frecuentes</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>2×</Text>
            <Text style={styles.statLabel}>visita al dentista al año</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>100%</Text>
            <Text style={styles.statLabel}>prevenible con hábitos</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Presta atención si has notado…</Text>

        {SECCIONES.map((item) => (
          <TarjetaSeccion
            key={item.id}
            item={item}
            abierta={abierta === item.id}
            onPress={() => toggle(item.id)}
          />
        ))}

        {/* Recordatorio final */}
        <LinearGradient
          colors={[COLORS.green, '#4A9038']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.reminder}
        >
          <Text style={styles.reminderEmoji}>💚</Text>
          <Text style={styles.reminderTitle}>Recuerda</Text>
          <Text style={styles.reminderText}>
            Cuidar tu boca no es solo tratar los problemas cuando aparecen: la prevención es
            fundamental. Visita a tu dentista periódicamente, más aún si consumes tabaco, y
            considera reducirlo o dejarlo. Tu sonrisa lo agradecerá.
          </Text>
        </LinearGradient>

        <Text style={styles.disclaimer}>
          Esta información es educativa y no sustituye la valoración de un profesional de la salud.
        </Text>

        {/* Botón atrás */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={20} color={COLORS.green} />
          <Text style={styles.backText}>Atrás</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { padding: 16, paddingTop: 50, paddingBottom: 36 },

  hero: {
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.greenSoft,
    shadowColor: COLORS.green,
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  heroBadge: {
    backgroundColor: COLORS.greenSoft,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 18,
    marginBottom: 12,
  },
  heroBadgeText: { color: COLORS.green, fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
  heroEmoji: { fontSize: 52, marginBottom: 10 },
  heroTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 28,
  },
  heroSub: {
    color: COLORS.textSoft,
    fontSize: 13.5,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 10,
  },

  statsRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
  stat: {
    flex: 1,
    backgroundColor: COLORS.cardAlt,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  statNumber: { color: COLORS.green, fontSize: 20, fontWeight: '800' },
  statLabel: { color: COLORS.textSoft, fontSize: 10, textAlign: 'center', marginTop: 5 },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '700',
    marginTop: 24,
    marginBottom: 12,
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: { fontSize: 22 },
  cardNumber: { fontSize: 12, fontWeight: '800', letterSpacing: 1 },
  cardTitle: { color: COLORS.text, fontSize: 15, fontWeight: '700', marginTop: 2 },
  chevronBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevron: { fontSize: 24, fontWeight: '300' },

  cardBody: { paddingHorizontal: 14, paddingBottom: 16 },
  problema: { color: COLORS.textSoft, fontSize: 13.5, lineHeight: 20, marginBottom: 12 },
  subtitulo: {
    fontSize: 11.5,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  consejoRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8, gap: 10 },
  dot: { width: 6, height: 6, borderRadius: 3, marginTop: 7 },
  consejoTexto: { flex: 1, color: COLORS.text, fontSize: 13.5, lineHeight: 20 },

  reminder: {
    borderRadius: 20,
    padding: 18,
    marginTop: 16,
    alignItems: 'center',
    shadowColor: COLORS.green,
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  reminderEmoji: { fontSize: 32 },
  reminderTitle: { color: '#fff', fontSize: 18, fontWeight: '800', marginTop: 6 },
  reminderText: {
    color: 'rgba(255,255,255,0.95)',
    fontSize: 13.5,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 8,
  },

  disclaimer: {
    color: COLORS.textSoft,
    fontSize: 11,
    textAlign: 'center',
    marginTop: 16,
    opacity: 0.6,
  },
  backButton: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: COLORS.green,
    backgroundColor: COLORS.card,
    gap: 8,
  },
  backText: { fontSize: 16, fontWeight: '700', color: COLORS.green },
});
