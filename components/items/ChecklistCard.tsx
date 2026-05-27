import React from 'react';
import { View, StyleSheet, Alert, useColorScheme } from 'react-native';
import { Card, Text, ProgressBar, IconButton } from 'react-native-paper';
import { ChecklistNote } from '../../types';
import theme from '../../constants/theme';
import { useNotesStore } from '../../store/notesStore';

interface ChecklistCardProps {
  checklist: ChecklistNote;
  onPress: () => void;
}

export default function ChecklistCard({ checklist, onPress }: ChecklistCardProps) {
  const colorScheme = useColorScheme();
  const currentTheme = colorScheme === 'dark' ? theme.Colors.dark : theme.Colors.light;
  
  const deleteNote = useNotesStore((state) => state.deleteNote);
  const items = Array.isArray(checklist.items) ? checklist.items : [];
  const completed = items.filter(i => i.isCompleted).length;
  const progress = items.length > 0 ? completed / items.length : 0;

  const handleDelete = () => {
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
    return isNaN(d.getTime()) ? 'Reciente' : d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }).replace('.', '');
  };

  return (
    <Card 
      mode="contained" 
      style={[
        styles.card, 
        { 
          backgroundColor: currentTheme.surface, 
          borderBottomColor: currentTheme.border 
        }
      ]} 
      onPress={onPress}
    >
      <Card.Content style={styles.contentContainer}>
        <View style={styles.header}>
          <Text variant="titleMedium" style={[styles.title, { color: currentTheme.text }]} numberOfLines={1}>
            {checklist.title || 'Lista'}
          </Text>
          <IconButton 
            icon="delete-outline" 
            size={20} 
            onPress={handleDelete} 
            iconColor={currentTheme.error} 
            style={styles.deleteButton}
          />
        </View>

        <View style={styles.itemsPreview}>
          {items.slice(0, 3).map((item) => (
            <Text key={item.id} numberOfLines={1} style={[styles.itemText, { color: currentTheme.textSecondary }]}>
              {item.isCompleted ? '✓ ' : '○ '} {item.text}
            </Text>
          ))}
          {items.length > 3 && <Text style={[styles.moreText, { color: currentTheme.textSecondary }]}>... y {items.length - 3} más</Text>}
          {items.length === 0 && <Text style={[styles.emptyPreview, { color: currentTheme.textSecondary }]}>Lista vacía</Text>}
        </View>

        <View style={styles.progressRow}>
          <ProgressBar 
            progress={progress} 
            color={progress === 1 ? currentTheme.success : currentTheme.primary} 
            style={[styles.bar, { backgroundColor: colorScheme === 'dark' ? '#2C2C2E' : '#E5E5EA' }]} 
          />
          <Text variant="labelSmall" style={[styles.progressText, { color: currentTheme.textSecondary }]}>
            {completed}/{items.length}
          </Text>
        </View>

        <Text variant="labelSmall" style={[styles.date, { color: currentTheme.textSecondary }]}>
          {formatDate(checklist.updatedAt)}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { 
    borderRadius: theme.BorderRadius.lg, 
    marginHorizontal: theme.Spacing.md,
    marginBottom: theme.Spacing.sm,
    borderBottomWidth: 0.5,
    elevation: 0, // Evita sombras en modo contained si la versión es MD2
  },
  contentContainer: {
    paddingVertical: theme.Spacing.sm,
    paddingHorizontal: theme.Spacing.md,
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  title: { 
    fontWeight: '600', 
    flex: 1, 
    letterSpacing: -0.3 
  },
  deleteButton: {
    margin: 0,
    padding: 0,
  },
  itemsPreview: { 
    marginVertical: 4 
  },
  itemText: { 
    fontSize: 13, 
    marginBottom: 2,
    letterSpacing: -0.1 
  },
  moreText: { 
    fontSize: 11, 
    opacity: 0.6 
  },
  emptyPreview: { 
    fontSize: 13, 
    fontStyle: 'italic' 
  },
  progressRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 10, 
    marginTop: theme.Spacing.sm 
  },
  bar: { 
    flex: 1, 
    height: 4, 
    borderRadius: 2 
  },
  progressText: { 
    fontSize: 11,
    minWidth: 30, 
    textAlign: 'right',
    fontWeight: '500' 
  },
  date: { 
    textAlign: 'right', 
    fontSize: 11, 
    fontWeight: '400',
    marginTop: theme.Spacing.sm 
  }
});