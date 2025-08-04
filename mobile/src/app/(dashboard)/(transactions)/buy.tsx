import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { Avatar, XStack, YStack } from 'tamagui';

import { Button } from '@/components/button';
import { H3 } from '@/components/header';
import { BackButton } from '@/components/layout/back-button';
import { BaseLayout } from '@/components/layout/base-layout';
import { Paragraph } from '@/components/paragraph';
import { COLORS } from '@/constants/colors';
import { childAvatarImageUri } from '@/constants/images';
import { ETFS } from '@/mocks/etfs';
import { RWAS } from '@/mocks/rwas';
import { STOCKS } from '@/mocks/stocks';

export default function Page() {
  const ref = useRef<TextInput>(null);
  const [value, setValue] = useState('');
  const { abbr, type } = useLocalSearchParams();

  const MOCK = type === 'ETF' ? ETFS : type === 'RWAS' ? RWAS : STOCKS;

  const data = MOCK.filter((el) => el.abbr === abbr)[0];

  if (!data) return null;

  const { icon, name } = data;
  const price = 1000;
  const valueAsNumber = Number(value);
  const shares = Number.isNaN(valueAsNumber) ? 0 : valueAsNumber / price;

  return (
    <BaseLayout grow={1}>
      <StatusBar style="light" />

      <BackButton title={typeof name === 'string' ? `Buy ${name}` : ''} style="light" />
      <XStack mb={24} justify="space-between">
        <YStack>
          <H3 color={COLORS.grey[0]}>{name}</H3>
          <Paragraph variant="small" color={COLORS.grey[20]}>
            {abbr}
          </Paragraph>
        </YStack>
        {icon}
      </XStack>
      <XStack items="center" justify="center" gap={16} grow={1} pb={120}>
        <Avatar circular size="$7">
          <Avatar.Image src={childAvatarImageUri} />
          <Avatar.Fallback backgroundColor={COLORS.accent[60]} />
        </Avatar>
        <YStack gap={4}>
          <Paragraph variant="secondary" color={COLORS.grey[20]}>
            Dan Williams
          </Paragraph>
          <XStack
            onPress={() => {
              ref.current?.focus();
            }}
          >
            <Paragraph fontSize={48} lineHeight={56} fontWeight={600} color={COLORS.white}>
              $
            </Paragraph>
            <TextInput
              ref={ref}
              numberOfLines={1}
              allowFontScaling
              value={`${value}`}
              onChangeText={(text) => setValue(text.startsWith('$') ? text : text)}
              keyboardType="numeric"
              maxLength={5}
              placeholder="0"
              placeholderTextColor={COLORS.grey[20]}
              style={{
                maxWidth: 160,
                color: COLORS.white,
                padding: 10,
                fontSize: 48,
                lineHeight: 56,
                paddingHorizontal: 0,
                paddingVertical: 0
              }}
            />
          </XStack>
          <Paragraph variant="secondary" color={COLORS.grey[20]}>
            {shares} Shares
          </Paragraph>
        </YStack>
      </XStack>
      <Button
        mt="auto"
        variant="primary"
        mb={16}
        disabled={value === ''}
        onPress={() =>
          router.navigate({
            pathname: '/(dashboard)/(transactions)/confirm',
            params: {
              abbr,
              type,
              value
            }
          })
        }
      >
        Buy
      </Button>
    </BaseLayout>
  );
}
