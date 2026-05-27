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
      mode="flat" 
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

        <Text variant="labelSmall" style={