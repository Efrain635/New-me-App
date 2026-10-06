import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

const C = {
  bg: '#EEF7F0',
  card: '#FFFFFF',
  cardTint: '#E3F1E6',
  border: '#D3E6D8',
  green: '#2F7D32',
  greenDark: '#1B5E20',
  greenMid: '#4C9A3A',
  greenSoft: '#DCEFDD',
  text: '#1F2D23',
  textSoft: '#5B6B60',
  red: '#E5534B',
  redSoft: '#FDE8E6',
  amberSoft: '#FFF3DC',
  amber: '#B7791F',
  blueSoft: '#E3F2FB',
  pinkSoft: '#FCE7EA',
};

const CAUSAS = [
  {
    icono: '🚬',
    fondo: C.amberSoft,
    titulo: 'Residuos del tabaco',
    texto:
      'El humo deja sustancias que se quedan en dientes, lengua y encías y generan un olor fuerte y persistente.',
  },
  {
    icono: '💧',
    fondo: C.blueSoft,
    titulo: 'Boca seca',
    texto:
      'El tabaco reduce la saliva. Sin ella, la boca no se limpia bien y las bacterias se multiplican.',
  },
  {
    icono: '🦠',
    fondo: C.pinkSoft,
    titulo: 'Bacterias en la lengua',
    texto:
      'Se acumulan sobre la lengua y liberan compuestos de mal olor, sobre todo cuando hay poca saliva.',
  },
  {
    icono: '🩸',
    fondo: C.redSoft,
    titulo: 'Problemas de encías',
    texto:
      'La inflamación y las enfermedades periodontales también producen mal aliento.',
  },
];

const CONSEJOS = [
  {
    titulo: 'Cepíllate después de cada comida',
    texto:
      'Usa pasta con flúor y cepilla también encías y mejillas por dentro.',
  },
  {
    titulo: 'Limpia tu lengua',
    texto:
      'Usa un limpiador de lengua o el propio cepillo, con suavidad, de atrás hacia adelante.',
  },
  {
    titulo: 'Usa hilo dental a diario',
    texto:
      'Elimina los restos de comida y la placa entre los dientes, donde el cepillo no llega.',
  },
  {
    titulo: 'Mantente hidratado',
    texto:
      'Toma agua durante el día para mantener la boca húmeda y arrastrar bacterias.',
  },
  {
    titulo: 'Estimula la saliva',
    texto:
      'Mastica chicle sin azúcar o come alimentos crujientes como manzana, zanahoria o pepino.',
  },
  {
    titulo: 'Cuida el enjuague',
    texto:
      'Elige enjuagues sin alcohol, ya que el alcohol puede resecar aún más la boca.',
  },
  {
    titulo: 'Reduce o deja el tabaco',
    texto:
      'Es el cambio que más ayuda: mejora la saliva, las encías y el olor de tu boca.',
  },
];

const SENALES = [
  'El mal aliento no mejora aunque te cepilles y uses hilo dental.',
  'Sientes la boca seca casi todo el día o te cuesta tragar y hablar.',
  'Tus encías sangran, duelen o están inflamadas.',
  'Notas heridas, manchas o cambios en la boca que no desaparecen.',
];

function TarjetaCausa({ item }: { item: any }) {
  return (
    <View style={styles.gridCard}>
      <View style={[styles.gridIcon, { backgroundColor: item.fondo }]}>
        <Text style={styles.gridIconText}>{item.icono}</Text>
      </View>
      <Text style={styles.gridTitle}>{item.titulo}</Text>
      <Text style={styles.gridText}>{item.texto}</Text>
    </View>
  );
}

function FilaConsejo({ item, numero, ultimo }: { item: any; numero: number; ultimo: boolean }) {
  return (
    <View style={[styles.row, !ultimo && styles.rowBorder]}>
      <View style={styles.numberBadge}>
        <Text style={styles.numberText}>{numero}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowTitle}>{item.titulo}</Text>
        <Text style={styles.rowText}>{item.texto}</Text>
      </View>
    </View>
  );
}

export default function SaludHalitosisScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Text style={styles.heroIconText}>😮‍💨</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.heroTitle}>El tabaco también causa halitosis</Text>
            <Text style={styles.heroText}>
              Provoca boca seca y mal aliento. Entender por qué pasa es el primer
              paso para prevenirlo.
            </Text>
          </View>
        </View>

        {/* Causas */}
        <View style={styles.block}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Text style={styles.sectionIconText}>🔍</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionTitle}>¿Por qué ocurre?</Text>
              <Text style={styles.sectionText}>
                El mal aliento rara vez viene de una sola causa. Con el tabaco,
                estas son las más comunes.
              </Text>
            </View>
          </View>
          <View style={styles.grid}>
            {CAUSAS.map((c) => (
              <TarjetaCausa key={c.titulo} item={c} />
            ))}
          </View>
        </View>

        {/* Dato destacado */}
        <View style={styles.fact}>
          <Text style={styles.factEmoji}>💡</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.factTitle}>¿Sabías que?</Text>
            <Text style={styles.factText}>
              La saliva es la defensa natural de tu boca: limpia, neutraliza
              ácidos y arrastra bacterias. Cuando hay poca, el mal aliento
              aparece con más facilidad.
            </Text>
          </View>
        </View>

        {/* Consejos */}
        <View style={styles.block}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: C.greenDark }]}>
              <Text style={styles.sectionIconText}>✅</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionTitle}>Consejos para mejorarlo</Text>
              <Text style={styles.sectionText}>
                Pequeños hábitos diarios que marcan la diferencia.
              </Text>
            </View>
          </View>
          {CONSEJOS.map((c, i) => (
            <FilaConsejo
              key={c.titulo}
              item={c}
              numero={i + 1}
              ultimo={i === CONSEJOS.length - 1}
            />
          ))}
        </View>

        {/* Cuándo ir al dentista */}
        <View style={styles.alert}>
          <View style={styles.alertHeader}>
            <Text style={styles.alertEmoji}>🩺</Text>
            <Text style={styles.alertTitle}>Visita a tu dentista si…</Text>
          </View>
          {SENALES.map((s) => (
            <View key={s} style={styles.alertRow}>
              <View style={styles.alertDot} />
              <Text style={styles.alertText}>{s}</Text>
            </View>
          ))}
        </View>

        {/* Cierre */}
        <View style={styles.closing}>
          <View style={styles.closingIcon}>
            <Text style={styles.closingIconText}>🍃</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.closingTitle}>Respira con confianza</Text>
            <Text style={styles.closingText}>
              Con buena higiene, hidratación y revisiones periódicas puedes
              mejorar tu aliento. Reducir o dejar el tabaco es el mejor aliado
              de tu boca.
            </Text>
          </View>
        </View>

        {/* Botón atrás */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={20} color={C.greenDark} />
          <Text style={styles.backText}>Atrás</Text>
        </TouchableOpacity>

        <Text style={styles.footerNote}>♡  Tu sonrisa importa</Text>
        <Text style={styles.disclaimer}>
          Información educativa. No sustituye la valoración de un profesional
          de la salud.
        </Text>
      </ScrollView>
    </View>
  );
}

const shadow = Platform.select({
  ios: {
    shadowColor: '#1B5E20',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  android: { elevation: 2 },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  scroll: { paddingHorizontal: 16, paddingTop: 50, paddingBottom: 40 },

  /* Hero */
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.card,
    borderRadius: 22,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: C.border,
    gap: 14,
    ...shadow,
  },
  heroIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: C.greenSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroIconText: { fontSize: 32 },
  heroTitle: { fontSize: 20, fontWeight: '800', color: C.greenDark, lineHeight: 25 },
  heroText: { fontSize: 13.5, color: C.textSoft, lineHeight: 19, marginTop: 4 },

  /* Bloques */
  block: {
    backgroundColor: C.card,
    borderRadius: 22,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: C.border,
    ...shadow,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.cardTint,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    gap: 12,
  },
  sectionIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: C.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionIconText: { fontSize: 24 },
  sectionTitle: { fontSize: 19, fontWeight: '800', color: C.greenDark },
  sectionText: { fontSize: 13, color: C.textSoft, lineHeight: 18, marginTop: 2 },

  /* Grid */
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8 },
  gridCard: {
    width: '47%',
    backgroundColor: C.bg,
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: C.border,
  },
  gridIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    alignSelf: 'center',
  },
  gridIconText: { fontSize: 24 },
  gridTitle: { fontSize: 14, fontWeight: '700', color: C.text, textAlign: 'center' },
  gridText: { fontSize: 12, color: C.textSoft, lineHeight: 17, marginTop: 4, textAlign: 'center' },

  /* Dato destacado */
  fact: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: C.amberSoft,
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#F3DFB3',
  },
  factEmoji: { fontSize: 28 },
  factTitle: { fontSize: 16, fontWeight: '800', color: C.amber },
  factText: { fontSize: 13.5, color: C.text, lineHeight: 20, marginTop: 3 },

  /* Consejos */
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 11, gap: 12 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: C.border },
  numberBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: C.greenSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: { fontSize: 15, fontWeight: '800', color: C.greenDark },
  rowTitle: { fontSize: 15, fontWeight: '700', color: C.text },
  rowText: { fontSize: 13, color: C.textSoft, lineHeight: 18, marginTop: 2 },

  /* Alerta */
  alert: {
    backgroundColor: C.redSoft,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F6C9C5',
  },
  alertHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  alertEmoji: { fontSize: 26 },
  alertTitle: { fontSize: 17, fontWeight: '800', color: C.red },
  alertRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 7 },
  alertDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: C.red,
    marginTop: 7,
  },
  alertText: { flex: 1, fontSize: 13.5, color: C.text, lineHeight: 20 },

  /* Cierre */
  closing: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.greenDark,
    borderRadius: 22,
    padding: 18,
    gap: 14,
    ...shadow,
  },
  closingIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closingIconText: { fontSize: 26 },
  closingTitle: { color: '#fff', fontSize: 19, fontWeight: '800' },
  closingText: {
    color: 'rgba(255,255,255,0.92)',
    fontSize: 13.5,
    lineHeight: 20,
    marginTop: 4,
  },

  /* Botón */
  backButton: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 34,
    paddingVertical: 14,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: C.green,
    backgroundColor: C.card,
    gap: 12,
  },
  backText: { fontSize: 17, fontWeight: '700', color: C.greenDark },

  footerNote: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: C.green,
    fontSize: 14,
    marginTop: 26,
  },
  disclaimer: {
    textAlign: 'center',
    fontSize: 11,
    color: C.textSoft,
    marginTop: 8,
    opacity: 0.8,
  },
});
