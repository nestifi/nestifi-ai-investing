import { XStack, YStack, Text, View } from 'tamagui';

import { ErrorMessage } from '@/components/form/error-message';
import { Paragraph } from '@/components/paragraph';
import { PressableWithFeedback } from '@/components/pressable-with-feedback';
import { COLORS } from '@/constants/colors';

interface AmountInputProps {
  value: number;
  onChange: (value: number) => void;
  step?: number;
  disabled?: boolean;
  min?: number;
  max?: number;
  errorMessage?: string;
  currency?: string;
  showCurrentAmount?: boolean;
}

const BUTTON_SIZE = 40;

export function AmountInput({
  value,
  errorMessage,
  onChange,
  step = 50,
  disabled = false,
  min = 0,
  max,
  currency,
  showCurrentAmount = false
}: AmountInputProps) {
  const handleIncrease = () => {
    if (disabled || (max !== undefined && value + step > max)) return;
    onChange(value + step);
  };

  const handleDecrease = () => {
    if (disabled || value - step < min) return;
    onChange(value - step);
  };

  return (
    <YStack width={248} mx="auto" items="center" gap="$2">
      <XStack width="100%" items="center" justify="space-between">
        <PressableWithFeedback onPress={handleDecrease} disabled={disabled || value <= min}>
          <View
            width={BUTTON_SIZE}
            height={BUTTON_SIZE}
            rounded={BUTTON_SIZE / 2}
            borderWidth={1}
            borderColor={COLORS.grey[20]}
            items="center"
            justify="center"
            opacity={disabled || value <= min ? 0.5 : 1}
          >
            <Text color={COLORS.system.red} fontSize={20}>
              —
            </Text>
          </View>
        </PressableWithFeedback>
        <Text fontSize={24} fontWeight="600" color={COLORS.grey[90]} text="center">
          ${value.toFixed(0)}
          {currency ? ` ${currency}` : ''}
        </Text>
        <PressableWithFeedback onPress={handleIncrease} disabled={disabled || (max !== undefined && value >= max)}>
          <View
            width={BUTTON_SIZE}
            height={BUTTON_SIZE}
            rounded={BUTTON_SIZE / 2}
            borderWidth={1}
            borderColor={COLORS.grey[20]}
            items="center"
            justify="center"
            opacity={disabled || (max !== undefined && value >= max) ? 0.5 : 1}
          >
            <Text color={COLORS.system.green} fontSize={24}>
              +
            </Text>
          </View>
        </PressableWithFeedback>
      </XStack>
      {showCurrentAmount && (
        <Paragraph fontSize={12} color={COLORS.grey[60]}>
          Current amount: <Text color={COLORS.grey[100]}>$1250{currency ? ` ${currency}` : ''}</Text>
        </Paragraph>
      )}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </YStack>
  );
}
