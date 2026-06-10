import { View, Text, StyleSheet, useColorScheme } from 'react-native';

export default function HomeScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  
  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <Text style={[styles.text, { color: isDarkMode ? '#fff' : '#000' }]}>NoteFlow</Text>
      <Text style={{ color: isDarkMode ? '#ccc' : '#666' }}>Resumen: Notas (0) | Checklists (0) | Ideas (0)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 }
});