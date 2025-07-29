import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Linking } from 'react-native';
import { SizableText, XStack, YStack } from 'tamagui';

import CorrectIcon from '@/assets/icons/correct.svg';
import LinkIcon from '@/assets/icons/link.svg';
import { Button } from '@/components/button';
import { H2 } from '@/components/header';
import { BaseLayout } from '@/components/layout/base-layout';
import { Paragraph } from '@/components/paragraph';
import { COLORS } from '@/constants/colors';
import { MANTRA_TESTNET_CONFIG } from '@/constants/config';

export default function Page() {
  const { name, txHash } = useLocalSearchParams();

  return (
    <BaseLayout grow={1}>
      <StatusBar style="light" />
      <YStack gap={16} grow={1} justify="center" items="center">
        <CorrectIcon />
        <H2 color={COLORS.white} text="center">
          Payment successful
        </H2>
        <Paragraph
          color={COLORS.white}
          fontWeight={400}
          text="center"
        >{`You've purchased ${typeof name === 'string' ? name : '-----'} shares on behalf of Dan Williams`}</Paragraph>
        <XStack items="center">
          <SizableText color={COLORS.white} fontWeight={500} width={60}>
            TxHash:{' '}
          </SizableText>
          <Button
            flex={1}
            icon={<LinkIcon width={14} height={14} />}
            bg="transparent"
            gap={0}
            color={COLORS.grey[30]}
            fontSize={12}
            p={0}
            onPress={() =>
              Linking.openURL(`${MANTRA_TESTNET_CONFIG.explorerUrl}/tx/${typeof txHash === 'string' && txHash}`)
            }
            borderColor="transparent"
            pressStyle={{
              bg: 'transparent',
              borderColor: 'transparent'
            }}
          >
            {typeof txHash === 'string' && txHash}
          </Button>
        </XStack>
      </YStack>
      <Button mt="auto" variant="primary" mb={16} onPress={() => router.navigate('/(dashboard)/(tabs)/wallet')}>
        Back
      </Button>
    </BaseLayout>
  );
}
