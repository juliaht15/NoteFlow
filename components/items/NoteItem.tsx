import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnyNote } from '@/types'; // Cambiado de 'Note' a 'AnyNote'

export const NoteItem = ({ note }: { note: AnyNote }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{note.title}</Text>
    {/* Nota: Asegúrate de que AnyNote tenga la propiedad 'content'. 
        Si es un Checklist, 'content' podría no existir */}
    {'content' in note && <Text>{note.content}</Text>}
  </View>
);

const styles = StyleSheet.create({
  card: { padding: 15, backgroundColor: '#f9f9f9', borderRadius: 10, marginVertical: 5 },
  title: { fontSize: 18, fontWeight: 'bold' }
});