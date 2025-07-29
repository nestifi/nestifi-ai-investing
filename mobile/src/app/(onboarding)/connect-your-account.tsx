import { router } from 'expo-router';
import { useState } from 'react';
import { XStack, YStack } from 'tamagui';

import BankIcon from '@/assets/icons/bank.svg';
import CryptoIcon from '@/assets/icons/wallet.svg';
import { Button } from '@/components/button';
import { RadioGroupCards } from '@/components/form/radio-group';
import { BackButton } from '@/components/layout/back-button';
import { BaseLayout } from '@/components/layout/base-layout';
import { Paragraph } from '@/components/paragraph';
import { COLORS } from '@/constants/colors';

export default function ConnectYourAccountPage() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <BaseLayout grow={1}>
      <BackButton title="Connect your account" />
      <Paragraph mb={24}>
        Choose how you&apos;d like to connect: link a secure crypto wallet or your bank account with Plaid for a
        seamless experience
      </Paragraph>
      <RadioGroupCards
        items={[
          {
            id: '1',
            description:
              'Plug into over 300 different self-custody crypto wallets through a single integration, including MetaMask, Coinbase Wallet, Trust Wallet etc.',
            title: (
              <XStack gap={8}>
                <CryptoIcon />
                <Paragraph color={COLORS.grey[100]}>Crypto wallet</Paragraph>
              </XStack>
            )
          },
          {
            id: '2',
            description:
              '8000+ apps trust Plaid to quickly connect to financial institutions. Plaid uses best-in-class encryption to help protect your data.',
            title: (
              <XStack gap={8}>
                <BankIcon />
                <Paragraph color={COLORS.grey[100]}>Bank account</Paragraph>
              </XStack>
            )
          }
        ]}
        value={value ?? ''}
        setValue={setValue}
      />
      <YStack mt="auto" justify="flex-end" mb="$6">
        <Button
          disabled={!value}
          variant="primary"
          onPress={() => {
            if (value === '1') router.navigate('/(onboarding)/connecting-crypto-wallet');
            else router.navigate('/(onboarding)/pay-with');
          }}
          width="100%"
        >
          Continue
        </Button>
      </YStack>
    </BaseLayout>
  );
}
