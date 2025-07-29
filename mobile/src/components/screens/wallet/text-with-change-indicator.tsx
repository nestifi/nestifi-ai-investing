import type { ParagraphProps } from 'tamagui';

import TriangleDown from '@/assets/icons/triangle-down.svg';
import TriangleUp from '@/assets/icons/triangle-up.svg';
import { Paragraph } from '@/components/paragraph';
import { COLORS } from '@/constants/colors';

interface Props extends ParagraphProps {
  value: number;
}

export const TextWithChangeIndicator: React.FC<Props> = ({ value, ...props }) => {
  return (
    <Paragraph
      variant="secondary"
      fontSize={10}
      lineHeight={10}
      color={value > 0 ? '#3C9A03' : value === 0 ? COLORS.white : '#FF5C5C'}
      text="right"
      {...props}
    >
      {value > 0 ? <TriangleUp /> : <TriangleDown color={value === 0 ? COLORS.white : COLORS.system.red} />}{' '}
      {Math.abs(value)}%
    </Paragraph>
  );
};
