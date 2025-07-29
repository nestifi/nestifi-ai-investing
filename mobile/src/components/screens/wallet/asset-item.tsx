import { View, YStack } from 'tamagui';

import { Paragraph } from '@/components/paragraph';
import { TextWithChangeIndicator } from '@/components/screens/wallet/text-with-change-indicator';
import { COLORS } from '@/constants/colors';

interface Props {
  name: string;
  change: number;
  icon: React.ReactElement;
}

export const AssetItem: React.FC<Props> = ({ name, change, icon }) => {
  return (
    <View flex={1}>
      <YStack gap={8} justify="center" items="center">
        {icon}
        <YStack gap={1} justify="center">
          <Paragraph fontWeight={500} variant="secondary" color={COLORS.grey[100]}>
            {name}
          </Paragraph>
          <TextWithChangeIndicator value={change} />
        </YStack>
      </YStack>
    </View>
  );
};
