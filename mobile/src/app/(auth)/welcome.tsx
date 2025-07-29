import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Image, SizableText, useWindowDimensions, View, YStack } from 'tamagui';

import { Button } from '@/components/button';
import { H2 } from '@/components/header';
import { BaseLayout } from '@/components/layout/base-layout';
import { Paragraph } from '@/components/paragraph';
import { COLORS } from '@/constants/colors';
import { onboardingImageUri } from '@/constants/images';
import { useAuthActions } from '@/store/auth';

const onboardingCopy = (step: number) => {
  switch (step) {
    case 1:
      return (
        <>
          <H2 style={{ textAlign: 'center' }} color={COLORS.grey[0]}>
            Build Your Child’s Future
          </H2>
          <Paragraph style={{ textAlign: 'center' }} mb="$7" color={COLORS.grey[30]}>
            Add your child&apos;s details, set financial goals, and track their journey toward a brighter future.
          </Paragraph>
        </>
      );
    case 2:
      return (
        <>
          <H2 style={{ textAlign: 'center' }} color={COLORS.grey[0]}>
            Invite Friends and Family
          </H2>
          <Paragraph style={{ textAlign: 'center' }} mb="$7" color={COLORS.grey[30]}>
            Invite grandparents, relatives, and friends to contribute to your child’s financial journey through a
            personalized link
          </Paragraph>
        </>
      );
    default:
      return (
        <>
          <H2 style={{ textAlign: 'center' }} color={COLORS.grey[0]}>
            Empower Your Family with Knowledge
          </H2>
          <Paragraph style={{ textAlign: 'center' }} mb="$7" color={COLORS.grey[30]}>
            Explore interactive lessons that make financial learning fun and rewarding for kids and parents.
          </Paragraph>
        </>
      );
  }
};

export default function WelcomePage() {
  const { height } = useWindowDimensions();
  const [step, setStep] = useState(1);
  const { passWelcomeScreen } = useAuthActions();

  const handleStepChange = () => {
    if (step === 3) {
      passWelcomeScreen();
    } else {
      setStep((step) => step + 1);
    }
  };

  return (
    <BaseLayout grow={1} pb="$6">
      <StatusBar style="light" />
      <View justify="space-between" items="center" flexDirection="row" py="$6">
        <View width={10} />
        <View justify="center" flexDirection="row" gap="$2" items="center">
          <View width={32} height={8} rounded={4} bg={step === 1 ? COLORS.accent[70] : COLORS.grey[20]} />
          <View width={32} height={8} rounded={4} bg={step === 2 ? COLORS.accent[70] : COLORS.grey[20]} />
          <View width={32} height={8} rounded={4} bg={step === 3 ? COLORS.accent[70] : COLORS.grey[20]} />
        </View>
        <SizableText
          onPress={passWelcomeScreen}
          color={COLORS.accent[70]}
          fontSize={14}
          fontWeight={900}
          lineHeight={14}
        >
          Skip
        </SizableText>
      </View>
      <View height={height * 0.5}>
        <Image source={{ uri: onboardingImageUri }} height="100%" objectFit="contain" />
      </View>
      <YStack gap="$2" verticalAlign="center">
        {onboardingCopy(step)}
        <Button variant="primary" onPress={handleStepChange}>
          {step === 3 ? 'Start investing' : 'Continue'}
        </Button>
      </YStack>
    </BaseLayout>
  );
}
