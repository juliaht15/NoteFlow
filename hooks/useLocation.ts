// E:\Proyectos\noteflow\hooks\useLocation.ts
import { useState } from 'react';
import * as Location from 'expo-location';

export const useLocation = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Permiso de ubicación denegado');
        return null;
      }
      const loc = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };
      setLocation(coords);
      return coords;
    } catch (error) {
      console.error("Error obteniendo ubicación:", error);
      return null;
    }
  };

  return { location, getCurrentLocation };
};