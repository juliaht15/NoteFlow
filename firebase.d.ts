import { FirebaseApp } from 'firebase/app';
import { Persistence } from 'firebase/auth';

declare module 'firebase/auth' {
  export function initializeAuth(app: FirebaseApp, config: { persistence: Persistence }): any;
  export function getReactNativePersistence(storage: any): Persistence;
}