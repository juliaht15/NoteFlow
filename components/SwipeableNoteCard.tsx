import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import { IconButton } from 'react-native-paper';
import { NoteCard } from './NoteCard';
import { AnyNote } from '../types';
import { useNotesStore } from '../store/useNoteStore';
import { useTheme } from '../constants/theme';

interface SwipeableNoteCardProps {
  note: AnyNote;
  onPress: () => void;
}

export const SwipeableNoteCard = ({ note, onPress }: SwipeableNoteCardProps) => {
  const { colors } = useTheme();
  const deleteNote = useNotesStore((state) => state.deleteNote);
  
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(90);
  const opacity = useSharedValue(1);

  const executeDelete = () => {
    if (deleteNote) {
      deleteNote(note.id);
    }
  };

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationX < 0) {
        translateX.value = event.translationX;
      }
    })
    .onEnd((event) => {
      if (event.translationX < -100) {
        translateX.value = withTiming(-400, { duration: 200 });
        opacity.value = withTiming(0, { duration: 200 });
        itemHeight.value = withTiming(0, { duration: 200 }, (isFinished) => {
          if (isFinished) {
            runOnJS(executeDelete)();
          }
        });
      } else {
        translateX.value = withTiming(0, { duration: 200 });
      }
    });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const rContainerStyle = useAnimatedStyle(() => ({
    height: itemHeight.value,
    opacity: opacity.value,
    marginBottom: itemHeight.value === 0 ? 0 : 8,
  }));

  const errorColor = colors.error || '#ff3b30';

  return (
    <GestureHandlerRootView>
      <Animated.View style={[styles.container, rContainerStyle]}>
        <View style={[styles.deleteBackground, { backgroundColor: errorColor + '20' }]}>
          <IconButton
            icon="delete-outline"
            iconColor={errorColor}
            size={24}
            style={styles.deleteIcon}
            onPress={() => {
              translateX.value = withTiming(-400, { duration: 200 });
              opacity.value = withTiming(0, { duration: 200 });
              itemHeight.value = withTiming(0, { duration: 200 }, (isFinished) => {
                if (isFinished) runOnJS(executeDelete)();
              });
            }}
          />
        </View>
        <GestureDetector gesture={gesture}>
          <Animated.View style={rStyle}>
            <NoteCard note={note} onPress={onPress} />
          </Animated.View>
        </GestureDetector>
      </Animated.View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: { position: 'relative', justifyContent: 'center' },
  deleteBackground: {
    position: 'absolute',
    right: 4,
    left: 4,
    top: 0,
    bottom: 0,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 16,
  },
  deleteIcon: { margin: 0 }
});