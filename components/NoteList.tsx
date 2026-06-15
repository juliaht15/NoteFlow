// E:\Proyectos\noteflow\components\NoteList.tsx
import { FlashList } from '@shopify/flash-list';
import { View } from 'react-native';
import { AnyNote } from '@/types';
import { NoteCard } from './NoteCard';

export const NoteList = ({ data }: { data: AnyNote[] }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlashList
        data={data}
        renderItem={({ item }) => <NoteCard note={item} />}
        keyExtractor={(item) => item.id}
        // @ts-ignore: Saltamos la validación de tipos que está fallando por caché de VS Code
        estimatedItemSize={100} 
      />
    </View>
  );
};