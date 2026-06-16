// E:\Proyectos\noteflow\app\(tabs)\checklists\index.tsx
import { View, StyleSheet } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import { useNotesStore } from '@/store/useNoteStore';
import { ChecklistNote } from '@/types'; // Asegúrate de importar el tipo
import { SwipeableNoteCard } from '@/components/SwipeableNoteCard';

export default function ChecklistsScreen() {
  const notes = useNotesStore((state) => state.notes);
  
  // Filtramos solo las checklists
  const checklists = notes.filter((n): n is ChecklistNote => n.type === 'checklist');

  return (
    <View style={styles.container}>
      <FlashList
  data={checklists}
  keyExtractor={(item) => item.id}
  renderItem={({ item }: { item: ChecklistNote }) => (
    <SwipeableNoteCard note={item} />
  )}
  estimatedItemSize={100}
      />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });