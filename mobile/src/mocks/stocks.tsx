import AppleIcon from '@/assets/icons/stocks/apple.svg';
import TeslaIcon from '@/assets/icons/stocks/tesla.svg';

export interface MockedItem {
  name: string;
  abbr: string;
  value: string;
  change: number;
  icon: React.ReactElement;
}

export const STOCKS: MockedItem[] = [
  {
    name: 'Apple',
    abbr: 'AAPL',
    value: '$125.15',
    change: 0.03,
    icon: <AppleIcon width={40} height={40} />
  },
  {
    name: 'Tesla',
    abbr: 'TSLA',
    value: '$400.58',
    change: -0.03,
    icon: <TeslaIcon width={40} height={40} />
  }
];
