import { View } from 'tamagui';

import { H1 } from '@/components/header';
import { BaseLayout } from '@/components/layout/base-layout';

export default function SebScreen() {
  return (
    <BaseLayout grow={1}>
      <View flex={1} justify="center" items="center">
        <H1>Seb</H1>
      </View>
    </BaseLayout>
  );
}
