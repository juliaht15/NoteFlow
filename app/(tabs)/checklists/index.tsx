import { View, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { FlashList } from "@shopify/flash-list";
import { useNotesStore } from '@/store/useNoteStore';
import { ChecklistNote } from '@/types';
import { SwipeableNoteCard } from '@/components/SwipeableNoteCard';
import { useTheme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function ChecklistsScreen() {
  const { colors, spacing } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  
  const notes = useNotesStore((state) => state.notes);
  const checklists = notes.filter((n): n is ChecklistNote => n.type === 'checklist');

  const filteredChecklists = checklists.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.surface === '#ffffff' ? '#f3f2f1' : '#11100f' }]}>
      <View style={[styles.searchContainer, { backgroundColor: colors.surface, borderColor: colors.border, margin: spacing.md }]}>
        <Ionicons name="search" size={18} color={colors.secondaryText} style={styles.searchIcon} />
        <TextInput
          placeholder="Buscar listas de tareas..."
          placeholderTextColor={colors.secondaryText}
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={[styles.searchInput, { color: colors.text }]}
        />
      </View>

      <FlashList
        data={filteredChecklists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: ChecklistNote }) => (
          <SwipeableNoteCard note={item} />
        )}
        estimatedItemSize={100}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 0,
  },
});