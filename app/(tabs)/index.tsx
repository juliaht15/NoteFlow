import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Avatar, Card, IconButton } from 'react-native-paper';
import { useTheme } from '../../constants/theme';
import { useNotesStore } from '../../store/useNoteStore';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const { colors, spacing, toggleTheme, isDarkMode } = useTheme() as any;
  const router = useRouter();
  const notes = useNotesStore((state) => state.notes);

  const notesCount = notes.filter(n => n.type === 'note').length;
  const checklistsCount = notes.filter(n => n.type === 'checklist').length;
  const ideasCount = notes.filter(n => n.type === 'idea').length;

  const bgStyle = colors.background || colors.surface || '#121212';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bgStyle }]} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={[styles.container, { padding: spacing.md }]}>
        
        <View style={styles.profileContainer}>
          <Avatar.Text size={48} label="JH" style={{ backgroundColor: colors.primary }} />
          <View style={styles.textContainer}>
            <Text variant="titleMedium" style={{ color: colors.text, fontWeight: '700' }}>
              Julia Huertas
            </Text>
            <Text variant="bodySmall" style={{ color: colors.secondaryText }}>
              Técnica en DAM & Dev
            </Text>
          </View>
          
          <View style={styles.rightActions}>
            <IconButton 
              icon={isDarkMode ? "weather-sunny" : "weather-night"} 
              iconColor={colors.text} 
              size={24} 
              onPress={toggleTheme} 
            />
            <IconButton 
              icon="cog" 
              iconColor={colors.text} 
              size={24} 
              onPress={() => router.push('/settings' as any)} 
            />
          </View>
        </View>

        <Card style={[styles.card, { backgroundColor: colors.surface }]} onPress={() => router.push('/notas')}>
          <Card.Title
            title="Notas"
            titleStyle={{ color: colors.text }}
            left={(props) => <Avatar.Icon size={props.size} icon="file-document" style={{ backgroundColor: 'transparent' }} color={colors.primary} />}
            right={() => <Text style={[styles.count, { color: colors.secondaryText }]}>{notesCount}</Text>}
          />
        </Card>

        <Card style={[styles.card, { backgroundColor: colors.surface }]} onPress={() => router.push('/checklists')}>
          <Card.Title
            title="Checklists"
            titleStyle={{ color: colors.text }}
            left={(props) => <Avatar.Icon size={props.size} icon="checkbox-marked" style={{ backgroundColor: 'transparent' }} color="#4caf50" />}
            right={() => <Text style={[styles.count, { color: colors.secondaryText }]}>{checklistsCount}</Text>}
          />
        </Card>

        <Card style={[styles.card, { backgroundColor: colors.surface }]} onPress={() => router.push('/ideas')}>
          <Card.Title
            title="Ideas"
            titleStyle={{ color: colors.text }}
            left={(props) => <Avatar.Icon size={props.size} icon="lightbulb" style={{ backgroundColor: 'transparent' }} color="#ffeb3b" />}
            right={() => <Text style={[styles.count, { color: colors.secondaryText }]}>{ideasCount}</Text>}
          />
        </Card>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flexGrow: 1, justifyContent: 'flex-start' },
  profileContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  textContainer: { marginLeft: 16, flex: 1 },
  rightActions: { flexDirection: 'row', alignItems: 'center' },
  card: { marginBottom: 12, borderRadius: 12, elevation: 1 },
  count: { marginRight: 16, fontSize: 16, fontWeight: '600' }
});