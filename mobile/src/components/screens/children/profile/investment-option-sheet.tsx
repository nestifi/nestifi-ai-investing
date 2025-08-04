import { useEffect, useRef } from 'react';
import type { ScrollView } from 'tamagui';
import { YStack } from 'tamagui';

import { Button } from '@/components/button';
import { H3 } from '@/components/header';
import { Paragraph } from '@/components/paragraph';
import { Sheet } from '@/components/sheet';
import { zIndexes } from '@/constants/z-index';

interface Props {
  investmentName: string | null;
  setOpen: (open: boolean) => void;
}

export function InvestmentOptionSheet({ investmentName, setOpen }: Props) {
  const scrollViewRef = useRef<ScrollView>(null);

  const open = !!investmentName;

  useEffect(() => {
    if (open) {
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }
  }, [open]);

  return (
    <Sheet
      scrollViewRef={scrollViewRef}
      open={open}
      setOpen={setOpen}
      title={`What is ${investmentName}?`}
      desc={`${investmentName} is an exchange-traded product (ETP) that allows investing in Bitcoin through traditional brokerage accounts, including IRAs. The fund aims to track Bitcoin's price using the Fidelity Bitcoin Reference Rate.`}
      zIndex={2 * zIndexes.select}
      snapPoints={[90]}
      snapPointsMode="percent"
    >
      <YStack key={investmentName}>
        <H3 mb={16}>2. How does {investmentName} work?</H3>
        <Paragraph mb={16}>
          {investmentName} holds Bitcoin in custody through Fidelity Digital Asset Services. This provides investors
          exposure to Bitcoin without the need to manage cryptocurrency wallets or private keys themselves.
        </Paragraph>
        <H3 mb={16}>3. How to Invest?</H3>
        <Paragraph mb={16}>
          Invest through your Fidelity brokerage account or open a new one. {investmentName} is available in most
          brokerage, trust, and IRA accounts.
        </Paragraph>
        <H3 mb={16}>4. Investment Risks</H3>
        <Paragraph mb={32}>
          {investmentName} invests exclusively in Bitcoin, which is a highly volatile asset. Investors may lose their
          entire investment. {investmentName} is not a traditional ETF and is not registered under the Investment
          Company Act of 1940.
        </Paragraph>
        <Button variant="primary" onPress={() => setOpen(false)}>
          Back
        </Button>
      </YStack>
    </Sheet>
  );
}
