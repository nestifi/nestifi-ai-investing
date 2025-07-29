import { router } from 'expo-router';
import { useEffect } from 'react';
import { SizableText, View, XStack, YStack, Image } from 'tamagui';

import ChevronIcon from '@/assets/icons/chevron.svg';
import PlaidIcon from '@/assets/icons/plaid.svg';
import { Button } from '@/components/button';
import { H2 } from '@/components/header';
import { BaseLayout } from '@/components/layout/base-layout';
import { Paragraph } from '@/components/paragraph';
import { COLORS } from '@/constants/colors';
import { connectingImageUri } from '@/constants/images';

export default function Page() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/(onboarding)/add-first-child');
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <BaseLayout grow={1}>
      <XStack justify="space-between" gap={8} items="center" py="$3">
        <Button
          icon={<ChevronIcon width={24} height={24} />}
          p={0}
          bg="transparent"
          pressStyle={{ bg: 'transparent', borderColor: 'transparent' }}
          rounded={20}
          onPress={() => router.back()}
        />
        <PlaidIcon width={64} />
        <View width={40} />
      </XStack>
      <YStack justify="center" items="center" my="auto" gap={16}>
        <Image source={{ uri: connectingImageUri }} width={168} height={48} objectFit="contain" />
        <H2>Almost done..</H2>
        <Paragraph text="center">
          You&apos;ll be navigated to your <SizableText color={COLORS.grey[100]}>Coinbase Wallet</SizableText> to
          securely log in to your account
        </Paragraph>
      </YStack>
    </BaseLayout>
  );
}
