import { router } from 'expo-router';
import { useState } from 'react';
import { Circle, SizableText, XStack, YStack } from 'tamagui';

import BankOfAmericaIcon from '@/assets/icons/bank_of_america.svg';
import ChaseIcon from '@/assets/icons/chase.svg';
import CitiBankIcon from '@/assets/icons/city_bank.svg';
import { Button } from '@/components/button';
import { RadioGroupCards } from '@/components/form/radio-group';
import { BackButton } from '@/components/layout/back-button';
import { BaseLayout } from '@/components/layout/base-layout';
import { Paragraph } from '@/components/paragraph';
import { COLORS } from '@/constants/colors';

export default function PayWithPage() {
  const [value, setValue] = useState('');

  return (
    <BaseLayout grow={1}>
      <BackButton title="Pay with" />
      <RadioGroupCards
        items={[
          {
            id: '111',
            description: (
              <Paragraph>
                This account was unlinked. <SizableText color={COLORS.system.blue}>Relink now.</SizableText>
              </Paragraph>
            ),
            title: (
              <XStack gap={8}>
                <ChaseIcon />
                <Paragraph color={COLORS.grey[100]}>Chase</Paragraph>
                <Paragraph ml="auto">****** 2495</Paragraph>
              </XStack>
            )
          },
          {
            id: '222',
            description: '$10,000.00 buying limit remaining. Assets bought will be on hold for a few days.',
            title: (
              <XStack gap={8}>
                <Circle bg="white" width={28} height={28} justify="center" items="center">
                  <CitiBankIcon width={20} height={20} />
                </Circle>

                <Paragraph color={COLORS.grey[100]}>Citi Bank</Paragraph>
                <Paragraph ml="auto">****** 7398</Paragraph>
              </XStack>
            )
          },
          {
            id: '333',
            description: (
              <Paragraph>
                This account was unlinked. <SizableText color={COLORS.system.blue}>Relink now.</SizableText>
              </Paragraph>
            ),
            title: (
              <XStack gap={8}>
                <BankOfAmericaIcon width={28} height={28} />
                <Paragraph color={COLORS.grey[100]}>Bank of America</Paragraph>
                <Paragraph ml="auto">****** 5646</Paragraph>
              </XStack>
            )
          }
        ]}
        value={value}
        setValue={setValue}
      />
      <YStack mt="auto" justify="flex-end" mb="$6">
        <Button
          variant="primary"
          onPress={() => router.navigate('/(onboarding)/connect-your-bank-account-success')}
          width="100%"
        >
          Continue
        </Button>
      </YStack>
    </BaseLayout>
  );
}
