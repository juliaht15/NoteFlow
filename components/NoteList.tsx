import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import Animated, { FadeInDown } from 'react-native-reanimated';
import { NoteCard } from './NoteCard';
import { AnyNote } from '../types';

interface NoteListProps {
  data: AnyNote[];
}

export const NoteList = ({ data }: NoteListProps) => {
  return (
    <View style={styles.container}>
      <FlashList
        data={data}
        keyExtractor={(item) => (item as AnyNote).id}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInDown.delay(index * 50)}>
            <NoteCard note={item as AnyNote} />
          </Animated.View>
        )}
        // Forzamos el tipado como 'any' en la propiedad si tu declaración local 
        // de d.ts sigue colisionando con los tipos nativos de Shopify
        {...({ estimatedItemSize: 90 } as any)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingVertical: 8 },
});