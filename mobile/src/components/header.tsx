import { styled } from '@tamagui/core';
import { H1 as TamaguiH1, H2 as TamaguiH2, H3 as TamaguiH3, Heading } from 'tamagui';

import { COLORS } from '@/constants/colors';

const BASE_HEADER_COLOR = COLORS.grey[100];

export const H1 = styled(TamaguiH1, {
  fontSize: 32,
  lineHeight: 32 * 1.2,
  fontWeight: 500,
  color: BASE_HEADER_COLOR
});

export const H2 = styled(TamaguiH2, {
  fontSize: 24,
  lineHeight: 24 * 1.3,
  fontWeight: 500,
  color: BASE_HEADER_COLOR
});

export const H3 = styled(TamaguiH3, {
  fontSize: 20,
  lineHeight: 20 * 1.4,
  fontWeight: 500,
  color: BASE_HEADER_COLOR
});

export const Tiny = styled(Heading, {
  fontSize: 10,
  lineHeight: 10 * 1.5,
  fontWeight: 500,
  color: BASE_HEADER_COLOR
});
