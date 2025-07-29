import { memo, useState, type PropsWithChildren } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Sheet as TamaguiSheet, useWindowDimensions, View } from 'tamagui';

import { H2 } from '@/components/header';
import { Paragraph } from '@/components/paragraph';
import { COLORS } from '@/constants/colors';

interface Props extends PropsWithChildren {
  open: boolean;
  setOpen: (value: boolean) => void;
  title?: string;
  desc?: string;
  preferAdaptParentOpenState?: boolean;
}

const SPACER_HEIGHT = 90;

export const Sheet: React.FC<Props> = ({ open, setOpen, preferAdaptParentOpenState, children, title, desc }) => {
  const insets = useSafeAreaInsets();
  const [height, setHeight] = useState(0);
  const { height: windowHeight } = useWindowDimensions();

  const needsExtraSpace = windowHeight < height + SPACER_HEIGHT;

  return (
    <TamaguiSheet
      modal
      preferAdaptParentOpenState={preferAdaptParentOpenState}
      forceRemoveScrollEnabled={open}
      open={open}
      onOpenChange={setOpen}
      snapPoints={needsExtraSpace ? [90] : ['fit']}
      snapPointsMode={needsExtraSpace ? 'percent' : 'fit'}
      dismissOnSnapToBottom
      zIndex={100_000}
      animation="medium"
    >
      <TamaguiSheet.Overlay animation="lazy" bg="$shadow6" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
      <TamaguiSheet.Frame
        px={16}
        pt={24}
        justify="center"
        position="relative"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <View position="absolute" t={6} l={16} width="100%" height={5} justify="center" items="center">
          <View width={80} height={5} rounded={2} bg={COLORS.grey[20]} />
        </View>
        <TamaguiSheet.ScrollView
          showsVerticalScrollIndicator={false}
          onContentSizeChange={(_width, height) => setHeight(height)}
        >
          <SheetContents title={title} desc={desc}>
            {children}
          </SheetContents>
        </TamaguiSheet.ScrollView>
      </TamaguiSheet.Frame>
    </TamaguiSheet>
  );
};

const SheetContents = memo(({ title, desc, children }: Pick<Props, 'title' | 'children' | 'desc'>) => {
  return (
    <>
      {title && (
        <H2 mb={16} text="center">
          {title}
        </H2>
      )}
      {desc && <Paragraph mb={24}>{desc}</Paragraph>}
      {children}
    </>
  );
});
