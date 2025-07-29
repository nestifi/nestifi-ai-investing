import { SplashScreen } from 'expo-router';
import { useEffect, type PropsWithChildren, useState, useCallback } from 'react';
import { install as polyfillCrypto } from 'react-native-quick-crypto';
import { View } from 'tamagui';

import { useAuthActions } from '@/store/auth';

void SplashScreen.preventAutoHideAsync();

export function Bootstrap({ children }: PropsWithChildren) {
  const [appIsReady, setAppIsReady] = useState(false);
  const { initialize } = useAuthActions();

  useEffect(() => {
    async function prepare() {
      try {
        polyfillCrypto();
        const result = await initialize();
        console.log('bootstrap finished', result);
      } catch (err) {
        const reason = err instanceof Error ? err.message : null;
        console.error('bootstrap failed', { reason });
      } finally {
        setAppIsReady(true);
      }
    }

    void prepare();
  }, [initialize]);

  const onLayoutRootView = useCallback(() => {
    if (!appIsReady) return;
    void SplashScreen.hideAsync();
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {children}
    </View>
  );
}
