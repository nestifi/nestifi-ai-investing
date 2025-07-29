import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { YStack, XStack, View, Avatar } from 'tamagui';

import DepositIcon from '@/assets/icons/deposit.svg';
import FirstDepositIcon from '@/assets/icons/first-deposit.svg';
import GoalsIcon from '@/assets/icons/goals.svg';
import ProfileIcon from '@/assets/icons/profile.svg';
import RewardsIcon from '@/assets/icons/rewards.svg';
import ShareIcon from '@/assets/icons/share-2.svg';
import StatsIcon from '@/assets/icons/stats.svg';
import UserSettingsIcon from '@/assets/icons/user-settings.svg';
import { ContentWrapper } from '@/components/content-wrapper';
import { H1, H2, H3 } from '@/components/header';
import { BaseLayout } from '@/components/layout/base-layout';
import { Paragraph } from '@/components/paragraph';
import { HomeBannerCarousel } from '@/components/screens/home/carousel';
import { GiftDepositSheet } from '@/components/screens/home/gift-deposit-sheet';
import { SharePaymentLinkSheet } from '@/components/screens/home/share-payment-link-sheet';
import { TransferRow } from '@/components/screens/home/transfer-row';
import { Tabs, type Option } from '@/components/tabs';
import { TouchableOpacityWithFeedback } from '@/components/touchable-opacity-with-feedback';
import { COLORS } from '@/constants/colors';
import { childAvatarImageUri } from '@/constants/images';
import { useAuthState } from '@/store/auth';

export default function HomePage() {
  const [giftDepositOpen, setGiftDepositOpen] = useState(false);
  const [sharePaymentLinkOpen, setSharePaymentLinkOpen] = useState(false);
  const router = useRouter();
  const { session } = useAuthState();
  const options: Option[] = [
    {
      content: (
        <YStack flexWrap="nowrap" gap={10} mb={16}>
          <TransferRow value="100.00" to="Dan" date="1 June" type="deposit" />
          <TransferRow value="65.00" to="Dan" date="22 May" type="gift" />
          <TransferRow value="2222.00" to="Jurek" date="12 May" type="error" />
          <TransferRow value="10.00" to="Dan" date="11 May" type="deposit" />
        </YStack>
      ),
      label: 'Past',
      value: 'past'
    },
    {
      content: (
        <YStack flexWrap="nowrap" gap={10} mb={16}>
          <TransferRow value="23.00" to="Dan" date="16 June" type="pending" />
          <TransferRow value="65.00" to="Dan" date="16 June" type="pending" />
          <TransferRow value="100.00" to="Jurek" date="16 June" type="pending" />
          <TransferRow value="21.37" to="Dan" date="16 June" type="pending" />
        </YStack>
      ),
      label: 'Upcoming',
      value: 'upcoming'
    }
  ];

  return (
    <BaseLayout grow={1} px={0}>
      <StatusBar style="light" />
      <ContentWrapper>
        <XStack justify="space-between" items="center" py={16}>
          <TouchableOpacityWithFeedback
            activeOpacity={0.85}
            onPress={() => router.navigate('/(dashboard)/(tabs)/profile')}
          >
            <ProfileIcon />
          </TouchableOpacityWithFeedback>
          <H2 color={COLORS.grey[0]}>Home</H2>
          <DepositIcon />
        </XStack>
        <H1 color={COLORS.grey[0]}>{session?.type === 'CHILD' ? 'Welcome Back, Dan!' : 'Welcome Back, Robert!'}</H1>
        <Paragraph color={COLORS.grey[30]} mb={16} onPress={() => router.navigate('/(public)/invite/123')}>
          Your Financial Goals Are On Track!
        </Paragraph>

        {session?.type === 'CHILD' ? (
          <XStack
            items="center"
            py={18}
            px={16}
            mb={16}
            style={{
              flex: 1,
              gap: 16,
              marginLeft: 6,
              marginRight: 6,
              borderWidth: 1,
              borderRadius: 12,
              backgroundColor: COLORS.additional.blue
            }}
          >
            <Avatar circular size="$7">
              <Avatar.Image src={childAvatarImageUri} />
              <Avatar.Fallback backgroundColor={COLORS.accent[60]} />
            </Avatar>
            <YStack gap={3} pointerEvents="none">
              <Paragraph color={COLORS.grey[70]}>Dan Williams</Paragraph>
              <H1 color={COLORS.grey[100]}>$30,600.00</H1>
            </YStack>
          </XStack>
        ) : (
          <HomeBannerCarousel />
        )}

        <XStack flexWrap="nowrap" width="100%" py={16} mb={16}>
          {session?.type !== 'CHILD' && (
            <View flex={1}>
              <TouchableOpacityWithFeedback activeOpacity={0.85} onPress={() => setGiftDepositOpen(true)}>
                <YStack gap={8} items="center">
                  <RewardsIcon />
                  <Paragraph text="center" color={COLORS.grey[40]} variant="small">
                    Gift deposit
                  </Paragraph>
                </YStack>
              </TouchableOpacityWithFeedback>
            </View>
          )}
          <View flex={1}>
            <TouchableOpacityWithFeedback
              activeOpacity={0.85}
              onPress={() => router.navigate('/(dashboard)/statistics')}
            >
              <YStack gap={8} items="center" flex={1}>
                <StatsIcon />
                <Paragraph text="center" color={COLORS.grey[40]} variant="small">
                  Statistics
                </Paragraph>
              </YStack>
            </TouchableOpacityWithFeedback>
          </View>
          <View flex={1}>
            <TouchableOpacityWithFeedback activeOpacity={0.85} onPress={() => setSharePaymentLinkOpen(true)}>
              <YStack gap={8} items="center" flex={1}>
                <ShareIcon />
                <Paragraph text="center" color={COLORS.grey[40]} variant="small">
                  Share {'\n'} payment link
                </Paragraph>
              </YStack>
            </TouchableOpacityWithFeedback>
          </View>
          <View flex={1}>
            <YStack gap={8} items="center" flex={1}>
              <UserSettingsIcon />
              <Paragraph text="center" color={COLORS.grey[40]} variant="small">
                Manage {'\n'} information
              </Paragraph>
            </YStack>
          </View>
        </XStack>
        {session?.type !== 'CHILD' && (
          <XStack gap={8} mb={24}>
            <View flex={1}>
              <XStack
                borderColor={COLORS.grey[80]}
                items="center"
                p={16}
                bg={COLORS.grey[90]}
                borderWidth={1}
                rounded={8}
                gap={8}
              >
                <FirstDepositIcon width={36} />
                <Paragraph variant="secondary" fontWeight={500} color={COLORS.grey[0]} flex={1} numberOfLines={2}>
                  Set up your first deposit
                </Paragraph>
              </XStack>
            </View>
            <View flex={1}>
              <XStack
                borderColor={COLORS.grey[80]}
                items="center"
                p={16}
                bg={COLORS.grey[90]}
                borderWidth={1}
                rounded={8}
                gap={8}
              >
                <GoalsIcon width={36} />
                <Paragraph variant="secondary" fontWeight={500} color={COLORS.grey[0]} flex={1} numberOfLines={2}>
                  Add your child’s goal
                </Paragraph>
              </XStack>
            </View>
          </XStack>
        )}
      </ContentWrapper>
      <View bg={COLORS.white} px={16} borderTopLeftRadius={16} borderTopRightRadius={16} pt={16}>
        <H3 mb={8}>Transfers</H3>
        <Tabs options={options} defaultValue="past" />
      </View>
      <GiftDepositSheet open={giftDepositOpen} setOpen={setGiftDepositOpen} />
      <SharePaymentLinkSheet open={sharePaymentLinkOpen} setOpen={setSharePaymentLinkOpen} />
    </BaseLayout>
  );
}
