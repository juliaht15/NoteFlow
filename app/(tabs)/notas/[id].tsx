import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Headline, Paragraph, IconButton, Card } from 'react-native-paper';
import { useNotesStore } from '../../../store/notesStore';
import { Colors } from '../../../constants/theme';

export default function DetalleNota() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const note = useNotesStore((state) => state.notes.find((n) => n.id === id));

  if (!note) {
    return (
      <View style={styles.container}>
        <Text>Nota no encontrada</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Detalle</Text>
      </View>
      
      <Card style={styles.card}>
        <Card.Content>
          <Headline style={styles.title}>{note.title}</Headline>
          <Text style={styles.category}>{note.category.toUpperCase()}</Text>
          <View style={styles.divider} />
          <Paragraph style={styles.content}>{note.content}</Paragraph>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 10 },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
  card: { marginTop: 20, borderRadius: 16, backgroundColor: Colors.surface, elevation: 2 },
  title: { fontWeight: 'bold', color: Colors.text },
  category: { color: Colors.primary, fontWeight: '700', marginBottom: 15, fontSize: 12 },
  divider: { height: 1, backgroundColor: Colors.border, marginBottom: 15 },
  content: { fontSize: 16, lineHeight: 24, color: '#374151' }
});