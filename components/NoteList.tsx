// E:\Proyectos\noteflow\components\NoteList.tsx
import { FlashList } from '@shopify/flash-list';
import { AnyNote } from '@/types';
import { NoteCard } from './NoteCard';

export const NoteList = ({ data }: { data: AnyNote[] }) => {
  return (
    <FlashList
      data={data}
      renderItem={({ item }) => <NoteCard note={item} />}
      keyExtractor={(item) => item.id}
      // @ts-ignore: Forzamos el uso de la propiedad que el compilador no detecta
      estimatedItemSize={100} 
    />
  );
};