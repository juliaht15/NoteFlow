import React from 'react';
import { View, StyleSheet, Alert, useColorScheme, Pressable } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import * as Haptics from 'expo-haptics';
import { ChecklistNote } from '../../types';
import { Colors, Spacing, BorderRadius, Layout } from '../../constants/theme';
import { useNotesStore } from '../../store/notesStore';

interface ChecklistCardProps {
  list: ChecklistNote;
  onPress: () => void;
}

export default function ChecklistCard({ list, onPress }: ChecklistCardProps) {
  const colorScheme = useColorScheme();
  const currentTheme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const deleteNote = useNotesStore((state) => state.deleteNote);

  const items = Array.isArray(list.list) ? list.list : [];
  const completedCount = items.filter(i => i.done).length;
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
          onPress: () => deleteNote(list.id), 
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
          pressed && { backgroundColor: currentTheme.overlay || 'rgba(0,0,0,0.05)' }
        ]}
        onPress={() => {
          Haptics.selectionAsync();
          onPress();
        }}
      >
        <View 
          style={[
            styles.circularCheckbox, 
            { borderColor: isAllCompleted ? (currentTheme.success || '#107C41') : currentTheme.textSecondary },
            isAllCompleted && { backgroundColor: (currentTheme.success || '#107C41') }
          ]}
        >
          {isAllCompleted && (
            <Text style={[styles.checkMark, { color: '#FFFFFF' }]}>✓</Text>
          )}
        </View>

        <View style={styles.centerContent}>
          <Text style={[styles.title, { color: currentTheme.text }]} numberOfLines={1}>
            {list.title || 'Lista sin título'}
          </Text>

          <View style={styles.metaRow}>
            <Text style={[styles.metaText, { color: currentTheme.textSecondary }]}>
              {items.length === 0 
                ? 'Sin tareas' 
                : `${completedCount} de ${items.length} completadas`
              }
            </Text>
            <Text style={[styles.bulletSeparator, { color: currentTheme.textSecondary }]}>•</Text>
            <Text style={[styles.metaText, { color: currentTheme.textSecondary }]}>
              {formatDate(list.updatedAt)}
            </Text>
          </View>
        </View>

        <IconButton 
          icon="delete-outline" 
          size={18} 
          onPress={handleDelete} 
          iconColor={currentTheme.textSecondary} 
          style={styles.deleteButton}
        />
      </Pressable>

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
    height: Layout?.separatorHeight || 1,
    marginLeft: Spacing.lg + 20 + Spacing.md,
  }
});