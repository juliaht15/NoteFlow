import { View, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { NoteList } from '@/components/NoteList';
import { useNotesStore } from '@/store/useNoteStore';
import { useTheme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function IdeasScreen() {
  const { colors, spacing } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  
  const notes = useNotesStore((state) => state.notes);
  const ideas = notes.filter((n) => n.type === 'idea');

  const filteredIdeas = ideas.filter((idea) => {
    const matchesTitle = idea.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = 'tags' in idea && idea.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTitle || matchesTags;
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.surface === '#ffffff' ? '#f3f2f1' : '#11100f' }]}>
      <View style={[styles.searchContainer, { backgroundColor: colors.surface, borderColor: colors.border, margin: spacing.md }]}>
        <Ionicons name="search" size={18} color={colors.secondaryText} style={styles.searchIcon} />
        <TextInput
          placeholder="Buscar ideas o etiquetas..."
          placeholderTextColor={colors.secondaryText}
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={[styles.searchInput, { color: colors.text }]}
        />
      </View>

      <NoteList data={filteredIdeas} />
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