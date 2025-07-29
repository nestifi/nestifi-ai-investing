import { Redirect, Stack } from 'expo-router';

import { COLORS } from '@/constants/colors';
import { useAuthState } from '@/store/auth';

export default function AuthLayout() {
  const { loggedIn, passedWelcomeScreen } = useAuthState();

  if (loggedIn) {
    console.log('User is logged in, redirecting to dashboard');
    return <Redirect href="/(dashboard)/(tabs)" />;
  }

  return (
    <Stack
      initialRouteName={passedWelcomeScreen ? 'login' : 'welcome'}
      screenOptions={{
        contentStyle: {
          backgroundColor: COLORS.white
        }
      }}
    >
      <Stack.Screen name="login" options={{ title: 'Login', headerShown: false }} />
      <Stack.Screen name="register" options={{ title: 'Register', headerShown: false }} />
      <Stack.Screen name="verify" options={{ title: 'Verify', headerShown: false }} />
      <Stack.Screen name="create-passcode" options={{ title: 'Create passcode', headerShown: false }} />
      <Stack.Screen
        name="welcome"
        options={{ title: 'Welcome', headerShown: false, contentStyle: { backgroundColor: COLORS.grey[100] } }}
      />
    </Stack>
  );
}
