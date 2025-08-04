import { Redirect, Stack } from 'expo-router';

import { COLORS } from '@/constants/colors';
import { useAuthState } from '@/store/auth';

export default function DashboardLayout() {
  const { loggedIn, passedWelcomeScreen, passedOnboarding } = useAuthState();

  if (!loggedIn && !passedWelcomeScreen) {
    console.log('User has not passed welcome screen, redirecting to auth');
    return <Redirect href="/(auth)/welcome" />;
  }

  if (!loggedIn) {
    console.log('User is not logged in, redirecting to auth');
    return <Redirect href="/(auth)/login" />;
  }

  if (!passedOnboarding) {
    console.log('User has not passed onboarding, redirecting to onboarding');
    return <Redirect href="/(onboarding)/choose-account-type" />;
  }

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: COLORS.white
        }
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="gift-success" options={{ headerShown: false }} />
      <Stack.Screen name="statistics" options={{ headerShown: false }} />
      <Stack.Screen
        name="(transactions)/stocks"
        options={{ title: 'Stocks', headerShown: false, contentStyle: { backgroundColor: COLORS.grey[100] } }}
      />
      <Stack.Screen
        name="(transactions)/etfs"
        options={{ title: 'ETFs', headerShown: false, contentStyle: { backgroundColor: COLORS.grey[100] } }}
      />
      <Stack.Screen
        name="(transactions)/rwas"
        options={{ title: 'RWAs', headerShown: false, contentStyle: { backgroundColor: COLORS.grey[100] } }}
      />
      <Stack.Screen
        name="(transactions)/details"
        options={{ title: 'Details', headerShown: false, contentStyle: { backgroundColor: COLORS.grey[100] } }}
      />
      <Stack.Screen
        name="(transactions)/buy"
        options={{ title: 'Buy', headerShown: false, contentStyle: { backgroundColor: COLORS.grey[100] } }}
      />
      <Stack.Screen
        name="(transactions)/confirm"
        options={{ title: 'Confirm', headerShown: false, contentStyle: { backgroundColor: COLORS.grey[100] } }}
      />
      <Stack.Screen
        name="(transactions)/success"
        options={{ title: 'Success', headerShown: false, contentStyle: { backgroundColor: COLORS.grey[100] } }}
      />
      <Stack.Screen name="(add-flow)/family-circle" options={{ title: 'Family Circle', headerShown: false }} />
      <Stack.Screen name="(add-flow)/add-child" options={{ title: 'Add Child', headerShown: false }} />
      <Stack.Screen name="(add-flow)/profile" options={{ title: 'Profile', headerShown: false }} />
    </Stack>
  );
}
