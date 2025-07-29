import { useState } from 'react';
import { Paragraph, useWindowDimensions, View, XStack, YStack } from 'tamagui';

import { ErrorMessage } from '@/components/form/error-message';
import { Tabs, type Option } from '@/components/tabs';
import { TouchableOpacityWithFeedback } from '@/components/touchable-opacity-with-feedback';
import { COLORS } from '@/constants/colors';
import type { FrequencyType } from '@/store/onboarding';

const weekly = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const monthly = [
  'Su',
  'Mo',
  'Tu',
  'We',
  'Th',
  'Fr',
  'Sa',
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30
];

interface Props {
  errorMessage?: string;
  onChange: (value: string | number, type: FrequencyType) => void;
}

export const PlaceholderCalendar = ({ onChange, errorMessage }: Props) => {
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const options: Option[] = [
    {
      content: (
        <XStack flexWrap="nowrap" gap={10}>
          {weekly.map((el, idx) => (
            <TouchableOpacityWithFeedback
              key={idx + 'a'}
              onPress={() => {
                setActiveIndex(idx);
                onChange(idx, 'weekly');
              }}
            >
              <Paragraph
                color={idx === activeIndex ? COLORS.white : COLORS.grey[60]}
                rounded={20}
                py={8}
                text="center"
                bg={idx === activeIndex ? COLORS.accent[90] : 'transparent'}
                minW={(width - 10 * 6 - 32 - 32 - 4) / 7}
              >
                {el}
              </Paragraph>
            </TouchableOpacityWithFeedback>
          ))}
        </XStack>
      ),
      label: 'Weekly',
      value: 'weekly'
    },
    {
      content: (
        <XStack flexWrap="wrap" gap={10}>
          {monthly.map((el, idx) => (
            <TouchableOpacityWithFeedback
              key={idx + 'b'}
              disabled={idx <= 6} // Disable first 7 elements (Su, Mo, Tu, We, Th, Fr, Sa)
              onPress={() => {
                if (idx > 6) {
                  setActiveIndex(idx);
                  onChange(el, 'monthly');
                }
              }}
            >
              <Paragraph
                color={idx === activeIndex ? COLORS.white : idx > 6 ? COLORS.grey[100] : COLORS.grey[60]}
                rounded={24}
                py={8}
                text="center"
                lineHeight={26}
                bg={idx === activeIndex ? COLORS.accent[90] : 'transparent'}
                minW={(width - 10 * 6 - 32 - 32 - 4) / 7}
              >
                {el}
              </Paragraph>
            </TouchableOpacityWithFeedback>
          ))}
        </XStack>
      ),
      label: 'Monthly',
      value: 'monthly'
    }
  ];

  return (
    <YStack gap={2}>
      <View borderColor={COLORS.grey[20]} borderWidth={1} rounded={16} p={16} my={16}>
        <Tabs options={options} defaultValue="monthly" />
      </View>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </YStack>
  );
};
