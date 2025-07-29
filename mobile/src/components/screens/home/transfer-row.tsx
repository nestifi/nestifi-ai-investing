import { XStack, YStack } from 'tamagui';

import FailedIcon from '@/assets/icons/failed.svg';
import PendingIcon from '@/assets/icons/pending.svg';
import RandomDudeIcon from '@/assets/icons/random-dude.svg';
import UpcomingIcon from '@/assets/icons/upcoming.svg';
import { Paragraph } from '@/components/paragraph';
import { COLORS } from '@/constants/colors';

type Type = 'error' | 'pending' | 'deposit' | 'gift';

interface Props {
  value: string;
  to: string;
  date: string;
  type: Type;
}

const renderProperIcon = (type: Type) => {
  switch (type) {
    case 'deposit':
      return <PendingIcon />;
    case 'error':
      return <FailedIcon />;
    case 'gift':
      return <RandomDudeIcon />;
    case 'pending':
      return <UpcomingIcon />;
  }
};

const renderProperText = (type: Type, to: string) => {
  switch (type) {
    case 'deposit':
      return `Deposit to ${to}`;
    case 'error':
      return 'Failed';
    case 'gift':
      return `Gift deposit from ${to}`;
    case 'pending':
      return `Deposit to ${to}`;
  }
};

export const TransferRow: React.FC<Props> = ({ value, to, date, type }) => {
  return (
    <XStack gap={12} items="center">
      {renderProperIcon(type)}
      <YStack>
        <Paragraph variant="secondary" color={COLORS.grey[100]}>
          {renderProperText(type, to)}
        </Paragraph>
        <Paragraph variant="small">{date}</Paragraph>
      </YStack>
      <Paragraph ml="auto" color={type === 'error' ? COLORS.system.red : COLORS.grey[100]} fontWeight={700}>
        ${value}
      </Paragraph>
    </XStack>
  );
};
