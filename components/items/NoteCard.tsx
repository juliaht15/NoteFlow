import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { Note } from '../../types';
import { Colors, Spacing } from '../../constants/theme';

interface NoteCardProps {
  note: Note;
  onPress: () => void;
  onDelete: () => void;
}

export default function NoteCard({ note, onPress, onDelete }: NoteCardProps) {
  return (
    <Card mode="elevated" style={styles.card} onPress={onPress}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleMedium" numberOfLines={1}>{note.title}</Text>
          <IconButton icon="delete-outline" size={20} onPress={onDelete} />
        </View>
        <Text variant="bodySmall" numberOfLines={2} style={styles.preview}>
          {note.content || 'Sin contenido'}
        </Text>
        <Text variant="labelSmall" style={styles.date}>
          {note.updatedAt.toLocaleDateString('es-ES')}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: Spacing.sm, borderRadius: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  preview: { color: Colors.textSecondary, marginTop: Spacing.xs },
  date: { color: Colors.textSecondary, marginTop: Spacing.xs },
});