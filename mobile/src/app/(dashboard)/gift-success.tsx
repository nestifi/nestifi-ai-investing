import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, YStack } from 'tamagui';

import CorrectIcon from '@/assets/icons/correct.svg';
import { Button } from '@/components/button';
import { H2 } from '@/components/header';
import { BaseLayout } from '@/components/layout/base-layout';

export default function GiftSuccessPage() {
  const router = useRouter();
  const { amount } = useLocalSearchParams<{ amount: string }>();

  const handleContinuePress = () => {
    router.navigate('/(dashboard)/(tabs)');
  };

  return (
    <BaseLayout grow={1}>
      <StatusBar style="dark" />
      <YStack grow={1} justify="center" items="center" pb={48}>
        <View grow={1} justify="center" items="center">
          <View mb={32}>
            <CorrectIcon />
          </View>
          <H2 text="center">You have successfully sent Dan a ${amount} gift!</H2>
        </View>
        <Button width="100%" variant="primary" fontWeight={700} onPress={handleContinuePress}>
          Continue
        </Button>
      </YStack>
    </BaseLayout>
  );
}
