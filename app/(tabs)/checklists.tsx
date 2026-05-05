import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNotesStore } from '../../store/notesStore';
import ChecklistCard from '../../components/items/ChecklistCard';
import { Colors, Spacing } from '../../constants/theme';

export default function ChecklistsScreen() {
  const checklists = useNotesStore((state) => state.checklists);

  return (
    <View style={styles.container}>
      <FlatList
        data={checklists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChecklistCard checklist={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  list: { padding: Spacing.md },
});