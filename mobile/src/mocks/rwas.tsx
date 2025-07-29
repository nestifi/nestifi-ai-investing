import CircleIcon from '@/assets/icons/rwas/circle.svg';
import CtrlAltIcon from '@/assets/icons/rwas/ctrl-alt.svg';
import LibreIcon from '@/assets/icons/rwas/libre.svg';
import OndoIcon from '@/assets/icons/rwas/ondo.svg';
import type { MockedItem } from '@/mocks/stocks';

export const RWAS: MockedItem[] = [
  {
    name: 'Ctrl Alt',
    abbr: 'CTRL-ALT',
    value: '$117.7M',
    change: 0,
    icon: <CtrlAltIcon width={40} height={40} />
  },
  {
    name: 'Libre Capital',
    abbr: 'LIBRE-CAPITAL',
    value: '$1.5M',
    change: 0,
    icon: <LibreIcon width={40} height={40} />
  },
  {
    name: 'Ondo',
    abbr: 'ONDO',
    value: '$0.4M',
    change: 1,
    icon: <OndoIcon width={40} height={40} />
  },
  {
    name: 'Circle',
    abbr: 'CIRCLE',
    value: '$0.1M',
    change: -11.75,
    icon: <CircleIcon width={40} height={40} />
  }
];
