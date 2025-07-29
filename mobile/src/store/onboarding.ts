import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import type { FutureGoal } from '@/constants/future-goals';
import type { AccountType } from '@/store/auth';

export interface FamilyCircleMember {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
}

export type FrequencyType = 'weekly' | 'monthly';

export interface Investment {
  payWith: string;
  product: string;
  amount: number;
  frequency: {
    type: FrequencyType;
    day: string;
  };
}
export interface Child {
  id: number;
  photo: string | null;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  guardianPhone: string;
  guardianEmail: string;
  ssn: string;
  futureGoals: FutureGoal[];
  familyCircle: FamilyCircleMember[];
  investment: Investment | null;
}

export interface OnboardingState {
  accountType: AccountType | null;
  personalDetails: {
    photo: string | null;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    ssn: string;
  } | null;
  incomeInformation: {
    employmentStatus: string;
    annualIncome: string;
    federalTaxBracket: string;
  } | null;
  familyCircle: Child[];
}

interface Actions {
  actions: {
    resetState: () => void;
    setAccountType: (accountType: OnboardingState['accountType']) => void;
    setPersonalDetails: (personalDetails: OnboardingState['personalDetails']) => void;
    setIncomeInformation: (incomeInformation: OnboardingState['incomeInformation']) => void;
    addChild: (child: Child) => void;
    removeChild: (childId: number) => void;
    updateChildFutureGoals: (childId: number, futureGoals: Child['futureGoals']) => void;
    updateChildFamilyCircle: (childId: number, familyCircle: Child['familyCircle']) => void;
    updateChildInvestment: (childId: number, investment: Child['investment']) => void;
  };
}

const initialState: OnboardingState = {
  accountType: null,
  personalDetails: null,
  incomeInformation: null,
  familyCircle: []
};

export const useOnboardingStore = createWithEqualityFn<OnboardingState & Actions>(
  (set) => ({
    ...initialState,
    actions: {
      resetState: () => {
        set(() => initialState);
      },
      setAccountType: (accountType) => {
        set(() => ({ accountType }));
      },
      setPersonalDetails: (personalDetails) => {
        set(() => ({ personalDetails }));
      },
      setIncomeInformation: (incomeInformation) => {
        set(() => ({ incomeInformation }));
      },
      addChild: (child) => {
        set((state) => {
          const childExists = state.familyCircle.some((existingChild) => existingChild.id === child.id);
          if (childExists) return state;
          return { familyCircle: [...state.familyCircle, child] };
        });
      },
      removeChild: (childId) => {
        set((state) => ({
          familyCircle: state.familyCircle.filter((child) => child.id !== childId)
        }));
      },
      updateChildFutureGoals: (childId, futureGoals) => {
        set((state) => ({
          familyCircle: state.familyCircle.map((child) => (child.id === childId ? { ...child, futureGoals } : child))
        }));
      },
      updateChildFamilyCircle: (childId, familyCircle) => {
        set((state) => ({
          familyCircle: state.familyCircle.map((child) => (child.id === childId ? { ...child, familyCircle } : child))
        }));
      },
      updateChildInvestment: (childId, investment) => {
        set((state) => ({
          familyCircle: state.familyCircle.map((child) => (child.id === childId ? { ...child, investment } : child))
        }));
      }
    }
  }),
  Object.is
);

export const useOnboardingState = () => useOnboardingStore(({ actions: _, ...state }) => state, shallow);
export const useOnboardingActions = () => useOnboardingStore((state) => state.actions);
