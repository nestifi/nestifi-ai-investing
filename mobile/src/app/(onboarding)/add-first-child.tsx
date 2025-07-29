import { router } from 'expo-router';
import { useState } from 'react';
import { YStack, Image, XStack } from 'tamagui';

import { Button } from '@/components/button';
import { BackButton } from '@/components/layout/back-button';
import { BaseLayout } from '@/components/layout/base-layout';
import { Paragraph } from '@/components/paragraph';
import { Sheet } from '@/components/sheet';
import { familyCircleImageUri } from '@/constants/images';
import { useAuthActions } from '@/store/auth';
import { useOnboardingActions, useOnboardingState } from '@/store/onboarding';

export default function AddFirstChildPage() {
  const [open, setOpen] = useState(false);
  const onboardingData = useOnboardingState();
  const { resetState } = useOnboardingActions();
  const { finishOnboarding } = useAuthActions();

  const handleSkip = async () => {
    await finishOnboarding(onboardingData);
    resetState();
  };

  return (
    <BaseLayout grow={1}>
      <BackButton title="Add child to your family circle" />
      <YStack justify="center" items="center" my={56} scale={2.5}>
        <Image source={{ uri: familyCircleImageUri }} width={200} height={200} objectFit="contain" />
      </YStack>
      <Paragraph>
        Your Family Circle includes trusted family members and friends who can contribute to your child’s financial
        future. Share updates, set goals together, and make investing a collaborative experience.
      </Paragraph>
      <YStack mt="auto" justify="flex-end" mb="$6" gap={12}>
        <Button variant="primary" onPress={() => router.navigate('/(onboarding)/(children)/add-child')} width="100%">
          Add child
        </Button>
        <Button variant="secondary" onPress={handleSkip} width="100%">
          Skip
        </Button>
      </YStack>
      <Sheet
        open={open}
        setOpen={setOpen}
        title="Stop onboarding process?"
        desc="Are you sure you’d like to stop the onboarding process? Don’t worry—you’ll still be able to complete your details later at your convenience."
      >
        <XStack gap={8}>
          <Button flex={1} variant="secondary" onPress={() => router.navigate('/(dashboard)/(tabs)')}>
            Stop onboarding
          </Button>
          <Button flex={1} variant="primary" onPress={() => setOpen(false)}>
            I want to continue
          </Button>
        </XStack>
      </Sheet>
    </BaseLayout>
  );
}
