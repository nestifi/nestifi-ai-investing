import { router } from 'expo-router';
import { Text, YStack, Image, XStack } from 'tamagui';

import LightningIcon from '@/assets/icons/lightning.svg';
import ShieldIcon from '@/assets/icons/shield_2.svg';
import { Button } from '@/components/button';
import { BackButton } from '@/components/layout/back-button';
import { BaseLayout } from '@/components/layout/base-layout';
import { Paragraph } from '@/components/paragraph';
import { COLORS } from '@/constants/colors';
import { bankAccountImageUri } from '@/constants/images';

export default function ConnectYourBankAccountPage() {
  return (
    <BaseLayout grow={1}>
      <BackButton title="Connect your bank account" />
      <Paragraph>
        <Text fontWeight={700} color={COLORS.grey[100]}>
          NestiFi
        </Text>{' '}
        uses{' '}
        <Text fontWeight={700} color={COLORS.grey[100]}>
          Plaid
        </Text>{' '}
        to connect your bank account. We need it to provide you with all app’s features.
      </Paragraph>
      <YStack justify="center" items="center" my={44}>
        <Image source={{ uri: bankAccountImageUri }} width={233} height={100} objectFit="contain" />
      </YStack>
      <YStack gap={16}>
        <XStack rounded={16} gap={8} p={16} bg={COLORS.additional.yellow}>
          <ShieldIcon width={24} height={24} />
          <YStack flex={1}>
            <Paragraph color={COLORS.grey[100]} fontWeight={500} mb={6}>
              Connect in seconds
            </Paragraph>
            <Paragraph>8000+ apps trust Plaid to quickly connect to financial institutions.</Paragraph>
          </YStack>
        </XStack>
        <XStack rounded={16} gap={8} p={16} bg={COLORS.accent[50]}>
          <LightningIcon width={24} height={24} />
          <YStack flex={1}>
            <Paragraph color={COLORS.grey[100]} fontWeight={500} mb={6}>
              Keep your data safe
            </Paragraph>
            <Paragraph>Plaid uses best-in-class encryption to help protect your data </Paragraph>
          </YStack>
        </XStack>
      </YStack>

      <YStack mt="auto" justify="flex-end" mb="$6">
        <Button variant="primary" onPress={() => router.navigate('/(onboarding)/income-informations')} width="100%">
          Continue
        </Button>
      </YStack>
    </BaseLayout>
  );
}
