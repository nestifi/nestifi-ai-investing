import FidelityIcon from '@/assets/icons/etfs/fidelity.svg';
import ISharesIcon from '@/assets/icons/etfs/ishares.svg';
import type { MockedItem } from '@/mocks/stocks';

export const ETFS: MockedItem[] = [
  {
    name: 'iShares Bitcoin Trust',
    abbr: 'IBIT',
    value: '$61.83',
    change: -0.1,
    icon: <ISharesIcon width={40} height={40} />
  },
  {
    name: 'Fidelity Wise Origin',
    abbr: 'FBTC',
    value: '$94.98',
    change: 0.85,
    icon: <FidelityIcon width={40} height={40} />
  }
];
