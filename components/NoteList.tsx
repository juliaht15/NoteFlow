import React, { useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import { Searchbar, useTheme } from 'react-native-paper';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SwipeableNoteCard } from './SwipeableNoteCard';
import { AnyNote } from '@/types';

interface NoteListProps {
  data: AnyNote[];
}

export const NoteList = ({ data }: NoteListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();

  const filteredNotes = useMemo(() => {
    return data.filter((note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Searchbar
        placeholder="Buscar notas..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />
      <FlashList
  data={filteredNotes}
  keyExtractor={(item) => item.id}
  renderItem={({ item, index }: { item: AnyNote; index: number }) => (
    <Animated.View entering={FadeInDown.delay(index * 100)}>
      <SwipeableNoteCard note={item} />
    </Animated.View>
  )}
  estimatedItemSize={100}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchbar: { margin: 16 }
});