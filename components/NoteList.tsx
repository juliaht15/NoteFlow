import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SwipeableNoteCard } from './SwipeableNoteCard';
import { AnyNote } from '../types';
import { useRouter } from 'expo-router';

interface NoteListProps {
  data: AnyNote[];
}

export const NoteList = ({ data }: NoteListProps) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlashList
        data={data}
        keyExtractor={(item) => (item as AnyNote).id}
        renderItem={({ item, index }) => {
          const noteItem = item as AnyNote;
          return (
            <Animated.View entering={FadeInDown.delay(index * 50)}>
              <SwipeableNoteCard 
                note={noteItem} 
                onPress={() => router.push(`/(tabs)/${noteItem.type}s/${noteItem.id}` as any)}
              />
            </Animated.View>
          );
        }}
        {...({ estimatedItemSize: 90 } as any)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingVertical: 8 },
});