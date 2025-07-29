import { router } from 'expo-router';
import { Image, YStack } from 'tamagui';

import { Button } from '@/components/button';
import { BackButton } from '@/components/layout/back-button';
import { BaseLayout } from '@/components/layout/base-layout';
import { Paragraph } from '@/components/paragraph';
import { bankAccountImageUri } from '@/constants/images';

export default function SuccessPage() {
  return (
    <BaseLayout grow={1}>
      <BackButton title="Success" hiddenGoBack />
      <Paragraph text="center" maxW="75%" mx="auto">
        Your account has been successfully reconnected
      </Paragraph>
      <YStack justify="center" items="center" my={44}>
        <Image source={{ uri: bankAccountImageUri }} width={233} height={100} objectFit="contain" />
      </YStack>
      <YStack mt="auto" justify="flex-end" mb="$6">
        <Button variant="primary" onPress={() => router.navigate('/(onboarding)/add-first-child')} width="100%">
          Continue
        </Button>
      </YStack>
    </BaseLayout>
  );
}
