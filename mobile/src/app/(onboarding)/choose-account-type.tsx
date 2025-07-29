import { router } from 'expo-router';
import { View, XStack, YStack, Image } from 'tamagui';

import { Button } from '@/components/button';
import { H2 } from '@/components/header';
import { BaseLayout } from '@/components/layout/base-layout';
import { Paragraph } from '@/components/paragraph';
import { PressableWithFeedback } from '@/components/pressable-with-feedback';
import { COLORS } from '@/constants/colors';
import { adultAccountImageUri, childAccountImageUri } from '@/constants/images';
import { useOnboardingActions, useOnboardingState } from '@/store/onboarding';

export default function ChooseAccountTypePage() {
  const { accountType } = useOnboardingState();
  const { setAccountType } = useOnboardingActions();

  return (
    <BaseLayout grow={1}>
      <View justify="center" flexDirection="row" gap="$2" items="center" p="$4" mb="$2">
        <View width={32} height={8} rounded={4} bg={COLORS.accent[90]} />
        <View width={32} height={8} rounded={4} bg={COLORS.grey[20]} />
        <View width={32} height={8} rounded={4} bg={COLORS.grey[20]} />
      </View>
      <YStack gap={24}>
        <H2 text="center">Choose your account type</H2>
        <YStack gap={16}>
          <PressableWithFeedback onPress={() => setAccountType('ADULT')}>
            <XStack
              bg={COLORS.additional.blue}
              borderWidth={1}
              gap={24}
              rounded={16}
              items="center"
              p="$4"
              borderStyle="solid"
              style={{ borderColor: accountType === 'ADULT' ? COLORS.accent[90] : 'transparent' }}
            >
              <Image source={{ uri: adultAccountImageUri }} width={80} height={80} objectFit="contain" />
              <YStack flex={1}>
                <Paragraph mb={8} fontWeight={700} color={COLORS.grey[100]}>
                  Adult Account
                </Paragraph>
                <Paragraph>
                  Take control of your finances, send money, and start building a brighter future for your family.
                </Paragraph>
              </YStack>
            </XStack>
          </PressableWithFeedback>
          <PressableWithFeedback onPress={() => setAccountType('CHILD')}>
            <XStack
              gap={24}
              rounded={16}
              items="center"
              borderWidth={1}
              p="$4"
              borderStyle="solid"
              bg={COLORS.additional.yellow}
              style={{ borderColor: accountType === 'CHILD' ? COLORS.accent[90] : 'transparent' }}
            >
              <Image source={{ uri: childAccountImageUri }} width={80} height={80} objectFit="contain" />
              <YStack flex={1}>
                <Paragraph mb={8} fontWeight={700} color={COLORS.grey[100]}>
                  Child Account
                </Paragraph>
                <Paragraph>Help your child grow financially with a secure account designed for their future.</Paragraph>
              </YStack>
            </XStack>
          </PressableWithFeedback>
        </YStack>
      </YStack>
      <YStack mt="auto" justify="flex-end" mb="$6">
        <Button
          disabled={!accountType}
          variant="primary"
          onPress={() => router.navigate('/(onboarding)/personal-details')}
        >
          Confirm
        </Button>
      </YStack>
    </BaseLayout>
  );
}
