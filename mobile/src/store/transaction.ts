import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { roundToTwoDecimals } from '@/utils/round-to-two-decimals';

interface InvestmentDetails {
  email: string;
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
  cardholderName: string;
  country: string;
  region: string;
}

interface TransactionState {
  amount: number;
  fee: number;
  total: number;
  feePercentage: number;
  investmentDetails: InvestmentDetails | null;
}

interface Actions {
  actions: {
    resetState: () => void;
    setAmount: (amount: TransactionState['amount']) => void;
    setInvestmentDetails: (investmentDetails: TransactionState['investmentDetails']) => void;
  };
}

const initialState: TransactionState = {
  feePercentage: 0.05, // 5% fee
  amount: 0,
  fee: 0,
  total: 0,
  investmentDetails: null
};

export const useTransactionStore = createWithEqualityFn<TransactionState & Actions>(
  (set) => ({
    ...initialState,
    actions: {
      resetState: () => {
        set(() => initialState);
      },
      setAmount: (amount) => {
        const fee = roundToTwoDecimals(amount * initialState.feePercentage);
        const total = roundToTwoDecimals(amount + fee);
        set(() => ({ amount, fee, total }));
      },
      setInvestmentDetails: (investmentDetails) => {
        set(() => ({ investmentDetails }));
      }
    }
  }),
  Object.is
);

export const useTransactionState = () => useTransactionStore(({ actions: _, ...state }) => state, shallow);
export const useTransactionActions = () => useTransactionStore((state) => state.actions);
