import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SwipeableNoteCard } from './SwipeableNoteCard';
import { AnyNote } from '../types';
import { useRouter } from 'expo-router';

interface NoteListProps {
  data: AnyNote[];
}

const SafeFlashList = FlashList as any;

export const NoteList = ({ data }: NoteListProps) => {
  const router = useRouter();

  const getRoutePath = (type: string) => {
    switch (type) {
      case 'note': return 'notas';
      case 'checklist': return 'checklists';
      case 'idea': return 'ideas';
      default: return 'notas';
    }
  };

  return (
    <View style={styles.container}>
      <SafeFlashList
        data={data}
        keyExtractor={(item: AnyNote) => item.id}
        estimatedItemSize={110}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }: ListRenderItemInfo<AnyNote>) => (
          <Animated.View entering={FadeInDown.delay(index * 40)}>
            <SwipeableNoteCard 
              note={item} 
              onPress={() => router.push(`/(tabs)/${getRoutePath(item.type)}/${item.id}`)}
            />
          </Animated.View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingVertical: 4 },
});