import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import {
  USER_LOGGED_IN_KEY,
  USER_PASSED_ONBOARDING_KEY,
  USER_PASSED_WELCOME_SCREEN_KEY,
  USER_SESSION_KEY
} from '@/constants/cache';
import type { Child, OnboardingState } from '@/store/onboarding';

export type AccountType = 'CHILD' | 'ADULT';

interface Session {
  type: AccountType;
  passcode?: number;
  firstName?: string;
  lastName?: string;
  gender?: string;
  birthDate?: string;
  ssn?: string;
  children?: Child[];
}

export interface AuthState {
  loggedIn: boolean;
  loading: boolean;
  passedWelcomeScreen: boolean;
  passedOnboarding: boolean;
  pathname: string;
  session: Session | null;
}

interface Actions {
  actions: {
    resetState: () => void;
    setSession: (session: AuthState['session']) => void;
    initialize: () => Promise<AuthState | null>;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    passWelcomeScreen: () => Promise<void>;
    finishOnboarding: (onboardingData: OnboardingState) => Promise<void>;
  };
}

const initialState: AuthState = {
  loading: true,
  loggedIn: false,
  passedWelcomeScreen: false,
  passedOnboarding: false,
  pathname: '',
  session: null
};

export const useAuthStore = createWithEqualityFn<AuthState & Actions>(
  (set, get) => ({
    ...initialState,
    actions: {
      resetState: async () => {
        await Promise.all([
          SecureStore.deleteItemAsync(USER_PASSED_ONBOARDING_KEY),
          SecureStore.deleteItemAsync(USER_PASSED_WELCOME_SCREEN_KEY),
          SecureStore.deleteItemAsync(USER_SESSION_KEY),
          SecureStore.deleteItemAsync(USER_LOGGED_IN_KEY)
        ]);
        set(initialState);
      },
      initialize: async () => {
        try {
          const [cacheLogged, cacheWelcomeScreen, cacheOnboarding, cacheSession] = await Promise.all([
            SecureStore.getItemAsync(USER_LOGGED_IN_KEY),
            SecureStore.getItemAsync(USER_PASSED_WELCOME_SCREEN_KEY),
            SecureStore.getItemAsync(USER_PASSED_ONBOARDING_KEY),
            SecureStore.getItemAsync(USER_SESSION_KEY)
          ]);

          const loggedIn = Boolean(cacheLogged);
          const passedWelcomeScreen = Boolean(cacheWelcomeScreen);
          const passedOnboarding = Boolean(cacheOnboarding);
          const session = JSON.parse(cacheSession || 'null');

          const { actions: _, ...currentState } = get();
          const newState = {
            ...currentState,
            loading: false,
            loggedIn,
            passedWelcomeScreen,
            passedOnboarding,
            session
          };

          set(newState);

          return newState;
        } catch (error) {
          console.error('Initialize failed:', error);
          return null;
        }
      },
      login: async () => {
        try {
          const [cacheOnboarding, cacheSession] = await Promise.all([
            SecureStore.getItemAsync(USER_PASSED_ONBOARDING_KEY),
            SecureStore.getItemAsync(USER_SESSION_KEY)
          ]);
          const passedOnboarding = Boolean(cacheOnboarding);
          const session = JSON.parse(cacheSession || 'null');

          if (!session && passedOnboarding) {
            await Promise.all([
              SecureStore.deleteItemAsync(USER_LOGGED_IN_KEY),
              SecureStore.deleteItemAsync(USER_PASSED_ONBOARDING_KEY),
              SecureStore.deleteItemAsync(USER_SESSION_KEY)
            ]);

            Alert.alert('Login Error', 'Session data is missing. Please log in again.');
            throw new Error('Session data is required to login');
          }

          await SecureStore.setItemAsync(USER_LOGGED_IN_KEY, 'true');

          set({ loggedIn: true, passedOnboarding, session });
          router.replace('/');
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
      logout: async () => {
        try {
          await SecureStore.deleteItemAsync(USER_LOGGED_IN_KEY);
          router.replace('/login');
          set({ ...initialState, loading: false });
        } catch (error) {
          console.error('Logout failed:', error);
        }
      },
      setSession: (session) => {
        set(() => ({ session }));
      },
      passWelcomeScreen: async () => {
        try {
          await SecureStore.setItemAsync(USER_PASSED_WELCOME_SCREEN_KEY, 'true');
          set(() => ({ passedWelcomeScreen: true }));
          router.replace('/login');
        } catch (error) {
          console.error('Unable to pass welcome screen:', error);
        }
      },
      finishOnboarding: async (onboardingData) => {
        try {
          await SecureStore.setItemAsync(USER_PASSED_ONBOARDING_KEY, 'true');
          if (!onboardingData.accountType) {
            throw new Error('Account type is required to finish onboarding');
          }

          if (!onboardingData.personalDetails) {
            throw new Error('Personal details are required to finish onboarding');
          }

          const session: Session = {
            type: onboardingData.accountType,
            firstName: onboardingData.personalDetails.firstName,
            lastName: onboardingData.personalDetails.lastName,
            birthDate: onboardingData.personalDetails.dateOfBirth,
            gender: onboardingData.personalDetails.gender,
            ssn: onboardingData.personalDetails.ssn,
            children: onboardingData.familyCircle
          };

          await SecureStore.setItemAsync(USER_SESSION_KEY, JSON.stringify(session));

          set(() => ({
            session,
            passedOnboarding: true
          }));

          router.replace('/(dashboard)/(tabs)');
        } catch (error) {
          console.error('Unable to finish onboarding:', error);
        }
      }
    }
  }),
  Object.is
);

export const useAuthState = () => useAuthStore(({ actions: _, ...state }) => state, shallow);
export const useAuthActions = () => useAuthStore((state) => state.actions);
