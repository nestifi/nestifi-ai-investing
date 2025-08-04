import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { XStack, YStack } from 'tamagui';

import TriangleUpIcon from '@/assets/icons/triangle-up.svg';
import { H1 } from '@/components/header';
import { BackButton } from '@/components/layout/back-button';
import { BaseLayout } from '@/components/layout/base-layout';
import { Paragraph } from '@/components/paragraph';
import { MantraTransactionButton } from '@/components/web3/mantra-transaction';
import { COLORS } from '@/constants/colors';
import { ETFS } from '@/mocks/etfs';
import { RWAS } from '@/mocks/rwas';
import { STOCKS } from '@/mocks/stocks';

const Row = ({ title, value }: { title: string; value: string | React.ReactElement }) => (
  <XStack justify="space-between">
    <Paragraph color={COLORS.grey[50]}>{title}</Paragraph>
    {typeof value === 'string' ? (
      <Paragraph color={COLORS.white} fontWeight={300}>
        {value}
      </Paragraph>
    ) : (
      value
    )}
  </XStack>
);

export default function Page() {
  const { abbr, type, value } = useLocalSearchParams();

  const MOCK = type === 'ETF' ? ETFS : type === 'RWAS' ? RWAS : STOCKS;

  const data = MOCK.filter((el) => el.abbr === abbr)[0];

  if (!data) return null;

  const { icon, name } = data;
  const parsedValue = typeof value === 'string' ? value : '0';
  const price = 1000;
  const valueAsNumber = Number(parsedValue);
  const shares = Number.isNaN(valueAsNumber) ? 0 : valueAsNumber / price;

  return (
    <BaseLayout grow={1}>
      <StatusBar style="light" />

      <BackButton title={typeof name === 'string' ? `Buy ${name}` : ''} style="light" />

      <XStack mb={24} justify="space-between">
        <YStack>
          <H1 fontWeight={500} color={COLORS.grey[0]}>
            -${value}
          </H1>
          <Paragraph variant="small" color={COLORS.grey[20]}>
            Market Buy {shares} LIBRE
          </Paragraph>
        </YStack>
        {icon}
      </XStack>
      <Paragraph color={COLORS.white} mb={24}>
        Your order will be executed at the best available price when the market opens again
      </Paragraph>
      <YStack gap={24} mb={24}>
        <Row title="Amount" value={`$${parsedValue}`} />
        <Row title="Fees" value="$0" />
        <Row title="Traded value" value={`$${parsedValue}`} />
        <Row
          title="Price"
          value={
            <Paragraph color="#3C9A03">
              <TriangleUpIcon />1 LIBRE = $1,000.00
            </Paragraph>
          }
        />
        <Row title="Estimated shares" value={`${shares} LIBRE`} />
        <Row title="Exchanged" value="$1,000" />
        <Row title="Commission-free trades left" value="10 out of 10" />
      </YStack>

      <MantraTransactionButton name={name} type={typeof type === 'string' ? type : 'RWAS'} />
    </BaseLayout>
  );
}
