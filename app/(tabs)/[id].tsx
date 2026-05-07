import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, IconButton, TextInput, Checkbox, Divider } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNotesStore } from '../../store/notesStore';
import { Colors } from '../../constants/theme';

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
      updateNote(id as string, { title, content });
    }, 600);
    return () => clearTimeout(delay);
  }, [title, content]);

  const handleAddItem = () => {
    if (newItemText.trim() && item?.category === 'lista') {
      const updatedItems = [...(item as any).items, { id: Date.now().toString(), text: newItemText, isCompleted: false }];
      updateNote(id as string, { items: updatedItems });
      setNewItemText('');
    }
  };

  if (!item) return <View style={styles.container}><Text>Cargando...</Text></View>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" onPress={() => router.back()} />
        <TextInput value={title} onChangeText={setTitle} placeholder="Título" mode="flat" style={styles.titleInput} underlineColor="transparent" activeUnderlineColor="transparent" />
      </View>

      <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
        {item.category === 'lista' ? (
          <View>
            {(item as any).items.map((check: any) => (
              <View key={check.id} style={styles.checkRow}>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    status={check.isCompleted ? 'checked' : 'unchecked'}
                    onPress={() => toggleChecklistItem(item.id, check.id)}
                    color={Colors.primary}
                  />
                </View>
                <Text style={[styles.checkText, check.isCompleted && styles.completedText]}>{check.text}</Text>
              </View>
            ))}
            <Divider style={{ marginVertical: 20 }} />
            <View style={styles.addItemRow}>
              <TextInput placeholder="Añadir item..." value={newItemText} onChangeText={setNewItemText} mode="outlined" style={styles.addItemInput} />
              <IconButton icon="plus-circle" iconColor={Colors.primary} size={30} onPress={handleAddItem} />
            </View>
          </View>
        ) : (
          <TextInput value={content} onChangeText={setContent} placeholder="Contenido..." multiline mode="flat" style={styles.contentInput} underlineColor="transparent" activeUnderlineColor="transparent" />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: 50, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  titleInput: { flex: 1, fontSize: 22, fontWeight: 'bold', backgroundColor: 'transparent' },
  content: { padding: 20 },
  contentInput: { fontSize: 18, backgroundColor: 'transparent', minHeight: 400, textAlignVertical: 'top' },
  checkRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  checkboxContainer: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, marginRight: 10 },
  checkText: { fontSize: 18, flex: 1 },
  completedText: { textDecorationLine: 'line-through', color: '#aaa' },
  addItemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 40 },
  addItemInput: { flex: 1, height: 45 }
});