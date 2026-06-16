import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNotesStore } from '../../store/useNoteStore';
import { useTheme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const { colors, spacing, typography } = useTheme();
  const notes = useNotesStore((state) => state.notes);

  const totalNotas = notes.filter((n) => n.type === 'note').length;
  const totalChecklists = notes.filter((n) => n.type === 'checklist').length;
  const totalIdeas = notes.filter((n) => n.type === 'idea').length;

  return (
    <View style={[styles.container, { backgroundColor: colors.surface === '#ffffff' ? '#f3f2f1' : '#11100f', padding: spacing.md }]}>
      
      <View style={styles.header}>
        <View style={styles.userSection}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Text style={styles.avatarText}>RH</Text>
          </View>
          <View>
            <Text style={[styles.userName, { color: colors.text, fontSize: typography.fontSize.md }]}>
              Rocío Huertas
            </Text>
            <Text style={[styles.userEmail, { color: colors.secondaryText, fontSize: typography.fontSize.xs }]}>
              Sociosanitario & Dev
            </Text>
          </View>
        </View>
        <Pressable style={[styles.iconButton, { borderColor: colors.border }]}>
          <Ionicons name="search" size={20} color={colors.text} />
        </Pressable>
      </View>

      <View style={[styles.menuContainer, { backgroundColor: colors.surface, borderRadius: 8, borderColor: colors.border, borderWidth: 1 }]}>
        <Pressable style={[styles.menuItem, { borderBottomWidth: 1, borderBottomColor: colors.border, padding: spacing.md }]}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="document-text" size={22} color="#70A1FF" style={styles.menuIcon} />
            <Text style={[styles.menuText, { color: colors.text, fontSize: typography.fontSize.md }]}>Notas</Text>
          </View>
          <Text style={[styles.badge, { color: colors.secondaryText, fontSize: typography.fontSize.sm }]}>{totalNotas}</Text>
        </Pressable>

        <Pressable style={[styles.menuItem, { borderBottomWidth: 1, borderBottomColor: colors.border, padding: spacing.md }]}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="checkbox" size={22} color="#2ECC71" style={styles.menuIcon} />
            <Text style={[styles.menuText, { color: colors.text, fontSize: typography.fontSize.md }]}>Checklists</Text>
          </View>
          <Text style={[styles.badge, { color: colors.secondaryText, fontSize: typography.fontSize.sm }]}>{totalChecklists}</Text>
        </Pressable>

        <Pressable style={[styles.menuItem, { padding: spacing.md }]}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="bulb" size={22} color="#FFD15C" style={styles.menuIcon} />
            <Text style={[styles.menuText, { color: colors.text, fontSize: typography.fontSize.md }]}>Ideas</Text>
          </View>
          <Text style={[styles.badge, { color: colors.secondaryText, fontSize: typography.fontSize.sm }]}>{totalIdeas}</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Pressable style={[styles.logoutButton, { borderTopWidth: 1, borderTopColor: colors.border, padding: spacing.md }]}>
          <Ionicons name="log-out-outline" size={20} color={colors.danger} />
          <Text style={[styles.logoutText, { color: colors.danger, fontSize: typography.fontSize.md, marginLeft: spacing.sm }]}>
            Cerrar sesión
          </Text>
        </Pressable>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, marginTop: 10 },
  userSection: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 42, height: 42, borderRadius: 21, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  avatarText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  userName: { fontWeight: '700' },
  userEmail: { marginTop: 2 },
  iconButton: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  menuContainer: { overflow: 'hidden' },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
  menuIcon: { marginRight: 14 },
  menuText: { fontWeight: '500' },
  badge: { fontWeight: '600' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0 },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  logoutText: { fontWeight: '600' },
});