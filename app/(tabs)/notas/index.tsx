import { View, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { NoteList } from '@/components/NoteList';
import { useNotesStore } from '@/store/useNoteStore';
import { useTheme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function NotasScreen() {
  const { colors, spacing } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  
  const notes = useNotesStore((state) => state.notes);
  const noteItems = notes.filter((n) => n.type === 'note');

  const filteredNotes = noteItems.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ('content' in note && note.content?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.surface === '#ffffff' ? '#f3f2f1' : '#11100f' }]}>
      <View style={[styles.searchContainer, { backgroundColor: colors.surface, borderColor: colors.border, margin: spacing.md }]}>
        <Ionicons name="search" size={18} color={colors.secondaryText} style={styles.searchIcon} />
        <TextInput
          placeholder="Buscar notas..."
          placeholderTextColor={colors.secondaryText}
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={[styles.searchInput, { color: colors.text }]}
        />
      </View>

      <NoteList data={filteredNotes} />
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