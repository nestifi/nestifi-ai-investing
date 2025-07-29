import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, XStack, YStack } from 'tamagui';

import Graph from '@/assets/graph.svg';
import { Button } from '@/components/button';
import { ContentWrapper } from '@/components/content-wrapper';
import { H1, H3 } from '@/components/header';
import { BackButton } from '@/components/layout/back-button';
import { BaseLayout } from '@/components/layout/base-layout';
import { Paragraph } from '@/components/paragraph';
import { TextWithChangeIndicator } from '@/components/screens/wallet/text-with-change-indicator';
import { COLORS } from '@/constants/colors';
import { ETFS } from '@/mocks/etfs';
import { RWAS } from '@/mocks/rwas';
import { STOCKS } from '@/mocks/stocks';

export default function Page() {
  const { name, value, change, abbr, title } = useLocalSearchParams();

  const MOCK = title === 'ETFs' ? ETFS : title === 'RWAs' ? RWAS : STOCKS;
  const type = title === 'ETFs' ? 'ETF' : title === 'RWAs' ? 'RWAS' : 'STOCK';

  return (
    <BaseLayout grow={1} px={0}>
      <StatusBar style="light" />
      <ContentWrapper>
        <BackButton title={typeof title === 'string' ? title : ''} style="light" />
        <XStack mb={24} justify="space-between">
          <YStack>
            <H3 color={COLORS.grey[0]}>{name}</H3>
            <Paragraph variant="small" color={COLORS.grey[20]}>
              {abbr}
            </Paragraph>
          </YStack>
          {MOCK.filter((el) => el.abbr === abbr)[0]?.icon}
        </XStack>
        <YStack>
          <H1 mb={4} color={COLORS.grey[0]}>
            {value}
          </H1>
          <TextWithChangeIndicator value={Number(change)} text="left" fontSize={12} />
        </YStack>
      </ContentWrapper>
      <Graph width="100%" />
      <ContentWrapper grow={1} mb={16}>
        <View
          px={12}
          py={16}
          rounded={8}
          borderWidth={1}
          borderColor={COLORS.grey[80]}
          mb={24}
          mt={16}
          bg={COLORS.grey[90]}
        >
          <Paragraph color={COLORS.white} fontWeight={500}>
            Stats (Today)
          </Paragraph>
          <View height={1} width="100%" bg={COLORS.grey[80]} mt={8} mb={16} />
          <XStack gap={16}>
            <YStack flex={1} gap={8}>
              <XStack justify="space-between">
                <Paragraph variant="small" width="40%" color={COLORS.grey[30]}>
                  Open
                </Paragraph>
                <Paragraph variant="small" fontWeight={300} color={COLORS.grey[0]}>
                  $194.90
                </Paragraph>
              </XStack>
              <XStack justify="space-between">
                <Paragraph variant="small" width="40%" color={COLORS.grey[30]}>
                  Day Range
                </Paragraph>
                <Paragraph variant="small" fontWeight={300} color={COLORS.grey[0]}>
                  194.50-196.30
                </Paragraph>
              </XStack>
              <XStack justify="space-between">
                <Paragraph variant="small" width="40%" color={COLORS.grey[30]}>
                  Total net assets
                </Paragraph>
                <Paragraph variant="small" fontWeight={300} color={COLORS.grey[0]}>
                  $56.502B
                </Paragraph>
              </XStack>
            </YStack>
            <YStack flex={1} gap={8}>
              <XStack justify="space-between">
                <Paragraph variant="small" width="40%" color={COLORS.grey[30]}>
                  52 week range
                </Paragraph>
                <Paragraph variant="small" fontWeight={300} color={COLORS.grey[0]}>
                  135.50-201.20
                </Paragraph>
              </XStack>
              <XStack justify="space-between">
                <Paragraph variant="small" width="40%" color={COLORS.grey[30]}>
                  Shares{' '}
                </Paragraph>
                <Paragraph variant="small" fontWeight={300} color={COLORS.grey[0]}>
                  15.8B
                </Paragraph>
              </XStack>
              <XStack justify="space-between">
                <Paragraph variant="small" width="40%" color={COLORS.grey[30]}>
                  Dividend yield
                </Paragraph>
                <Paragraph variant="small" fontWeight={300} color={COLORS.grey[0]}>
                  0.53%
                </Paragraph>
              </XStack>
            </YStack>
          </XStack>
        </View>

        <Button
          mt="auto"
          variant="primary"
          onPress={() =>
            router.navigate({
              pathname: '/(dashboard)/(transactions)/buy',
              params: {
                abbr,
                type
              }
            })
          }
        >
          Buy
        </Button>
      </ContentWrapper>
    </BaseLayout>
  );
}
