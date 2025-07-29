import { StatusBar } from 'expo-status-bar';
import { YStack, View } from 'tamagui';

import { BackButton } from '@/components/layout/back-button';
import { BaseLayout } from '@/components/layout/base-layout';
import { AssetRow } from '@/components/screens/wallet/asset-row';
import { PlaceholderSearch } from '@/components/screens/wallet/placeholder-search';
import { RWAS } from '@/mocks/rwas';

export default function Page() {
  return (
    <BaseLayout grow={1}>
      <StatusBar style="light" />
      <BackButton title="RWAs" style="light" />
      <View mt={8} mb={24}>
        <PlaceholderSearch />
      </View>
      <YStack gap={8}>
        {RWAS.map((el) => (
          <AssetRow
            key={el.abbr}
            name={el.name}
            abbr={el.abbr}
            value={el.value}
            icon={el.icon}
            change={el.change}
            title="RWAs"
          />
        ))}
      </YStack>
    </BaseLayout>
  );
}
