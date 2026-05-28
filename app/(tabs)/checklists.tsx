import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Note } from '../../types';
import { Spacing, BorderRadius } from '../../constants/theme';

interface ChecklistCardProps {
  list: Note; // Cambiado a 'list' para resolver el error ts(2322)
  onPress: () => void;
}

export default function ChecklistCard({ list, onPress }: ChecklistCardProps) {
  // Contamos los elementos completados si existen en el contenido
  const items = list.content ? list.content.split('\n').filter(Boolean) : [];
  const completedCount = items.filter(item => item.startsWith('[x]') || item.startsWith('- [x]')).length;
  const totalCount = items.length;

  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content style={styles.content}>
        <View style={styles.headerRow}>
          <MaterialCommunityIcons name="format-list-checks" size={20} color="#6200ee" />
          <Text style={styles.title} numberOfLines={1}>
            {list.title || 'Sin título'}
          </Text>
        </View>
        
        {totalCount > 0 && (
          <Text style={styles.progressText}>
            {completedCount} de {totalCount} tareas completadas
          </Text>
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  content: {
    padding: Spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1b1f',
    flex: 1,
  },
  progressText: {
    fontSize: 13,
    color: '#49454f',
    marginTop: Spacing.xs,
    paddingLeft: 28,
  },
});