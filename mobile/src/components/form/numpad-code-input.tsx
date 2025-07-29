import { useState } from 'react';
import { YStack, XStack, Button, Text, Circle } from 'tamagui';

import { COLORS } from '@/constants/colors';

const PASSCODE_LENGTH = 6;

interface Props {
  onChange: (array: string[]) => void;
}

export const NumpadCodeInput: React.FC<Props> = ({ onChange }) => {
  const [code, setCode] = useState<string[]>([]);

  const handleKeyPress = (digit: string) => {
    if (code.length < PASSCODE_LENGTH) {
      setCode([...code, digit]);
      onChange([...code, digit]);
    }
  };

  const renderDots = () => (
    <XStack gap="$2" justify="center" mb="$4">
      {Array.from({ length: PASSCODE_LENGTH }).map((_, i) => (
        <Circle key={i} size={12} bg={i < code.length ? COLORS.grey[100] : COLORS.grey[20]} />
      ))}
    </XStack>
  );

  const renderNumpad = () => {
    const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    return (
      <YStack gap="$6">
        {[0, 1, 2, 3].map((rowIdx) => (
          <XStack key={rowIdx} gap="$6" justify="center">
            {digits.slice(rowIdx * 3, rowIdx * 3 + 3).map((key, idx) => (
              <Button
                key={idx}
                width={80}
                height={80}
                rounded="$12"
                color={COLORS.grey[100]}
                bg={COLORS.accent[50]}
                pressStyle={{ bg: COLORS.accent[60], borderColor: COLORS.accent[60] }}
                onPress={() => handleKeyPress(key)}
              >
                <Text color={COLORS.grey[100]} fontSize={28}>
                  {key}
                </Text>
              </Button>
            ))}
          </XStack>
        ))}
      </YStack>
    );
  };

  return (
    <YStack justify="center" py="$4" gap="$8" grow={1}>
      {renderDots()}
      {renderNumpad()}
    </YStack>
  );
};
