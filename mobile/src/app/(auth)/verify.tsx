import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { SizableText, View, XStack, YStack } from 'tamagui';

import { Button } from '@/components/button';
import { CodeInput } from '@/components/form/code-input';
import { H2 } from '@/components/header';
import { BaseLayout } from '@/components/layout/base-layout';
import { Link } from '@/components/link';
import { Paragraph } from '@/components/paragraph';
import { COLORS } from '@/constants/colors';

export default function VerifyPage() {
  const [code, setCode] = useState<string>();
  const { email, value } = useLocalSearchParams();

  const parsedValue = typeof value === 'string' ? value : 'unknown';

  return (
    <BaseLayout grow={1}>
      <View justify="center" flexDirection="row" gap="$2" items="center" p="$4" mb="$4">
        <View width={40} height={8} rounded={4} bg={COLORS.grey[20]} />
        <View width={40} height={8} rounded={4} bg={COLORS.accent[90]} />
      </View>
      <YStack gap={32}>
        <YStack gap={6}>
          <H2>Verify your {email === 'true' ? 'E-mail' : 'phone number'}</H2>
          <Paragraph>
            Enter 6-digit code sent to <SizableText color={COLORS.grey[100]}>{parsedValue}</SizableText>
            {/* {loginViaEmail ? 'Please enter your email to log in' : 'Please enter your phone number to log in'} */}
          </Paragraph>
        </YStack>
        <YStack>
          <CodeInput onChange={setCode} />
          <XStack justify="space-between" mt="$2">
            <Paragraph variant="secondary">Didn’t receive code?</Paragraph>
            <XStack gap="$2" justify="center" items="center">
              <Link href="/(auth)/register" disabled>
                Send code again
              </Link>
              <Paragraph variant="secondary">60 sec</Paragraph>
            </XStack>
          </XStack>
        </YStack>
      </YStack>
      <YStack mt="auto" justify="flex-end" mb="$6">
        <Button
          disabled={code?.length !== 6}
          variant="primary"
          onPress={() => router.navigate('/(auth)/create-passcode')}
        >
          Confirm
        </Button>
      </YStack>
    </BaseLayout>
  );
}
