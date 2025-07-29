import { router } from 'expo-router';
import { useId, useState } from 'react';
import { View, YStack } from 'tamagui';

import AppleIcon from '@/assets/icons/apple.svg';
import GoogleIcon from '@/assets/icons/google.svg';
import { Button } from '@/components/button';
import { Input } from '@/components/form/input';
import { H2 } from '@/components/header';
import { BaseLayout } from '@/components/layout/base-layout';
import { Link } from '@/components/link';
import { Paragraph } from '@/components/paragraph';
import { COLORS } from '@/constants/colors';
import { useAuthActions } from '@/store/auth';

export default function LoginPage() {
  const id = useId();
  const [value, setValue] = useState('');
  const [loginViaEmail, setLoginViaEmail] = useState(false);
  const { login } = useAuthActions();

  return (
    <BaseLayout>
      <View justify="center" flexDirection="row" gap="$2" items="center" p="$4" mb="$4">
        <View width={40} height={8} rounded={4} bg={COLORS.accent[90]} />
        <View width={40} height={8} rounded={4} bg={COLORS.grey[20]} />
      </View>
      <YStack gap={32}>
        <YStack gap={6}>
          <H2>Log in to start using NestiFi</H2>
          <Paragraph>
            {loginViaEmail ? 'Please enter your email to log in' : 'Please enter your phone number to log in'}
          </Paragraph>
        </YStack>
        <YStack>
          {loginViaEmail ? (
            <Input
              label="Email"
              id={`${id}-email`}
              mb={8}
              placeholder="example@gmail.com"
              value={value}
              onChangeText={setValue}
            />
          ) : (
            <Input
              label="Phone number"
              id={`${id}-phone`}
              mb={8}
              placeholder="+1 (310) 000-00-00"
              value={value}
              onChangeText={setValue}
            />
          )}
          <Paragraph variant="secondary">
            Don’t have account yet? <Link href="/(auth)/register">Sign up</Link>
          </Paragraph>
        </YStack>
        <YStack>
          <Button
            variant="primary"
            onPress={() =>
              router.navigate({
                pathname: '/(auth)/verify',
                params: { email: loginViaEmail ? 'true' : 'false', value }
              })
            }
            disabled={value.length === 0}
          >
            Send code
          </Button>

          <View position="relative" my={16} height={20}>
            <View position="absolute" t="50%" l={0} width="100%" height={1} bg={COLORS.grey[20]} />
            <Paragraph
              position="absolute"
              l="50%"
              t="50%"
              lineHeight={12}
              width={20}
              style={{ textAlign: 'center' }}
              bg={COLORS.grey[0]}
              fontSize={14}
              color={COLORS.grey[60]}
              transform={[
                {
                  translateY: '-50%'
                }
              ]}
            >
              or
            </Paragraph>
          </View>
          <YStack gap="$2">
            <Button
              variant="tertiary"
              onPress={() => {
                setValue('');
                setLoginViaEmail((state) => !state);
              }}
            >
              {loginViaEmail ? 'Log in with phone number' : 'Log in with E-mail'}
            </Button>
            <Button variant="tertiary-outlined" gap="$0" icon={<GoogleIcon />} onPress={() => login()}>
              Log in with Google
            </Button>
            <Button variant="tertiary-outlined" gap="$0" icon={<AppleIcon />} onPress={() => login()}>
              Log in with Apple
            </Button>
          </YStack>
        </YStack>
      </YStack>
    </BaseLayout>
  );
}
