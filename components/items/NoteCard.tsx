import React from 'react';
import { View, StyleSheet, Alert, useColorScheme, Pressable } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import * as Haptics from 'expo-haptics';
import { Note } from '../../types';
import { Colors, Spacing, Layout } from '../../constants/theme';
import { useNotesStore } from '../../store/notesStore';

interface NoteCardProps {
  note: Note;
  onPress: () => void;
}

export default function NoteCard({ note, onPress }: NoteCardProps) {
  const colorScheme = useColorScheme();
  const currentTheme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const deleteNote = useNotesStore((state) => state.deleteNote);

  const handleDelete = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      "Eliminar nota",
      "¿Estás segura de que quieres borrar esta nota?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          onPress: () => deleteNote(note.id), 
          style: "destructive" 
        }
      ]
    );
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) 
      ? 'Reciente' 
      : d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  return (
    <View style={[styles.rowContainer, { backgroundColor: currentTheme.surface }]}>
      <Pressable 
        style={({ pressed }) => [
          styles.pressableRow,
          pressed && { backgroundColor: currentTheme.overlay }
        ]}
        onPress={() => {
          Haptics.selectionAsync();
          onPress();
        }}
      >
        {/* Icono de ancla a la izquierda que mantiene la simetría con los checkboxes circulares */}
        <View style={styles.iconContainer}>
          <IconButton 
            icon="note-text-outline" 
            size={20} 
            iconColor={currentTheme.primary} 
            style={styles.leadingIcon}
          />
        </View>

        {/* Bloque central del contenido de la nota */}
        <View style={styles.centerContent}>
          <Text style={[styles.title, { color: currentTheme.text }]} numberOfLines={1}>
            {note.title || 'Nota sin título'}
          </Text>
          
          {note.content ? (
            <Text style={[styles.preview, { color: currentTheme.textSecondary }]} numberOfLines={1}>
              {note.content}
            </Text>
          ) : null}

          <Text style={[styles.date, { color: currentTheme.textSecondary }]}>
            {formatDate(note.updatedAt)}
          </Text>
        </View>

        {/* Borrado limpio a la derecha */}
        <IconButton 
          icon="delete-outline" 
          size={18} 
          onPress={handleDelete} 
          iconColor={currentTheme.textSecondary} 
          style={styles.deleteButton}
        />
      </Pressable>

      {/* Separador de un píxel físico exacto */}
      <View style={[styles.separator, { backgroundColor: currentTheme.border }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    width: '100%',
  },
  pressableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  iconContainer: {
    width: 20,
    marginRight: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leadingIcon: {
    margin: 0,
    padding: 0,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '400',
    letterSpacing: -0.2,
  },
  preview: { 
    fontSize: 13,
    marginTop: 2,
    fontWeight: '400',
  },
  date: { 
    fontSize: 11,
    fontWeight: '400',
    marginTop: 4,
  },
  deleteButton: {
    margin: 0,
    padding: 0,
    opacity: 0.6,
  },
  separator: {
    height: Layout.separatorHeight,
    marginLeft: Spacing.lg + 20 + Spacing.md, // Mantiene la alineación de sangría matemática exacta de las otras filas
  }
});