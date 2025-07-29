import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, YStack } from 'tamagui';

import { Button } from '@/components/button';
import { H2 } from '@/components/header';
import { BaseLayout } from '@/components/layout/base-layout';
import { useAuthActions, useAuthState } from '@/store/auth';

export default function ProfilePage() {
  const { session } = useAuthState();
  const { logout, resetState } = useAuthActions();

  return (
    <BaseLayout grow={1}>
      <StatusBar style="dark" />
      <H2 mt="$10" mb="$6">
        Profile Page
      </H2>
      <YStack flex={1} gap="$2">
        <Button variant="tertiary-outlined" onPress={resetState}>
          Reset app state
        </Button>
        <Button variant="tertiary-outlined" onPress={logout}>
          Logout
        </Button>
        <Button variant="tertiary" onPress={() => router.back()}>
          Go Back
        </Button>
        <Text>{JSON.stringify({ session }, null, 2)}</Text>
      </YStack>
    </BaseLayout>
  );
}
