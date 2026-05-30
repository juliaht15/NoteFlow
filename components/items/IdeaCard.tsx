import React from 'react';
import { View, StyleSheet, Alert, useColorScheme, Pressable } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import * as Haptics from 'expo-haptics';
import { IdeaNote } from '../../types';
import { Colors, Spacing, BorderRadius, Layout } from '../../constants/theme';
import { useNotesStore } from '../../store/notesStore';

interface IdeaCardProps {
  idea: IdeaNote;
  onPress: () => void;
}

export default function IdeaCard({ idea, onPress }: IdeaCardProps) {
  const colorScheme = useColorScheme();
  const currentTheme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const deleteNote = useNotesStore((state) => state.deleteNote);

  const handleDelete = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert("Eliminar idea", "¿Borrar esta idea para siempre?", [
      { text: "Cancelar", style: "cancel" },
      { 
        text: "Eliminar", 
        onPress: () => deleteNote(idea.id), 
        style: "destructive" 
      }
    ]);
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? 'Reciente' : d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  const indicatorColor = '#D83B01';

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
        <View style={[styles.circularIndicator, { borderColor: indicatorColor }]} />

        <View style={styles.centerContent}>
          <Text style={[styles.title, { color: currentTheme.text }]} numberOfLines={1}>
            {idea.title || 'Idea sin título'}
          </Text>

          <Text style={[styles.date, { color: currentTheme.textSecondary }]}>
            {formatDate(idea.updatedAt)}
          </Text>
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
  circularIndicator: {
    width: 20,
    height: 20,
    borderRadius: BorderRadius.round,
    borderWidth: 1.5,
    marginRight: Spacing.md,
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
    height: Layout?.separatorHeight || 1,
    marginLeft: Spacing.lg + 20 + Spacing.md,
  }
});