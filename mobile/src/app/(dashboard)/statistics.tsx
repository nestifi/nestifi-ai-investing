import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState, useId } from 'react';
import { Image, ScrollView, View, XStack, YStack } from 'tamagui';

import FilterIcon from '@/assets/icons/filter.svg';
import { Button } from '@/components/button';
import { RadioGroup } from '@/components/form/radio-group';
import { H3 } from '@/components/header';
import { BackButton } from '@/components/layout/back-button';
import { BaseLayout } from '@/components/layout/base-layout';
import { Paragraph } from '@/components/paragraph';
import { Sheet } from '@/components/sheet';
import { TouchableOpacityWithFeedback } from '@/components/touchable-opacity-with-feedback';
import { COLORS } from '@/constants/colors';
import { statisticsChartImageUri } from '@/constants/images';

const STATS = [
  {
    value: 12,
    description: 'Number of regular deposits',
    bg: COLORS.additional.blue
  },
  {
    value: 8,
    description: 'Number of gift deposits',
    bg: COLORS.additional.red
  },
  {
    value: 8,
    description: 'Days you invest in your child’s future',
    bg: COLORS.additional.yellow
  }
] as const;

export default function StatisticsPage() {
  const uniqueIdPrefix = useId();
  const [formFilterValue, setFormFilterValue] = useState<string>();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const router = useRouter();

  const radioOptions = [
    { id: `${uniqueIdPrefix}-last-month`, title: 'Last month' },
    { id: `${uniqueIdPrefix}-last-6-months`, title: 'Last 6 months' },
    { id: `${uniqueIdPrefix}-last-year`, title: 'Last year' },
    { id: `${uniqueIdPrefix}-all-time`, title: 'All time' }
  ] as const;

  const handleContinuePress = () => {
    router.navigate('/(dashboard)/(tabs)');
  };

  return (
    <BaseLayout grow={1} px={0}>
      <StatusBar style="dark" />
      <YStack grow={1}>
        <View grow={1} pb={32}>
          <View px={16}>
            <BackButton title="Statistics" />
            <Paragraph color={COLORS.grey[60]} mb={24} text="center">
              Monitor your deposits and progress effortlessly
            </Paragraph>
            <View mb={80}>
              <Image source={{ uri: statisticsChartImageUri }} width="100%" height={320} objectFit="contain" />
            </View>
            <XStack mb={16} justify="space-between">
              <H3 text="center">Payments</H3>
              <TouchableOpacityWithFeedback onPress={() => setFiltersOpen(true)}>
                <FilterIcon />
              </TouchableOpacityWithFeedback>
            </XStack>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8, paddingInline: 16 }}
          >
            {STATS.map((stat, index) => (
              <YStack
                rounded={16}
                p={16}
                bg={stat.bg}
                justify="center"
                items="center"
                width={168}
                height={125}
                key={index}
              >
                <Paragraph fontSize={32} lineHeight={32 * 1.6} color={COLORS.grey[100]} fontWeight={700} mb={8}>
                  {stat.value}
                </Paragraph>
                <Paragraph variant="small" text="center" color={COLORS.grey[60]}>
                  {stat.description}
                </Paragraph>
              </YStack>
            ))}
          </ScrollView>
        </View>
        <View px={16}>
          <Button width="100%" variant="primary" fontWeight={700} onPress={handleContinuePress}>
            Continue
          </Button>
        </View>
      </YStack>
      <Sheet
        open={filtersOpen}
        setOpen={setFiltersOpen}
        title="Filter"
        desc="Choose the time period you want to track data."
      >
        <View mb={40}>
          <RadioGroup
            items={radioOptions}
            value={formFilterValue ?? radioOptions[0].id}
            setValue={setFormFilterValue}
          />
        </View>
        <XStack gap={8} mt="auto">
          <Button
            flex={1}
            variant="secondary"
            onPress={() => {
              setFiltersOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            flex={1}
            variant="primary"
            onPress={() => {
              setFiltersOpen(false);
            }}
          >
            Save
          </Button>
        </XStack>
      </Sheet>
    </BaseLayout>
  );
}
