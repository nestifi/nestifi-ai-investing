import { useId } from 'react';
import type { CheckboxProps } from 'tamagui';
import { XStack, Checkbox as TamaguiCheckbox, YStack } from 'tamagui';

import CheckIcon from '@/assets/icons/check.svg';
import { ErrorMessage } from '@/components/form/error-message';
import { Label } from '@/components/form/label';
import { COLORS } from '@/constants/colors';

interface Props extends CheckboxProps {
  label: string | React.ReactElement;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  errorMessage?: string;
}

export const Checkbox: React.FC<Props> = ({
  size,
  label = 'Accept terms and conditions',
  checked,
  errorMessage,
  ...checkboxProps
}) => {
  const id = useId();
  const hasError = !!errorMessage;

  return (
    <YStack width="100%">
      <XStack width="100%" items="center" gap="$4">
        <TamaguiCheckbox
          id={id}
          size={size}
          checked={checked}
          bg={checked ? COLORS.accent[70] : COLORS.white}
          borderWidth={1.5}
          borderColor={hasError ? COLORS.system.red : checked ? COLORS.accent[70] : COLORS.grey[60]}
          {...checkboxProps}
        >
          <TamaguiCheckbox.Indicator>
            <CheckIcon width={14} height={14} color={COLORS.white} />
          </TamaguiCheckbox.Indicator>
        </TamaguiCheckbox>
        <YStack flex={1}>
          <Label size={size} color={COLORS.grey[60]} htmlFor={id} lineHeight={22}>
            {label}
          </Label>
        </YStack>
      </XStack>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </YStack>
  );
};
