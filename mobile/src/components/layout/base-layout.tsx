import type { ViewProps } from 'tamagui';
import { ScrollView } from 'tamagui';

import { ContentWrapper } from '@/components/content-wrapper';
import { SafeAreaContainer } from '@/components/safe-area-container';

export const BaseLayout: React.FC<ViewProps> = (props) => {
  return (
    <SafeAreaContainer>
      <ScrollView contentContainerStyle={{ grow: 1 }} showsVerticalScrollIndicator={false}>
        <ContentWrapper {...props} />
      </ScrollView>
    </SafeAreaContainer>
  );
};
