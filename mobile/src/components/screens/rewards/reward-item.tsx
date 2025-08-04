import { useState } from 'react';
import { View, XStack, YStack } from 'tamagui';

import CopyIcon from '@/assets/icons/copy.svg';
import { Button } from '@/components/button';
import { H2 } from '@/components/header';
import { Paragraph } from '@/components/paragraph';
import { Sheet } from '@/components/sheet';
import { TouchableOpacityWithFeedback } from '@/components/touchable-opacity-with-feedback';
import { COLORS } from '@/constants/colors';

interface Props {
  value: number;
  name: string;
  icon: React.ReactElement;
  disabled?: boolean;
}

export const RewardItem: React.FC<Props> = ({ value, name, icon, disabled = false }) => {
  const [open, setOpen] = useState(false);
  const [redeemed, setRedeemed] = useState(false);
  return (
    <View flex={1}>
      <TouchableOpacityWithFeedback activeOpacity={0.8} disabled={disabled} onPress={() => setOpen(true)}>
        <YStack gap={8} height={150} p={8} rounded={8} bg="#F4F4F8" items="center">
          <View width={64} height={64} opacity={disabled ? 0.15 : 1}>
            {icon}
          </View>
          <YStack gap={4} justify="center" items="center" pointerEvents="none">
            <Paragraph fontWeight={700} variant="secondary" color={COLORS.grey[100]}>
              {value} $NESTIFI
            </Paragraph>
            <Paragraph variant="small" lineHeight={14} text="center">
              {name}
            </Paragraph>
          </YStack>
        </YStack>
      </TouchableOpacityWithFeedback>
      <Sheet open={open} setOpen={setOpen}>
        <YStack items="center">
          <View width={120} height={120} mb={24}>
            {icon}
          </View>
          <H2 text="center" mb={8}>
            {value} $NESTIFI Tokens
          </H2>
          <Paragraph color={COLORS.grey[60]} text="center" mb={24}>
            {name} for 1 month
          </Paragraph>
          <Paragraph text="center" color={COLORS.grey[70]} mb={24}>
            Access premium Rewards content for consistent deposits
          </Paragraph>
          <Button
            variant="primary"
            width="100%"
            onPress={() => {
              setRedeemed(true);
              setOpen(false);
            }}
          >
            Redeem
          </Button>
        </YStack>
      </Sheet>
      <Sheet open={redeemed} setOpen={setRedeemed}>
        <H2 text="center" mb={8}>
          Copy code
        </H2>
        <Paragraph>
          Copy this code and go to{' '}
          <Paragraph textDecorationLine="underline" fontWeight={500} color={COLORS.grey[100]}>
            reward.com
          </Paragraph>{' '}
          to redeem.
        </Paragraph>
        <XStack my={24} p={12} borderWidth={1} borderColor={COLORS.grey[20]} rounded={8} justify="space-between">
          <Paragraph color={COLORS.grey[100]}>36ICJS23K</Paragraph>
          <CopyIcon />
        </XStack>
        <Button
          variant="primary"
          width="100%"
          onPress={() => {
            setRedeemed(false);
          }}
        >
          Continue
        </Button>
      </Sheet>
    </View>
  );
};
