import { styled, Paragraph as TamaguiParagraph } from 'tamagui';

import { COLORS } from '@/constants/colors';

const LINE_HEIGHT = 1.5;

const StyledParagraph = styled(TamaguiParagraph);

const HigherOrderParagraph = StyledParagraph.styleable((props, ref) => <StyledParagraph ref={ref} {...props} />);

export const Paragraph = styled(HigherOrderParagraph, {
  color: COLORS.grey[60],
  variants: {
    variant: {
      primary: {
        fontSize: 16,
        lineHeight: 16 * LINE_HEIGHT,
        fontWeight: 400
      },
      secondary: {
        fontSize: 14,
        lineHeight: 14 * LINE_HEIGHT,
        fontWeight: 400
      },
      small: {
        fontSize: 12,
        lineHeight: 12 * LINE_HEIGHT,
        fontWeight: 400
      }
    }
  } as const,
  defaultVariants: {
    variant: 'primary'
  }
});
