import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, ProgressBar, IconButton } from 'react-native-paper';
import { ChecklistNote } from '../../types';
// CORRECCIÓN: Si estas constantes fallan, usaremos valores por defecto para evitar el blanco
import { Colors, Spacing } from '../../constants/theme';

interface ChecklistCardProps {
  checklist: ChecklistNote;
  onPress: () => void;
  onDelete: () => void;
}

export default function ChecklistCard({ checklist, onPress, onDelete }: ChecklistCardProps) {
  // CORRECCIÓN: Validamos que 'items' exista y sea un array antes de usar filter
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
              {checklist.title}
            </Text>
            {/* Si no hay items de lista, mostramos un resumen del contenido */}
            {total === 0 && checklist.content && (
              <Text variant="bodySmall" numberOfLines={1} style={{ color: '#666' }}>
                {checklist.content}
              </Text>
            )}
          </View>
          <IconButton 
            icon="delete-outline" 
            size={20} 
            onPress={onDelete} 
            iconColor="#d32f2f"
          />
        </View>

        {/* Solo mostramos la barra de progreso si realmente hay items */}
        {total > 0 && (
          <View style={styles.progressRow}>
            <ProgressBar 
              progress={progress} 
              color={Colors?.success || '#4CAF50'} 
              style={styles.progressBar} 
            />
            <Text variant="labelSmall">{completed}/{total}</Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { 
    marginBottom: Spacing?.sm || 12, 
    borderRadius: 16, 
    backgroundColor: '#fff',
    elevation: 2 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: Spacing?.sm || 8 
  },
  title: { fontWeight: '600' },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing?.sm || 8 },
  progressBar: { flex: 1, height: 8, borderRadius: 4 },
});