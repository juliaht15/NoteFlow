import React, { useState } from 'react';
import { Image, View, Alert, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../constants/theme';

export default function ProfileImagePicker({ onImageSelected }: { onImageSelected: (uri: string) => void }) {
  const { colors } = useTheme();
  const [preview, setPreview] = useState<string | null>(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permiso denegado", "Necesitamos acceso a tus fotos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images', // Corrección del Warning de Expo
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedUri = result.assets[0].uri;
      setPreview(selectedUri);
      onImageSelected(selectedUri);
    }
  };

  return (
    <View style={styles.container}>
      {preview && (
        <Image 
          source={{ uri: preview }} 
          style={[styles.image, { borderColor: colors.border, borderWidth: 1 }]} 
        />
      )}
      <Button 
        mode="outlined" 
        onPress={pickImage} 
        textColor={colors.primary}
        style={{ borderColor: colors.border, borderRadius: 8 }}
      >
        Seleccionar foto de perfil
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginBottom: 20 },
  image: { width: 100, height: 100, borderRadius: 50, marginBottom: 12 }
});