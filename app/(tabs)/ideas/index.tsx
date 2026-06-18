import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Searchbar, Card, Text, IconButton, Chip } from 'react-native-paper';
import { collection, query, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebaseConfig';
import { useTheme } from '../../../constants/theme';

interface Idea {
  id: string;
  titulo: string;
  descripcion: string;
  etiquetas: string[];
}

export default function IdeasScreen() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [filteredIdeas, setFilteredIdeas] = useState<Idea[]>([]);

  // Escuchar ideas en tiempo real desde Firestore
  useEffect(() => {
    const q = query(collection(db, 'ideas'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ideasData: Idea[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        ideasData.push({
          id: doc.id,
          titulo: data.titulo || '',
          descripcion: data.descripcion || '',
          etiquetas: data.etiquetas || [],
        });
      });
      setIdeas(ideasData);
      setFilteredIdeas(ideasData);
    });

    return () => unsubscribe();
  }, []);

  // Filtrado por título, descripción O etiquetas
  useEffect(() => {
    const queryLower = searchQuery.toLowerCase();
    const filtered = ideas.filter((idea) => {
      const coincideTitulo = idea.titulo.toLowerCase().includes(queryLower);
      const coincideDesc = idea.descripcion.toLowerCase().includes(queryLower);
      const coincideEtiqueta = idea.etiquetas.some(tag => tag.toLowerCase().includes(queryLower));
      
      return coincideTitulo || coincideDesc || coincideEtiqueta;
    });
    setFilteredIdeas(filtered);
  }, [searchQuery, ideas]);

  // Función para borrar una idea de Firestore
  const handleDelete = (id: string) => {
    Alert.alert(
      'Borrar Idea',
      '¿Seguro que quieres eliminar esta idea permanentemente?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'ideas', id));
            } catch (error) {
              Alert.alert('Error', 'No se pudo borrar la idea.');
            }
          }
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Searchbar
        placeholder="Buscar por título o etiqueta..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      <FlatList
        data={filteredIdeas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card style={[styles.card, { backgroundColor: colors.surface }]} mode="elevated">
            <Card.Content>
              <View style={styles.headerCard}>
                <Text variant="titleMedium" style={{ color: colors.text, flex: 1, fontWeight: 'bold' }}>
                  {item.titulo}
                </Text>
                <IconButton
                  icon="delete-outline"
                  iconColor={colors.error || '#ff4444'}
                  size={20}
                  onPress={() => handleDelete(item.id)}
                  style={styles.deleteButton}
                />
              </View>
              
              <Text variant="bodyMedium" style={{ color: colors.text, marginBottom: 12 }}>
                {item.descripcion}
              </Text>

              {/* Contenedor de etiquetas con colores legibles del tema */}
              <View style={styles.tagContainer}>
                {item.etiquetas.map((tag, index) => (
                  <Chip 
                    key={index} 
                    style={[styles.chip, { backgroundColor: colors.primary }]}
                    textStyle={{ color: colors.surface, fontSize: 12, fontWeight: '600' }}
                  >
                    #{tag}
                  </Chip>
                ))}
              </View>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 8 },
  searchbar: { marginBottom: 16, borderRadius: 12 },
  list: { paddingBottom: 100 },
  card: { marginBottom: 12, borderRadius: 12 },
  headerCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  deleteButton: { margin: 0, padding: 0 },
  tagContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: { borderRadius: 8, height: 28, justifyContent: 'center' }
});