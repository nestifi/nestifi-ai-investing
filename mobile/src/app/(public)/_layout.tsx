import { Stack } from 'expo-router';

import { COLORS } from '@/constants/colors';

export default function PublicLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: COLORS.white
        },
        headerShown: false
      }}
    >
      <Stack.Screen name="invite/[code]" />
      <Stack.Screen name="success" />
    </Stack>
  );
}
