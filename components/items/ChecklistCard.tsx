import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, ProgressBar, IconButton } from 'react-native-paper';
import { ChecklistNote } from '../../types';
import { Colors, Spacing } from '../../constants/theme';

interface ChecklistCardProps {
  checklist: ChecklistNote;
  onPress: () => void;
  onDelete: () => void;
}

export default function ChecklistCard({ checklist, onPress, onDelete }: ChecklistCardProps) {
  // Garantizamos que items sea un array para evitar errores de renderizado
  const items = Array.isArray(checklist.items) ? checklist.items : [];
  const completed = items.filter(i => i.isCompleted).length;
  const total = items.length;
  const progress = total > 0 ? completed / total : 0;

  return (
    <Card mode="elevated" style={styles.card} onPress={onPress}>
      <Card.Content>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text variant="titleMedium" numberOfLines={1} style={styles.title}>
              {checklist.title || 'Lista sin título'}
            </Text>
            {/* Si la lista está vacía pero tiene descripción, la mostramos */}
            {total === 0 && checklist.content && (
              <Text variant="bodySmall" numberOfLines={1} style={styles.preview}>
                {checklist.content}
              </Text>
            )}
          </View>
          <IconButton 
            icon="delete-outline" 
            size={20} 
            onPress={onDelete} 
            iconColor={Colors.error}
            style={styles.deleteBtn}
          />
        </View>

        {/* Indicador de progreso visual */}
        {total > 0 ? (
          <View style={styles.progressContainer}>
            <View style={styles.progressRow}>
              <ProgressBar 
                progress={progress} 
                color={progress === 1 ? Colors.success : Colors.primary} 
                style={styles.progressBar} 
              />
              <Text variant="labelSmall" style={styles.progressText}>
                {completed}/{total}
              </Text>
            </View>
            <Text variant="labelSmall" style={styles.percentage}>
              {Math.round(progress * 100)}% completado
            </Text>
          </View>
        ) : (
          <Text variant="labelSmall" style={styles.emptyText}>
            No hay elementos en la lista
          </Text>
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { 
    marginBottom: Spacing.sm, 
    borderRadius: 16, 
    backgroundColor: Colors.surface,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: Spacing.sm 
  },
  title: { 
    fontWeight: '700',
    color: Colors.text 
  },
  preview: { 
    color: Colors.textSecondary,
    marginTop: 2 
  },
  deleteBtn: { 
    margin: -8 
  },
  progressContainer: {
    marginTop: 4
  },
  progressRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: Spacing.sm 
  },
  progressBar: { 
    flex: 1, 
    height: 8, 
    borderRadius: 4,
    backgroundColor: Colors.border 
  },
  progressText: {
    color: Colors.text,
    fontWeight: '600',
    minWidth: 30
  },
  percentage: {
    color: Colors.textSecondary,
    marginTop: 4,
    fontSize: 10
  },
  emptyText: {
    color: Colors.textSecondary,
    fontStyle: 'italic'
  }
});