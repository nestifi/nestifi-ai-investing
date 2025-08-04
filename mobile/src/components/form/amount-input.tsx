import { useRef } from 'react';
import { TextInput } from 'react-native';
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
  const inputRef = useRef<TextInput>(null);
  const fontSize = 24;
  const lineHeight = 24 * 1.6;

  const handleIncrease = () => {
    if (disabled || (max !== undefined && value + step > max)) return;
    onChange(value + step);
  };

  const handleDecrease = () => {
    if (disabled || value - step < min) return;
    onChange(value - step);
  };

  return (
    <YStack width={280} mx="auto" items="center" gap="$2">
      <XStack gap={16} width="100%" items="center" justify="space-between">
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
        <XStack
          items="center"
          onPress={() => {
            inputRef.current?.focus();
          }}
        >
          <Paragraph fontSize={fontSize} lineHeight={lineHeight} fontWeight={600} color={COLORS.grey[90]}>
            $
          </Paragraph>
          <TextInput
            ref={inputRef}
            numberOfLines={1}
            allowFontScaling
            value={`${value}`}
            onChangeText={(text) => onChange(!!text ? Number(text.replace(/[^0-9]/g, '')) : 0)}
            keyboardType="numeric"
            maxLength={5}
            placeholder="0"
            placeholderTextColor={COLORS.grey[20]}
            style={{
              maxWidth: 180,
              color: COLORS.grey[90],
              padding: 10,
              fontWeight: 600,
              fontSize,
              paddingHorizontal: 0,
              paddingVertical: 0
            }}
          />
          <Paragraph ml={4} fontSize={fontSize} lineHeight={lineHeight} fontWeight={600} color={COLORS.grey[90]}>
            {currency ? ` ${currency}` : ''}
          </Paragraph>
        </XStack>
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
          Current amount:{' '}
          <Text color={COLORS.grey[100]}>
            ${value.toFixed(0)}
            {currency ? ` ${currency}` : ''}
          </Text>
        </Paragraph>
      )}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </YStack>
  );
}
