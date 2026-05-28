import React from 'react';
import { View, StyleSheet, Alert, useColorScheme, Pressable } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import * as Haptics from 'expo-haptics';
import { IdeaNote } from '../../types';
import theme, { Colors, Spacing, BorderRadius, Layout } from '../../constants/theme';
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

  // Usamos una opacidad ligera del color de la idea de fondo para el indicador circular o un color plano discreto
  const indicatorColor = idea.color || currentTheme.primary;

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
        {/* Selector circular estético a la izquierda inspirado en Microsoft To-Do */}
        <View style={[styles.circularIndicator, { borderColor: indicatorColor }]} />

        {/* Bloque central de contenido */}
        <View style={styles.centerContent}>
          <Text style={[styles.title, { color: currentTheme.text }]} numberOfLines={1}>
            {idea.title || 'Idea sin título'}
          </Text>
          
          {idea.tags && idea.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {idea.tags.map((tag, index) => (
                <Text key={index} style={[styles.tagText, { color: currentTheme.textSecondary }]}>
                  #{tag}
                </Text>
              ))}
            </View>
          )}

          <Text style={[styles.date, { color: currentTheme.textSecondary }]}>
            {formatDate(idea.updatedAt)}
          </Text>
        </View>

        {/* Botón de borrado minimalista alineado a la derecha */}
        <IconButton 
          icon="delete-outline" 
          size={18} 
          onPress={handleDelete} 
          iconColor={currentTheme.textSecondary} 
          style={styles.deleteButton}
        />
      </Pressable>

      {/* Línea divisoria ultrafina de lado a lado */}
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
  tagsContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    columnGap: 8,
    rowGap: 2,
    marginTop: 2,
  },
  tagText: { 
    fontSize: 12, 
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
    marginLeft: Spacing.lg + 20 + Spacing.md, // Alinea el separador perfectamente omitiendo el checkbox
  }
});