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

export default function RegisterPage() {
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
          <H2>Sign up to start using NestiFi</H2>
          <Paragraph>
            {loginViaEmail ? 'Please enter your email to sign up' : 'Please enter your phone number to sign up'}
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
              onChangeText={(text) => {
                const formattedText = text === '' || text.startsWith('+') ? text : `+${text}`;
                setValue(formattedText);
              }}
            />
          )}
          <Paragraph variant="secondary">
            Already have an account?? <Link href="/(auth)/login">Log in</Link>
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
              {loginViaEmail ? 'Sign up with phone number' : 'Sign up with E-mail'}
            </Button>
            <Button variant="tertiary-outlined" gap="$0" icon={<GoogleIcon />} onPress={() => login()} disabled>
              Sign up with Google
            </Button>
            <Button variant="tertiary-outlined" gap="$0" icon={<AppleIcon />} onPress={() => login()} disabled>
              Sign up with Apple
            </Button>
          </YStack>
        </YStack>
      </YStack>
    </BaseLayout>
  );
}
