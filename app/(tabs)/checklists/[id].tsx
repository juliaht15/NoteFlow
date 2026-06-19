import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Button, IconButton, Text } from 'react-native-paper';
import { useNotesStore } from '../../../store/useNoteStore';
import { useTheme } from '../../../constants/theme';

export default function ChecklistDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { colors, spacing } = useTheme() as any;
  
  const notes = useNotesStore((state) => state.notes);
  const updateNote = useNotesStore((state) => state.updateNote);
  const deleteNote = useNotesStore((state) => (state as any).deleteNote);

  const currentChecklist = notes.find((n) => n.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [checklistItems, setChecklistItems] = useState<any[]>([]);

  useEffect(() => {
    if (currentChecklist) {
      setTitle(currentChecklist.title || '');
      setContent(currentChecklist.content || '');
      setChecklistItems((currentChecklist as any).items || []);
    }
  }, [currentChecklist]);

  if (!currentChecklist || currentChecklist.type !== 'checklist') {
    return (
      <SafeAreaView style={[styles.center, { backgroundColor: colors.surface }]}>
        <Text style={{ color: colors.text }}>Lista no encontrada</Text>
      </SafeAreaView>
    );
  }

  const toggleCheckItem = (itemId: string) => {
    const updatedItems = checklistItems.map(item => 
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );
    setChecklistItems(updatedItems);
    if (updateNote) {
      updateNote(currentChecklist.id, { items: updatedItems });
    }
  };

  const handleSaveChanges = () => {
    const lines = content.trim() ? content.split('\n') : [];
    const updatedItems = lines.map((line, idx) => {
      const existing = checklistItems[idx];
      return {
        id: existing?.id || String(idx),
        text: line.trim(),
        checked: existing ? existing.checked : false
      };
    });

    if (updateNote) {
      updateNote(currentChecklist.id, {
        title: title.trim(),
        content: content.trim(),
        items: updatedItems,
        updatedAt: new Date().toISOString(),
      });
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (deleteNote) {
      deleteNote(currentChecklist.id);
      router.back();
    }
  };

  const bgStyle = colors.background || colors.surface || '#121212';
  const errorColor = colors.error || colors.danger || '#ff3b30';

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.safeArea, { backgroundColor: bgStyle }]}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
          <ScrollView contentContainerStyle={[styles.container, { padding: spacing.md }]}>
            
            <View style={styles.headerActions}>
              <IconButton
                icon={isEditing ? "close" : "pencil"}
                iconColor={colors.text}
                size={24}
                onPress={() => setIsEditing(!isEditing)}
              />
              <IconButton
                icon="delete"
                iconColor={errorColor}
                size={24}
                onPress={handleDelete}
              />
            </View>

            {isEditing ? (
              <View style={styles.form}>
                <TextInput 
                  label="Título de la lista" 
                  value={title} 
                  onChangeText={setTitle} 
                  mode="outlined" 
                  textColor={colors.text}
                  theme={{ colors: { primary: colors.primary } }}
                  style={styles.input} 
                />
                <TextInput 
                  label="Elementos (uno por línea)" 
                  value={content} 
                  onChangeText={setContent} 
                  mode="outlined" 
                  multiline 
                  numberOfLines={8} 
                  textColor={colors.text}
                  theme={{ colors: { primary: colors.primary } }}
                  style={styles.input} 
                />
                <Button 
                  mode="contained" 
                  onPress={handleSaveChanges} 
                  buttonColor={colors.primary}
                  style={styles.saveButton}
                >
                  Guardar Cambios
                </Button>
              </View>
            ) : (
              <View style={styles.displayContainer}>
                <Text variant="headlineMedium" style={[styles.title, { color: colors.text }]}>
                  {currentChecklist.title}
                </Text>
                
                <View style={styles.checklistBlock}>
                  {checklistItems.map((item) => (
                    <View key={item.id} style={styles.checkRow}>
                      <IconButton
                        icon={item.checked ? "checkbox-marked-circle" : "checkbox-blank-circle-outline"}
                        iconColor={item.checked ? colors.primary : colors.secondaryText}
                        size={24}
                        onPress={() => toggleCheckItem(item.id)}
                        style={styles.checkButton}
                      />
                      <Text style={[styles.checkText, { 
                        color: item.checked ? colors.secondaryText : colors.text, 
                        textDecorationLine: item.checked ? 'line-through' : 'none' 
                      }]}>
                        {item.text}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flexGrow: 1, paddingBottom: 40 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerActions: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 16 },
  form: { width: '100%' },
  input: { marginBottom: 16 },
  saveButton: { marginTop: 8, paddingVertical: 2 },
  displayContainer: { paddingHorizontal: 4 },
  title: { fontWeight: '700', marginBottom: 16 },
  checklistBlock: { marginTop: 8 },
  checkRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  checkButton: { margin: 0, padding: 0 },
  checkText: { fontSize: 16, marginLeft: 8, flex: 1 }
});