import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNotesStore } from '../../store/notesStore';
import IdeaCard from '../../components/items/IdeaCard';
import { Colors, Spacing } from '../../constants/theme';

export default function IdeasScreen() {
  const ideas = useNotesStore((state) => state.ideas);

  return (
    <View style={styles.container}>
      <FlatList
        data={ideas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <IdeaCard idea={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  list: { padding: Spacing.md },
});