import CircleIcon from '@/assets/icons/rwas/circle.svg';
import CtrlAltIcon from '@/assets/icons/rwas/ctrl-alt.svg';
import LibreIcon from '@/assets/icons/rwas/libre.svg';
import OndoIcon from '@/assets/icons/rwas/ondo.svg';
import type { MockedItem } from '@/mocks/stocks';

export const RWAS: MockedItem[] = [
  {
    name: 'Ctrl Alt',
    abbr: 'CTRL-ALT',
    value: '$18,515,241',
    change: 0,
    icon: <CtrlAltIcon width={40} height={40} />
  },
  {
    name: 'Libre Capital',
    abbr: 'LIBRE-CAPITAL',
    value: '$1,000',
    change: 0,
    icon: <LibreIcon width={40} height={40} />
  },
  {
    name: 'Ondo',
    abbr: 'ONDO',
    value: '$406,034',
    change: -0.45,
    icon: <OndoIcon width={40} height={40} />
  },
  {
    name: 'Circle',
    abbr: 'CIRCLE',
    value: '$98,324',
    change: -12.39,
    icon: <CircleIcon width={40} height={40} />
  }
];
