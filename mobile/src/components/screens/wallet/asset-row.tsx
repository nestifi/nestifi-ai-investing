import { router } from 'expo-router';
import { XStack, YStack } from 'tamagui';

import { Paragraph } from '@/components/paragraph';
import { TextWithChangeIndicator } from '@/components/screens/wallet/text-with-change-indicator';
import { TouchableOpacityWithFeedback } from '@/components/touchable-opacity-with-feedback';
import { COLORS } from '@/constants/colors';

interface Props {
  name: string;
  abbr: string;
  value: string;
  secondValue?: string;
  change?: number;
  variant?: 'default' | 'bigger';
  title?: string;
  icon: React.ReactElement;
  disabled?: boolean;
}

export const AssetRow: React.FC<Props> = ({
  value,
  name,
  abbr,
  change,
  variant = 'default',
  icon,
  title,
  secondValue,
  disabled = false
}) => {
  return (
    <TouchableOpacityWithFeedback
      activeOpacity={0.9}
      disabled={disabled}
      onPress={() =>
        title &&
        router.navigate({
          pathname: '/(dashboard)/(transactions)/details',
          params: {
            name,
            value,
            change,
            abbr,
            title
          }
        })
      }
    >
      <XStack
        gap={8}
        bg={COLORS.grey[90]}
        borderWidth={1}
        borderColor={COLORS.grey[80]}
        rounded={8}
        py={8}
        px={12}
        items="center"
      >
        {icon}
        <YStack>
          <Paragraph variant="secondary" color={COLORS.grey[0]}>
            {name}
          </Paragraph>
          <Paragraph variant="small" color={COLORS.grey[30]}>
            {abbr}
          </Paragraph>
        </YStack>
        <YStack ml="auto" gap={4} items="flex-end" justify="center">
          <Paragraph
            variant="secondary"
            text="right"
            fontSize={variant === 'bigger' ? 18 : 14}
            lineHeight={variant === 'bigger' ? 18 : 14}
            fontWeight={variant === 'bigger' ? 600 : 500}
            color={COLORS.grey[0]}
          >
            {value}
          </Paragraph>
          {typeof change === 'number' && (
            <Paragraph variant="secondary">
              {secondValue && (
                <Paragraph variant="secondary" color={COLORS.grey[30]}>
                  {secondValue}{' '}
                </Paragraph>
              )}
              <TextWithChangeIndicator value={change} fontSize={variant === 'bigger' ? 14 : 10} />
            </Paragraph>
          )}
        </YStack>
      </XStack>
    </TouchableOpacityWithFeedback>
  );
};
