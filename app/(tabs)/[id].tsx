import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, useColorScheme, Pressable } from 'react-native';
import { Text, IconButton, TextInput, Divider } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useNotesStore } from '../../store/notesStore';
import { Colors, Spacing, BorderRadius, Layout } from '../../constants/theme';
import { isChecklistNote, isIdeaNote, isNote } from '../../types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const currentTheme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const notes = useNotesStore((state) => state.notes);
  const updateNote = useNotesStore((state) => state.updateNote);
  const toggleChecklistItem = useNotesStore((state) => state.toggleChecklistItem);

  const item = notes.find(n => n.id === id);

  const [title, setTitle] = useState(item?.title || '');
  const [content, setContent] = useState('');
  const [newItemText, setNewItemText] = useState('');

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      if (isNote(item)) {
        setContent(item.content);
      }
    }
  }, [item?.id]);

  useEffect(() => {
    if (!item) return;

    const delay = setTimeout(() => {
      const hasTitleChanged = title !== item.title;
      let hasContentChanged = false;

      if (isNote(item) && content !== item.content) {
        hasContentChanged = true;
      }

      if (hasTitleChanged || hasContentChanged) {
        const updates: any = { title };
        if (isNote(item)) {
          updates.content = content;
        }
        updateNote(id as string, updates as any);
      }
    }, 800);

    return () => clearTimeout(delay);
  }, [title, content]);

  if (!item) {
    return (
      <View style={[styles.container, styles.center, { backgroundColor: currentTheme.background }]}>
        <Text style={{ color: currentTheme.textSecondary }}>Elemento no encontrado</Text>
      </View>
    );
  }

  const handleAddItem = () => {
    if (newItemText.trim() && isChecklistNote(item)) {
      const updatedItems = [
        ...item.items,
        { id: Date.now().toString(), text: newItemText.trim(), isCompleted: false }
      ];
      updateNote(id as string, { items: updatedItems } as any);
      setNewItemText('');
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
      style={[styles.container, { backgroundColor: currentTheme.background }]}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
    >
      <View style={[styles.header, { borderBottomColor: currentTheme.border }]}>
        <IconButton 
          icon="arrow-left" 
          onPress={() => router.back()} 
          iconColor={currentTheme.primary}
          style={styles.backButton}
        />
        <TextInput 
          value={title} 
          onChangeText={setTitle} 
          placeholder={isIdeaNote(item) ? "Pensamiento rápido..." : "Título"} 
          mode="flat" 
          style={[styles.titleInput, { color: currentTheme.text }]} 
          underlineColor="transparent" 
          activeUnderlineColor="transparent"
          textColor={currentTheme.text}
          placeholderTextColor={currentTheme.textSecondary}
        />
      </View>

      <ScrollView 
        style={styles.content} 
        keyboardShouldPersistTaps="handled" 
        contentContainerStyle={styles.scrollContainer}
      >
        {isChecklistNote(item) ? (
          <View>
            {item.items.map((check) => (
              <View key={check.id} style={styles.checkRow}>
                <Pressable
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    toggleChecklistItem(item.id, check.id);
                  }}
                  style={styles.checkboxPressable}
                >
                  <MaterialCommunityIcons 
                    name={check.isCompleted ? "checkbox-marked-circle-outline" : "radiobox-blank"} 
                    size={22} 
                    color={check.isCompleted ? currentTheme.primary : currentTheme.textSecondary} 
                  />
                </Pressable>
                <Text style={[
                  styles.checkText, 
                  { color: currentTheme.text },
                  check.isCompleted && [styles.completedText, { color: currentTheme.textSecondary }]
                ]}>
                  {check.text}
                </Text>
              </View>
            ))}
            
            <Divider style={[styles.divider, { backgroundColor: currentTheme.border }]} />
            
            <View style={styles.addItemRow}>
              <TextInput 
                placeholder="Añadir tarea..." 
                value={newItemText} 
                onChangeText={setNewItemText} 
                mode="flat" 
                style={[styles.addItemInput, { backgroundColor: currentTheme.background }]} 
                underlineColor={currentTheme.border}
                activeUnderlineColor={currentTheme.primary}
                textColor={currentTheme.text}
                placeholderTextColor={currentTheme.textSecondary}
                onSubmitEditing={handleAddItem}
              />
              <IconButton 
                icon="plus" 
                iconColor={currentTheme.primary} 
                size={24} 
                onPress={handleAddItem} 
                style={styles.plusButton}
              />
            </View>
          </View>
        ) : isNote(item) ? (
          <TextInput 
            value={content} 
            onChangeText={setContent} 
            placeholder="Empieza a escribir..." 
            multiline 
            mode="flat" 
            style={[styles.contentInput, { color: currentTheme.text }]} 
            underlineColor="transparent" 
            activeUnderlineColor="transparent"
            textColor={currentTheme.text}
            placeholderTextColor={currentTheme.textSecondary}
          />
        ) : (
          <View style={styles.ideaContainer}>
            <View style={[styles.ideaCardInfo, { backgroundColor: currentTheme.surface }]}>
              <MaterialCommunityIcons name="lightbulb-on-outline" size={24} color={currentTheme.primary} />
              <Text style={[styles.ideaInfoText, { color: currentTheme.text }]}>
                Esta idea se guardó de manera automática en tu colección personal.
              </Text>
            </View>
            {item.tags && item.tags.length > 0 && (
              <View style={styles.tagWrapper}>
                {item.tags.map((tag, index) => (
                  <View key={index} style={[styles.tagBadge, { backgroundColor: currentTheme.border }]}>
                    <Text style={[styles.tagText, { color: currentTheme.text }]}>#{tag}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { alignItems: 'center', justifyContent: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: Platform.OS === 'ios' ? 50 : 15, paddingHorizontal: Spacing.sm, borderBottomWidth: Layout.separatorHeight },
  backButton: { margin: 0 },
  titleInput: { flex: 1, fontSize: 20, fontWeight: '600', backgroundColor: 'transparent', letterSpacing: -0.4 },
  content: { flex: 1 },
  scrollContainer: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.md, paddingBottom: 40 },
  contentInput: { fontSize: 16, backgroundColor: 'transparent', minHeight: 300, textAlignVertical: 'top', paddingHorizontal: 0, lineHeight: 22 },
  checkRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.sm },
  checkboxPressable: { padding: 4, marginRight: Spacing.sm },
  checkText: { fontSize: 15, flex: 1, fontWeight: '400' },
  completedText: { textDecorationLine: 'line-through' },
  divider: { marginVertical: Spacing.md, height: Layout.separatorHeight },
  addItemRow: { flexDirection: 'row', alignItems: 'center', marginTop: Spacing.xs },
  addItemInput: { flex: 1, height: 40, paddingHorizontal: 0, fontSize: 15 },
  plusButton: { margin: 0 },
  ideaContainer: { marginTop: Spacing.xs },
  ideaCardInfo: { flexDirection: 'row', alignItems: 'center', padding: Spacing.md, borderRadius: BorderRadius.md, marginBottom: Spacing.md },
  ideaInfoText: { flex: 1, marginLeft: Spacing.md, fontSize: 14, lineHeight: 18 },
  tagWrapper: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tagBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: BorderRadius.round },
  tagText: { fontSize: 13, fontWeight: '500' }
});