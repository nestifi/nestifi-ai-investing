import { styled, Text } from 'tamagui';

import { COLORS } from '@/constants/colors';

export const ErrorMessage = styled(Text, {
  color: COLORS.system.red,
  fontSize: 12
});
