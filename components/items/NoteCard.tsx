import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, Shadow } from '@/constants/theme';
import type { Note } from '@/types';

interface Props {
  note: Note;
  onPress: () => void;
}

export default function NoteCard({ note, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, Shadow.card]}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.content} numberOfLines={2}>{note.content}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background,
    padding: Spacing.md,
    borderRadius: 8,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  content: {
    fontSize: 14,
    color: Colors.textSecondary,
  }
});