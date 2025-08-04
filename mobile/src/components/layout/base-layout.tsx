import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { type ViewProps } from 'tamagui';

import { ContentWrapper } from '@/components/content-wrapper';
import { SafeAreaContainer } from '@/components/safe-area-container';

export const BaseLayout: React.FC<ViewProps> = (props) => {
  return (
    <SafeAreaContainer>
      <KeyboardAwareScrollView
        style={{ marginBottom: -1 }} // fixes empty space between tab bar and content on iOS
        contentContainerStyle={{ flexGrow: 1 }}
        bottomOffset={108}
        showsVerticalScrollIndicator={false}
      >
        <ContentWrapper {...props} />
      </KeyboardAwareScrollView>
    </SafeAreaContainer>
  );
};
