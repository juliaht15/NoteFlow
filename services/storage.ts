import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  save: async <T>(key: string, value: T): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error(`Error guardando en storage [${key}]:`, e);
    }
  },

  get: async <T>(key: string): Promise<T | null> => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error(`Error leyendo de storage [${key}]:`, e);
      return null;
    }
  },

  remove: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error(`Error borrando de storage [${key}]:`, e);
    }
  }
};