import { Redirect, Stack } from 'expo-router';

import { COLORS } from '@/constants/colors';
import { useAuthState } from '@/store/auth';

export default function AuthLayout() {
  const { loggedIn, passedOnboarding } = useAuthState();

  if (!loggedIn) {
    console.log('User is not logged in, redirecting to auth');
    return <Redirect href="/(auth)/login" />;
  }

  if (passedOnboarding) {
    console.log('User has passed onboarding, redirecting to dashboard');
    return <Redirect href="/(dashboard)/(tabs)" />;
  }

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: COLORS.white
        },
        headerShown: false
      }}
    >
      <Stack.Screen name="(children)/add-child" />
      <Stack.Screen name="(children)/add-investment-options" />
      <Stack.Screen name="(children)/family-circle" />
      <Stack.Screen name="(children)/profile" />
      <Stack.Screen name="add-first-child" />
      <Stack.Screen name="choose-account-type" />
      <Stack.Screen name="connect-your-account" />
      <Stack.Screen name="connect-your-bank-account-success" />
      <Stack.Screen name="connect-your-bank-account" />
      <Stack.Screen name="income-informations" />
      <Stack.Screen name="pay-with" />
      <Stack.Screen name="personal-details" />
      <Stack.Screen name="terms-and-conditions" />
      <Stack.Screen name="connecting-crypto-wallet" />
    </Stack>
  );
}
