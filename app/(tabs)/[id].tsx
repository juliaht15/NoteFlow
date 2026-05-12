import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, IconButton, TextInput, Checkbox, Divider } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNotesStore } from '../../store/notesStore';
import { Colors } from '../../constants/theme';
import * as Haptics from 'expo-haptics';

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { notes, checklists, ideas, updateNote, toggleChecklistItem } = useNotesStore();

  const item = notes.find(n => n.id === id) || checklists.find(c => c.id === id) || ideas.find(i => i.id === id);

  const [title, setTitle] = useState(item?.title || '');
  const [content, setContent] = useState((item as any)?.content || '');
  const [newItemText, setNewItemText] = useState('');

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      if (item.category !== 'lista') setContent((item as any).content || '');
    }
  }, [item?.id]);

  useEffect(() => {
    if (!item) return;
    const delay = setTimeout(() => {
      if (title !== item.title || (item.category !== 'lista' && content !== (item as any).content)) {
        const updates: any = { title };
        if (item.category !== 'lista') updates.content = content;
        updateNote(id as string, updates);
      }
    }, 800);
    return () => clearTimeout(delay);
  }, [title, content]);

  const handleAddItem = () => {
    if (newItemText.trim() && item?.category === 'lista') {
      const updatedItems = [...(item as any).items, { id: Date.now().toString(), text: newItemText, isCompleted: false }];
      updateNote(id as string, { items: updatedItems });
      setNewItemText('');
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  if (!item) return <View style={styles.container}><Text>Cargando...</Text></View>;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" onPress={() => router.back()} iconColor={Colors.primary} />
        <TextInput value={title} onChangeText={setTitle} placeholder="Título" mode="flat" style={styles.titleInput} underlineColor="transparent" activeUnderlineColor="transparent" />
      </View>

      <ScrollView style={styles.content} keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContainer}>
        {item.category === 'lista' ? (
          <View>
            {(item as any).items.map((check: any) => (
              <View key={check.id} style={styles.checkRow}>
                <Checkbox status={check.isCompleted ? 'checked' : 'unchecked'} onPress={() => toggleChecklistItem(item.id, check.id)} color={Colors.primary} />
                <Text style={[styles.checkText, check.isCompleted && styles.completedText]}>{check.text}</Text>
              </View>
            ))}
            <Divider style={styles.divider} />
            <View style={styles.addItemRow}>
              <TextInput placeholder="Nuevo elemento..." value={newItemText} onChangeText={setNewItemText} mode="outlined" style={styles.addItemInput} activeOutlineColor={Colors.primary} onSubmitEditing={handleAddItem} />
              <IconButton icon="plus-circle" iconColor={Colors.primary} size={30} onPress={handleAddItem} />
            </View>
          </View>
        ) : (
          <TextInput value={content} onChangeText={setContent} placeholder="Escribe aquí..." multiline mode="flat" style={styles.contentInput} underlineColor="transparent" activeUnderlineColor="transparent" />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: Platform.OS === 'ios' ? 50 : 30, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  titleInput: { flex: 1, fontSize: 22, fontWeight: 'bold', backgroundColor: 'transparent' },
  content: { flex: 1 },
  scrollContainer: { padding: 20, paddingBottom: 40 },
  contentInput: { fontSize: 18, backgroundColor: 'transparent', minHeight: 400, textAlignVertical: 'top' },
  checkRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  checkText: { fontSize: 18, flex: 1, marginLeft: 8 },
  completedText: { textDecorationLine: 'line-through', color: '#aaa' },
  divider: { marginVertical: 20 },
  addItemRow: { flexDirection: 'row', alignItems: 'center' },
  addItemInput: { flex: 1, height: 45, backgroundColor: 'white' }
});