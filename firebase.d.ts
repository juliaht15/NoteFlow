import { FirebaseApp } from 'firebase/app';
import { Auth, Persistence } from 'firebase/auth';

declare module 'firebase/auth' {
  export function initializeAuth(app: FirebaseApp, config: { persistence: Persistence }): Auth;
  export function getReactNativePersistence(storage: any): Persistence;
}