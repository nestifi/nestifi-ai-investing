import { useRef } from 'react';
import { Dimensions } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import type { ICarouselInstance } from 'react-native-reanimated-carousel';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import { View, Avatar, XStack, YStack } from 'tamagui';

import { H1 } from '@/components/header';
import { Paragraph } from '@/components/paragraph';
import { COLORS } from '@/constants/colors';
import { childAvatarImageUri, childAvatar2ImageUri, childAvatar3ImageUri } from '@/constants/images';

const data = [COLORS.additional.blue, COLORS.additional.red, COLORS.additional.yellow];
const width = Dimensions.get('window').width;

const MOCKED_CHILDREN = [
  {
    avatarUri: childAvatarImageUri,
    firstName: 'Dan',
    lastName: 'Williams',
    balance: '$30,850.00'
  },
  {
    avatarUri: childAvatar2ImageUri,
    firstName: 'Monica',
    lastName: 'Kręcipołek',
    balance: '$30,850.00'
  },
  {
    avatarUri: childAvatar3ImageUri,
    firstName: 'Bella',
    lastName: 'Williams',
    balance: '$70,021.37'
  }
];

export const HomeBannerCarousel = () => {
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true
    });
  };
  return (
    <View style={{ flex: 1 }}>
      <Carousel
        ref={ref}
        width={width - 32}
        height={112}
        data={data}
        style={{ overflow: 'visible' }}
        onProgressChange={progress}
        renderItem={({ index }) => (
          <XStack
            items="center"
            p={12}
            px={16}
            style={{
              flex: 1,
              gap: 16,
              marginLeft: 6,
              marginRight: 6,
              borderWidth: 1,
              borderRadius: 12,
              backgroundColor:
                index % 3 === 0
                  ? COLORS.additional.blue
                  : index % 3 === 1
                    ? COLORS.additional.red
                    : COLORS.additional.yellow
            }}
          >
            <Avatar circular size="$7">
              <Avatar.Image src={MOCKED_CHILDREN[index]?.avatarUri} />
              <Avatar.Fallback backgroundColor={COLORS.accent[60]} />
            </Avatar>
            <YStack gap={3} pointerEvents="none">
              <Paragraph color={COLORS.grey[70]}>
                {MOCKED_CHILDREN[index]?.firstName} {MOCKED_CHILDREN[index]?.lastName}
              </Paragraph>
              <H1 color={COLORS.grey[100]}>{MOCKED_CHILDREN[index]?.balance}</H1>
            </YStack>
          </XStack>
        )}
      />

      <Pagination.Basic
        progress={progress}
        data={data}
        activeDotStyle={{ backgroundColor: COLORS.accent[90] }}
        dotStyle={{ backgroundColor: COLORS.grey[50], borderRadius: 50 }}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
      />
    </View>
  );
};
