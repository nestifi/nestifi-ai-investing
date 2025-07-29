import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SizableText, XStack, YStack } from 'tamagui';

import AdidasIcon from '@/assets/icons/rewards/adidas.svg';
import AirBnbIcon from '@/assets/icons/rewards/airbnb.svg';
import AmazonIcon from '@/assets/icons/rewards/amazon.svg';
import AppleIcon from '@/assets/icons/rewards/apple.svg';
import DisneyIcon from '@/assets/icons/rewards/disney.svg';
import EbayIcon from '@/assets/icons/rewards/ebay.svg';
import FexedIcon from '@/assets/icons/rewards/fedex.svg';
import GoogleIcon from '@/assets/icons/rewards/google.svg';
import LyftIcon from '@/assets/icons/rewards/lyft.svg';
import McDonaldIcon from '@/assets/icons/rewards/mcdonald.svg';
import UberIcon from '@/assets/icons/rewards/uber.svg';
import UberEeatsIcon from '@/assets/icons/rewards/ubereats.svg';
import { Button } from '@/components/button';
import { BackButton } from '@/components/layout/back-button';
import { BaseLayout } from '@/components/layout/base-layout';
import { Paragraph } from '@/components/paragraph';
import { RewardItem } from '@/components/screens/rewards/reward-item';
import { Sheet } from '@/components/sheet';
import { TouchableOpacityWithFeedback } from '@/components/touchable-opacity-with-feedback';
import { COLORS } from '@/constants/colors';

export default function Screen() {
  const [open, setOpen] = useState(false);
  return (
    <BaseLayout grow={1}>
      <StatusBar style="dark" />
      <BackButton title="Rewards" />
      <Paragraph>
        Redeem Your{' '}
        <SizableText fontSize={16} fontWeight={500} color={COLORS.grey[100]}>
          $NESTIFI
        </SizableText>{' '}
        Tokens for Exciting Rewards!
      </Paragraph>
      <TouchableOpacityWithFeedback onPress={() => setOpen(true)}>
        <Paragraph fontWeight={500} mt={8} mb={16} color={COLORS.accent[90]} text="right">
          What is $NESTIFI Token?
        </Paragraph>
      </TouchableOpacityWithFeedback>
      <YStack gap={16} mb={32}>
        <XStack gap={13}>
          <RewardItem value={5} name="Disney + Subscription" icon={<DisneyIcon width="100%" height="100%" />} />
          <RewardItem value={10} name="Amazon Gift Card" icon={<AmazonIcon width="100%" height="100%" />} />
          <RewardItem value={30} name="Google Education" icon={<GoogleIcon width="100%" height="100%" />} />
        </XStack>
        <XStack gap={13}>
          <RewardItem value={45} name="Adidas Gift Card" icon={<AdidasIcon width="100%" height="100%" />} />
          <RewardItem value={50} name="McDonald's Voucher" icon={<McDonaldIcon width="100%" height="100%" />} />
          <RewardItem value={60} name="Lyft Credit" icon={<LyftIcon width="100%" height="100%" />} />
        </XStack>
        <XStack gap={13}>
          <RewardItem value={90} disabled name="Store" icon={<AppleIcon width="100%" height="100%" />} />
          <RewardItem
            value={100}
            disabled
            name="Uber Eats Discount"
            icon={<UberEeatsIcon width="100%" height="100%" />}
          />
          <RewardItem value={120} disabled name="FedEx Discount" icon={<FexedIcon width="100%" height="100%" />} />
        </XStack>
        <XStack gap={13}>
          <RewardItem value={130} disabled name="Ebay Discount" icon={<EbayIcon width="100%" height="100%" />} />
          <RewardItem value={145} disabled name="Airbnb Gift Card" icon={<AirBnbIcon width="100%" height="100%" />} />
          <RewardItem value={160} disabled name="Uber Credit" icon={<UberIcon width="100%" height="100%" />} />
        </XStack>
      </YStack>
      <Sheet open={open} setOpen={setOpen} title="What is $NESTIFI token?">
        <Paragraph mb={24}>
          <Paragraph fontWeight={500} color={COLORS.grey[100]}>
            $NESTIFI
          </Paragraph>{' '}
          is our exclusive reward token. Earn tokens for consistent investments, referrals, and engagement. Redeem them
          for exciting rewards from top brands!
        </Paragraph>
        <Paragraph mb={8} fontWeight={500} color={COLORS.grey[100]}>
          Earning examples
        </Paragraph>
        <YStack mb={24}>
          <Paragraph color={COLORS.grey[80]}>• Deposit weekly to earn 5 $NESTIFI</Paragraph>
          <Paragraph color={COLORS.grey[80]}>
            • Refer a friend and earn 10 $NESTIFI when they complete their first deposit.
          </Paragraph>
          <Paragraph color={COLORS.grey[80]}>
            • Stay engaged and earn bonus tokens for milestones like completing goals or inviting family members to your
            circle.
          </Paragraph>
        </YStack>
        <Button
          variant="primary"
          width="100%"
          onPress={() => {
            setOpen(false);
          }}
        >
          Redeem Tokens for Rewards!
        </Button>
      </Sheet>
    </BaseLayout>
  );
}
