import { styled, View, RadioGroup as TamaguiRadioGroup, useEvent, YStack, Circle, XStack } from 'tamagui';

import { ErrorMessage } from '@/components/form/error-message';
import { Label } from '@/components/form/label';
import { Paragraph } from '@/components/paragraph';
import { COLORS } from '@/constants/colors';

export const RadioButtonCard = styled(View, {
  cursor: 'pointer',
  width: '100%',
  rounded: 8,
  p: 16,
  bg: 'transparent',
  borderColor: COLORS.grey[20],
  borderWidth: 1,
  focusStyle: {
    bg: COLORS.accent[50]
  },
  pressStyle: {
    bg: COLORS.accent[50]
  }
});

interface Item {
  title: string | React.ReactElement;
  description?: string | React.ReactElement;
  id: string;
}

interface Props {
  items: readonly Item[];
  value: string;
  errorMessage?: string;
  setValue: (value: string) => void;
}

export const RadioGroupCards: React.FC<Props> = ({ items, value, setValue }) => {
  return (
    <TamaguiRadioGroup value={value} onValueChange={setValue} minWidth="100%" gap={16}>
      {items.map((item) => (
        <Item item={item} key={item.id} selected={value === item.id} setValue={setValue} />
      ))}
    </TamaguiRadioGroup>
  );
};

const Item = ({ selected, setValue, item }: { selected: boolean; setValue: (value: string) => void; item: Item }) => {
  const { description, id, title } = item;
  const onPress = useEvent(() => setValue(id));

  return (
    <RadioButtonCard flexDirection="row" gap="$3" onPress={onPress}>
      <View onPress={(e) => e.stopPropagation()} width={24}>
        <TamaguiRadioGroup.Item id={id} value={id} borderColor={COLORS.accent[90]} bg={COLORS.white}>
          {selected && <Circle bg={COLORS.accent[90]} width={14} height={14} />}
        </TamaguiRadioGroup.Item>
      </View>
      <YStack gap={8} flex={1}>
        {typeof title === 'string' ? (
          <Label htmlFor={id} lineHeight={20} fontWeight="500" color={COLORS.grey[100]}>
            {title}
          </Label>
        ) : (
          title
        )}
        <Paragraph>{description}</Paragraph>
      </YStack>
    </RadioButtonCard>
  );
};

export const RadioGroup: React.FC<Props> = ({ items, value, errorMessage, setValue }) => {
  return (
    <TamaguiRadioGroup value={value} onValueChange={setValue} minWidth="100%" gap={16}>
      {items.map((item) => (
        <XStack key={item.id} gap={8}>
          <View onPress={(e) => e.stopPropagation()} items="center" justify="center" width={24}>
            <TamaguiRadioGroup.Item id={item.id} value={item.id} borderColor={COLORS.accent[90]} bg={COLORS.white}>
              {value === item.id && <Circle bg={COLORS.accent[90]} width={14} height={14} />}
            </TamaguiRadioGroup.Item>
          </View>
          <Label htmlFor={item.id}>{item.title}</Label>
        </XStack>
      ))}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </TamaguiRadioGroup>
  );
};
