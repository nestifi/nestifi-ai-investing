import { styled, Input as TamaguiInput, YStack, type InputProps } from 'tamagui';

import { ErrorMessage } from '@/components/form/error-message';
import { Label } from '@/components/form/label';
import { COLORS } from '@/constants/colors';

export const StyledInput = styled(TamaguiInput, {
  color: COLORS.grey[100],
  bg: COLORS.white,
  borderColor: COLORS.grey[20],
  placeholderTextColor: COLORS.grey[50],
  rounded: 8,
  variants: {
    hasError: {
      true: {
        borderColor: COLORS.system.red,
        borderWidth: 1
      }
    }
  }
});

interface Props extends InputProps {
  label?: string;
  errorMessage?: string;
}

export const Input: React.FC<Props> = ({ label, id, errorMessage, ...props }) => (
  <YStack gap="$1.5" flex={1}>
    {label && (
      <Label htmlFor={id} lineHeight={16 * 1.5}>
        {label}
      </Label>
    )}
    <StyledInput minW="100%" {...props} id={id} hasError={!!errorMessage} />
    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
  </YStack>
);
