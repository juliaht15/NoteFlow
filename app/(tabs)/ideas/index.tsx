import React, { useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar } from 'react-native-paper';
import { useNotesStore } from '../../../store/useNoteStore';
import { useTheme } from '../../../constants/theme';
import { NoteList } from '../../../components/NoteList';

export default function IdeasScreen() {
  const { colors, spacing } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  
  const allNotes = useNotesStore((state) => state.notes);

  const filteredIdeas = useMemo(() => {
    const queryLower = searchQuery.toLowerCase();
    return allNotes.filter((n) => {
      if (n.type !== 'idea') return false;
      
      const coincideTitulo = (n.title || '').toLowerCase().includes(queryLower);
      const coincideDesc = (n.content || '').toLowerCase().includes(queryLower);
      const tagsArray = (n as any).tags || [];
      const coincideEtiqueta = tagsArray.some((tag: string) => tag.toLowerCase().includes(queryLower));
      
      return coincideTitulo || coincideDesc || coincideEtiqueta;
    });
  }, [allNotes, searchQuery]);

  const bgStyle = (colors as any).background || colors.surface || '#121212';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bgStyle }]} edges={['top', 'left', 'right']}>
      <View style={[styles.container, { paddingHorizontal: spacing.md }]}>
        
        <Searchbar
          placeholder="Buscar por título o etiqueta..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={[styles.searchbar, { backgroundColor: colors.surface }]}
          iconColor={colors.secondaryText}
          theme={{ colors: { primary: colors.primary } }}
        />

        <NoteList data={filteredIdeas} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, paddingTop: 10 },
  searchbar: { marginBottom: 16, borderRadius: 12, height: 48 },
});