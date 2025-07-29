import { useState } from 'react';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { YStack, Text, useWindowDimensions } from 'tamagui';

import { COLORS } from '@/constants/colors';

const CELL_COUNT = 6;

interface Props {
  onChange: (value: string) => void;
}

export const CodeInput: React.FC<Props> = ({ onChange }) => {
  const { width } = useWindowDimensions();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, _getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  const maxWidth = (width - 32 - (CELL_COUNT - 1) * 8) / CELL_COUNT;

  const handleOnChangeText = (value: string) => {
    if (value.length <= CELL_COUNT) {
      setValue(value);
      onChange(value);
    }
  };

  return (
    <CodeField
      ref={ref}
      {...props}
      value={value}
      onChangeText={handleOnChangeText}
      cellCount={CELL_COUNT}
      rootStyle={{ flexDirection: 'row', gap: 8 }}
      keyboardType="number-pad"
      renderCell={({ index, symbol, isFocused }) => (
        <YStack
          key={index}
          width={48}
          height={48}
          maxW={maxWidth}
          borderWidth={1}
          borderColor={isFocused ? COLORS.accent[70] : '#ccc'}
          justify="center"
          items="center"
          rounded={8}
        >
          <Text style={{ textAlign: 'center' }}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
        </YStack>
      )}
    />
  );
};
