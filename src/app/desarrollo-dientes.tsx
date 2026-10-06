import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const C = {
  bg: '#F5F9F6',
  card: '#FFFFFF',
  cardTint: '#F1F8F3',
  border: '#D4E8D7',
  green: '#1E8449',
  greenDark: '#145A32',
  greenMid: '#27AE60',
  greenSoft: '#E8F8F0',
  text: '#1C2820',
  textSoft: '#4A5F52',
  red: '#C0392B',
  redSoft: '#FADBD8',
  amberSoft: '#FEF9E7',
  blueSoft: '#EBF5FB',
  pinkSoft: '#F5EEF8',
  purpleSoft: '#F4ECF7',
  accent: '#5DADE2',
};

const ETAPAS = [
  {
    icono: '👶',
    fondo: C.pinkSoft,
    titulo: 'Formación de los dientes',
    texto:
      'Se desarrollan el esmalte, la dentina, la raíz y los tejidos que los sostienen. Todo esto empieza desde la vida intrauterina.',
  },
  {
    icono: '✨',
    fondo: C.blueSoft,
    titulo: 'Esmalte fuerte',
    texto:
      'Es la capa que protege tus dientes. Se forma durante el desarrollo y ayuda a resistir el desgaste.',
  },
  {
    icono: '🦷',
    fondo: C.amberSoft,
    titulo: 'Dentina',
    texto:
      'Está debajo del esmalte y forma gran parte del diente. Si queda expuesta, puede aumentar la sensibilidad y facilitar el daño.',
  },
  {
    icono: '🌱',
    fondo: C.blueSoft,
    titulo: 'Formación de la raíz',
    texto:
      'La raíz ayuda a mantener el diente firme y unido a los tejidos que lo sostienen.',
  },
  {
    icono: '🛡️',
    fondo: C.pinkSoft,
    titulo: 'Tejidos de soporte',
    texto:
      'Las encías, el hueso y los tejidos que rodean el diente lo mantienen estable dentro de la boca.',
  },
];

const EFECTOS_TABACO = [
  {
    icono: '🩸',
    fondo: C.pinkSoft,
    titulo: 'Daña tus encías',
    texto:
      'Reduce la circulación de la sangre y puede causar inflamación y enfermedades de las encías.',
  },
  {
    icono: '🪥',
    fondo: C.blueSoft,
    titulo: 'Debilita el soporte dental',
    texto:
      'Puede afectar los tejidos y el hueso que mantienen los dientes en su lugar, aumentando el riesgo de movilidad y pérdida dental.',
  },
  {
    icono: '👄',
    fondo: C.pinkSoft,
    titulo: 'Provoca boca seca',
    texto:
      'Disminuye la saliva, que protege la boca. Esto puede favorecer las caries y el mal aliento.',
  },
  {
    icono: '👅',
    fondo: C.amberSoft,
    titulo: 'Afecta la lengua y el gusto',
    texto:
      'Puede causar cambios en la lengua y disminuir la capacidad de percibir correctamente los sabores.',
  },
  {
    icono: '⏱️',
    fondo: C.greenSoft,
    titulo: 'Dificulta la recuperación',
    texto:
      'Los tejidos de la boca tardan más en sanar después de una lesión o procedimiento.',
  },
  {
    icono: '⚠️',
    fondo: C.redSoft,
    titulo: 'Aumenta el riesgo de cáncer oral',
    texto:
      'Las sustancias del tabaco pueden dañar las células de la boca y provocar lesiones y cáncer oral.',
  },
];

function EncabezadoSeccion({ icono, titulo, texto, colorIcono = C.green }: { icono: string; titulo: string; texto: string; colorIcono?: string }) {
  return (
    <View style={styles.sectionHeader}>
      <View style={[styles.sectionIcon, { backgroundColor: colorIcono }]}>
        <Text style={styles.sectionIconText}>{icono}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.sectionTitle}>{titulo}</Text>
        <Text style={styles.sectionText}>{texto}</Text>
      </View>
    </View>
  );
}

function FilaEtapa({ item }: { item: any }) {
  return (
    <View style={styles.row}>
      <View style={[styles.rowIcon, { backgroundColor: item.fondo }]}>
        <Text style={styles.rowIconText}>{item.icono}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowTitle}>{item.titulo}</Text>
        <Text style={styles.rowText}>{item.texto}</Text>
      </View>
    </View>
  );
}

function TarjetaEfecto({ item }: { item: any }) {
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

export default function DesarrolloDientesScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >


        {/* Sección 1: desarrollo de los dientes */}
        <View style={styles.block}>
          <EncabezadoSeccion
            icono="🦷"
            titulo="Desarrollo de tus dientes"
            texto="Tus dientes comienzan a formarse desde antes de nacer y pasan por varias etapas hasta llegar a su forma definitiva."
          />
          {ETAPAS.map((e) => (
            <FilaEtapa key={e.titulo} item={e} />
          ))}
        </View>

        {/* Sección 2: tabaco */}
        <View style={styles.block}>
          <EncabezadoSeccion
            icono="🚬"
            titulo="¿Qué hace el tabaco?"
            texto="El tabaco no solo mancha los dientes, también daña los tejidos de la boca y afecta todo el sistema estomatognático."
            colorIcono={C.greenDark}
          />
          <View style={styles.grid}>
            {EFECTOS_TABACO.map((e) => (
              <TarjetaEfecto key={e.titulo} item={e} />
            ))}
          </View>
        </View>

        {/* Cierre */}
        <View style={styles.closing}>
          <View style={styles.closingIcon}>
            <Text style={styles.closingIconText}>🍃</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.closingTitle}>Cuida tu boca hoy</Text>
            <Text style={styles.closingText}>
              Tus dientes ya están formados, pero necesitan cuidados para
              mantenerse fuertes. Reducir o dejar el tabaco ayuda a proteger
              tus dientes, encías y toda tu boca.
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
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
  },
  android: { elevation: 3 },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  scroll: { paddingHorizontal: 16, paddingTop: 56, paddingBottom: 44 },

  /* Top */
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: C.greenSoft,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: C.border,
  },

  /* Bloques */
  block: {
    backgroundColor: C.card,
    borderRadius: 20,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: C.border,
    ...shadow,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionIconText: { fontSize: 26 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: C.greenDark },
  sectionText: { fontSize: 12.5, color: C.textSoft, lineHeight: 18, marginTop: 2 },

  /* Filas */
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: C.border,
    gap: 12,
  },
  rowIcon: {
    width: 54,
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowIconText: { fontSize: 28 },
  rowTitle: { fontSize: 15, fontWeight: '700', color: C.text },
  rowText: { fontSize: 12.5, color: C.textSoft, lineHeight: 18, marginTop: 2 },

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
    width: 50,
    height: 50,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    alignSelf: 'center',
  },
  gridIconText: { fontSize: 26 },
  gridTitle: { fontSize: 14, fontWeight: '700', color: C.text, textAlign: 'center' },
  gridText: { fontSize: 11.5, color: C.textSoft, lineHeight: 16, marginTop: 4, textAlign: 'center' },

  /* Cierre */
  closing: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.greenDark,
    borderRadius: 20,
    padding: 16,
    gap: 14,
    ...shadow,
  },
  closingIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closingIconText: { fontSize: 26 },
  closingTitle: { color: '#fff', fontSize: 18, fontWeight: '800' },
  closingText: {
    color: 'rgba(255,255,255,0.95)',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
  },

  /* Botón */
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
    borderColor: C.green,
    backgroundColor: C.card,
    gap: 8,
    ...shadow,
  },
  backText: { fontSize: 16, fontWeight: '700', color: C.greenDark },

  footerNote: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: C.green,
    fontSize: 14,
    marginTop: 24,
  },
  disclaimer: {
    textAlign: 'center',
    fontSize: 11,
    color: C.textSoft,
    marginTop: 8,
    opacity: 0.75,
  },
});
