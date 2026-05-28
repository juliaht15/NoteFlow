import React, { useState } from 'react';
import { View, StyleSheet, useColorScheme, Pressable } from 'react-native';
import { Text, Searchbar } from 'react-native-paper';
import { FlashList as ShopifyFlashList } from '@shopify/flash-list';
import Animated, { FadeInDown, FadeOutLeft } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useNotesStore } from '../../store/notesStore';
import NoteCard from '../../components/items/NoteCard';
import { isNote } from '../../types';
import { Colors, Spacing, BorderRadius } from '../../constants/theme';

// Forzamos el tipado dinámico para eliminar el error de estimatedItemSize
const FlashList = ShopifyFlashList as any;

export default function NotesScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const currentTheme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const notes = useNotesStore((state) => state.notes);
  const [searchQuery, setSearchQuery] = useState('');

  const pureNotes = notes.filter(isNote);

  const filteredNotes = pureNotes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Text style={[styles.headerTitle, { color: currentTheme.text }]}>
        Mis Notas
      </Text>

      <Searchbar
        placeholder="Buscar notas..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={[styles.searchBar, { backgroundColor: colorScheme === 'dark' ? '#1C1C1E' : '#F2F2F7' }]}
        inputStyle={{ color: currentTheme.text, minHeight: 0 }}
        placeholderTextColor={currentTheme.textSecondary}
        iconColor={currentTheme.textSecondary}
        rippleColor="transparent"
        mode="bar"
        elevation={0}
      />

      <View style={{ flex: 1, minHeight: 1 }}>
        <FlashList
          data={filteredNotes}
          keyExtractor={(item: any) => item.id}
          estimatedItemSize={72}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }: any) => (
            <Animated.View
              entering={FadeInDown.delay(index * 40).duration(300)}
              exiting={FadeOutLeft.duration(200)}
            >
              <NoteCard 
                note={item} 
                onPress={() => router.push(`/(tabs)/${item.id}`)} 
              />
            </Animated.View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={{ color: currentTheme.textSecondary, fontSize: 14 }}>
                {searchQuery ? 'No se encontraron notas' : 'No hay notas creadas'}
              </Text>
            </View>
          }
        />
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.fabButton,
          { backgroundColor: currentTheme.primary },
          pressed && { opacity: 0.85 }
        ]}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          router.push('/nueva-nota');
        }}
      >
        <Text style={styles.fabIcon}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20 },
  headerTitle: { fontSize: 28, fontWeight: '700', marginHorizontal: Spacing.lg, marginBottom: Spacing.sm, letterSpacing: -0.5 },
  searchBar: { marginHorizontal: Spacing.lg, marginBottom: Spacing.md, borderRadius: BorderRadius.md, height: 40 },
  listContent: { paddingBottom: 100 },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 60 },
  fabButton: { position: 'absolute', right: Spacing.lg, bottom: Spacing.xl, width: 52, height: 52, borderRadius: BorderRadius.round, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 3 },
  fabIcon: { color: '#FFFFFF', fontSize: 26, fontWeight: '300', marginTop: -2 }
});