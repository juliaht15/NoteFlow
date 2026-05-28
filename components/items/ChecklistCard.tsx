import React from 'react';
import { View, StyleSheet, Alert, useColorScheme, Pressable } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import * as Haptics from 'expo-haptics';
import { ChecklistNote } from '../../types';
import { Colors, Spacing, BorderRadius, Layout } from '../../constants/theme';
import { useNotesStore } from '../../store/notesStore';

interface ChecklistCardProps {
  checklist: ChecklistNote;
  onPress: () => void;
}

export default function ChecklistCard({ checklist, onPress }: ChecklistCardProps) {
  const colorScheme = useColorScheme();
  const currentTheme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const deleteNote = useNotesStore((state) => state.deleteNote);

  const items = Array.isArray(checklist.items) ? checklist.items : [];
  const completedCount = items.filter(i => i.isCompleted).length;
  const isAllCompleted = items.length > 0 && completedCount === items.length;

  const handleDelete = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      "Eliminar lista",
      "¿Estás segura de que quieres eliminar esta lista?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          onPress: () => deleteNote(checklist.id), 
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
        {/* Selector circular dinámico tipo Checkbox a la izquierda */}
        <View 
          style={[
            styles.circularCheckbox, 
            { borderColor: isAllCompleted ? currentTheme.success : currentTheme.textSecondary },
            isAllCompleted && { backgroundColor: currentTheme.success }
          ]}
        >
          {isAllCompleted && (
            <Text style={[styles.checkMark, { color: Colors.light.surface }]}>✓</Text>
          )}
        </View>

        {/* Bloque central de la lista de tareas */}
        <View style={styles.centerContent}>
          <Text style={[styles.title, { color: currentTheme.text }]} numberOfLines={1}>
            {checklist.title || 'Lista sin título'}
          </Text>

          {/* Subdatos: Tareas completadas y fecha */}
          <View style={styles.metaRow}>
            <Text style={[styles.metaText, { color: currentTheme.textSecondary }]}>
              {items.length === 0 
                ? 'Sin tareas' 
                : `${completedCount} de ${items.length} completadas`
              }
            </Text>
            <Text style={[styles.bulletSeparator, { color: currentTheme.textSecondary }]}>•</Text>
            <Text style={[styles.metaText, { color: currentTheme.textSecondary }]}>
              {formatDate(checklist.updatedAt)}
            </Text>
          </View>
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

      {/* Separador fluido que arranca alineado con el texto */}
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
  circularCheckbox: {
    width: 20,
    height: 20,
    borderRadius: BorderRadius.round,
    borderWidth: 1.5,
    marginRight: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    fontSize: 11,
    fontWeight: 'bold',
    lineHeight: 14,
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
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '400',
  },
  bulletSeparator: {
    marginHorizontal: Spacing.xs,
    fontSize: 12,
  },
  deleteButton: {
    margin: 0,
    padding: 0,
    opacity: 0.6,
  },
  separator: {
    height: Layout.separatorHeight,
    marginLeft: Spacing.lg + 20 + Spacing.md, // Oculte el checkbox del separador inferior
  }
});