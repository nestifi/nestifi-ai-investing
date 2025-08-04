import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import type { GestureResponderEvent } from 'react-native';
import { Keyboard } from 'react-native';
import { XStack, YStack } from 'tamagui';
import z from 'zod';

import CoinbaseIcon from '@/assets/icons/coinbase.svg';
import BlackRockIcon from '@/assets/icons/etfs/blackrock.svg';
import CharlesIcon from '@/assets/icons/etfs/charles.svg';
import FidelityIcon from '@/assets/icons/etfs/fidelity.svg';
import FranklinIcon from '@/assets/icons/etfs/franklin.svg';
import VanguardIcon from '@/assets/icons/etfs/vanguard.svg';
import MorganBankIcon from '@/assets/icons/morgan.svg';
import { Button } from '@/components/button';
import { PlaceholderCalendar } from '@/components/calendar';
import { AmountInput } from '@/components/form/amount-input';
import { Label } from '@/components/form/label';
import { RadioGroup } from '@/components/form/radio-group';
import { Select } from '@/components/form/select';
import { Paragraph } from '@/components/paragraph';
import { InvestmentOptionSheet } from '@/components/screens/children/profile/investment-option-sheet';
import { COLORS } from '@/constants/colors';

interface Props {
  onCancel: () => void;
  onSubmit: SubmitHandler<InvestmentForm>;
}

const schema = z.object({
  payWith: z.string().min(1, { error: 'Payment method is required' }),
  investmentProduct: z.string().min(1, { error: 'Investment product is required' }),
  amount: z.number({ error: 'Amount is required' }).min(1, { error: 'Amount must be greater than 0' }),
  date: z.string({ error: 'Invalid date' }).min(1, { error: 'Date is required' })
});

type InvestmentForm = z.infer<typeof schema>;

const investmentProductOptions = [
  { title: '529 College Fund', icon: FidelityIcon, tooltip: true },
  { title: 'UTMA Fund', icon: FranklinIcon, tooltip: true },
  { title: 'UGMA Fund', icon: FranklinIcon, tooltip: true },
  { title: 'Index Fund', icon: VanguardIcon, tooltip: true },
  { title: 'Equities Fund', icon: CharlesIcon, tooltip: true },
  { title: 'Bitcoin ETF from Blackrock', icon: BlackRockIcon, tooltip: true },
  { title: 'Fidelity Bitcoin Fund ETF', icon: FidelityIcon, tooltip: true }
];

const radioOptions = [
  {
    id: '1111',
    title: (
      <XStack gap={4}>
        <MorganBankIcon />
        <Paragraph color={COLORS.grey[60]}>JPMorgan Chase Bank </Paragraph>
      </XStack>
    )
  },
  {
    id: '2222',
    title: (
      <XStack gap={4}>
        <CoinbaseIcon />
        <Paragraph color={COLORS.grey[60]}>Coinbase Wallet</Paragraph>
      </XStack>
    )
  }
] as const;

export function InvestmentForm({ onCancel, onSubmit }: Props) {
  const [selectedInvestment, setSelectedInvestment] = useState<string | null>(null);
  const form = useForm<InvestmentForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      payWith: '',
      investmentProduct: '',
      amount: 10,
      date: ''
    }
  });

  const onInvalid: SubmitErrorHandler<InvestmentForm> = (errors) => {
    console.error({ form: 'invite-form', errors });
  };

  const handleSavePress = (e: GestureResponderEvent) => {
    Keyboard.dismiss();
    void form.handleSubmit(onSubmit, onInvalid)(e);
  };

  const fillWithDefaults = () => {
    form.setValue('payWith', radioOptions[0].id);
    form.setValue('investmentProduct', investmentProductOptions[0]?.title ?? '');
    form.setValue('amount', 100);
    form.trigger();
  };

  return (
    <YStack gap="$4">
      <Controller
        control={form.control}
        name="payWith"
        render={({ field: { onChange, value }, fieldState }) => (
          <>
            <Label lineHeight={22} mb={6} onPress={fillWithDefaults}>
              Pay with
            </Label>
            <RadioGroup
              items={radioOptions}
              value={value}
              setValue={onChange}
              errorMessage={fieldState.error?.message}
            />
          </>
        )}
      />
      <Controller
        control={form.control}
        name="investmentProduct"
        render={({ field: { value, onChange, onBlur }, fieldState }) => (
          <Select
            options={investmentProductOptions}
            label="Investment product"
            placeholder="Select investment product"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onTooltipPress={(item) => {
              setSelectedInvestment(item.title);
            }}
            errorMessage={fieldState.error?.message}
          />
        )}
      />
      <InvestmentOptionSheet
        investmentName={selectedInvestment}
        setOpen={(open) => {
          setSelectedInvestment((prev) => (open ? prev : null));
        }}
      />
      <Controller
        control={form.control}
        name="amount"
        render={({ field: { value, onChange }, fieldState }) => (
          <AmountInput
            value={value}
            onChange={onChange}
            step={1}
            disabled={false}
            min={1}
            errorMessage={fieldState.error?.message}
            currency="USDC"
            showCurrentAmount
          />
        )}
      />
      <Controller
        control={form.control}
        name="date"
        render={({ field: { onChange }, fieldState }) => (
          <PlaceholderCalendar
            errorMessage={fieldState.error?.message}
            onChange={(value, type) => {
              onChange(`${type}-${value}`);
              form.trigger('date');
            }}
          />
        )}
      />
      <XStack gap={8}>
        <Button flex={1} variant="secondary" onPress={onCancel}>
          Cancel
        </Button>
        <Button flex={1} variant="primary" onPress={handleSavePress}>
          Save
        </Button>
      </XStack>
    </YStack>
  );
}
