import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import type { GestureResponderEvent } from 'react-native';
import { Keyboard } from 'react-native';
import { View, XStack, YStack } from 'tamagui';
import z from 'zod';

import CardAmericanExpress from '@/assets/icons/card-american-express.svg';
import CardCVC from '@/assets/icons/card-cvc.svg';
import CardDiscover from '@/assets/icons/card-discover.svg';
import CardMastercard from '@/assets/icons/card-mastercard.svg';
import CardVisa from '@/assets/icons/card-visa.svg';
import { Button } from '@/components/button';
import { AmountInput } from '@/components/form/amount-input';
import { Input } from '@/components/form/input';
import { Select } from '@/components/form/select';
import { H2 } from '@/components/header';
import { BaseLayout } from '@/components/layout/base-layout';
import { Paragraph } from '@/components/paragraph';
import { COLORS } from '@/constants/colors';
import { countryOptions } from '@/mocks/countries';
import { useAuthState } from '@/store/auth';
import { useTransactionActions, useTransactionState } from '@/store/transaction';

const step1Schema = z.object({
  amount: z.number().min(1, 'Amount must be greater than 0')
});

type Step1Form = z.infer<typeof step1Schema>;

interface Step1Props {
  onClose: () => void;
  onSend: SubmitHandler<Step1Form>;
}

function Step1({ onClose, onSend }: Step1Props) {
  const form = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      amount: 200
    }
  });

  const onInvalid: SubmitErrorHandler<Step1Form> = (errors) => {
    console.error({ form: 'invite-flow-step-1', errors });
  };

  const handleSendPress = (e: GestureResponderEvent) => {
    Keyboard.dismiss();
    void form.handleSubmit(onSend, onInvalid)(e);
  };

  return (
    <YStack grow={1}>
      <View mb={24}>
        <Controller
          control={form.control}
          name="amount"
          render={({ field: { onChange, value } }) => <AmountInput value={value} onChange={onChange} step={1} />}
        />
      </View>
      <XStack gap={8} mt="auto" mb={16}>
        <Button grow={1} variant="secondary" onPress={onClose}>
          Cancel
        </Button>
        <Button grow={1} variant="primary" onPress={handleSendPress}>
          Send
        </Button>
      </XStack>
    </YStack>
  );
}

const step2Schema = z.object({
  email: z.email({ error: 'Email is required' }),
  cardNumber: z.string().min(1, 'Card number is required'),
  cardExpiry: z.string().min(1, 'Card expiry is required'),
  cardCVC: z.string().length(3, 'Card CVC must be 3 digits'),
  cardholderName: z.string().min(1, 'Cardholder name is required'),
  country: z.string().min(1, 'Country is required'),
  region: z.string().min(1, 'Region is required')
});

type Step2Form = z.infer<typeof step2Schema>;

interface Step2Props {
  onClose: () => void;
  onSend: SubmitHandler<Step2Form>;
}

function Step2({ onClose, onSend }: Step2Props) {
  const form = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      email: '',
      cardNumber: '',
      cardExpiry: '',
      cardCVC: '',
      cardholderName: '',
      country: '',
      region: ''
    }
  });

  const onInvalid: SubmitErrorHandler<Step2Form> = (errors) => {
    console.error({ form: 'invite-flow-step-2', errors });
  };

  const handleSendPress = (e: GestureResponderEvent) => {
    Keyboard.dismiss();
    void form.handleSubmit(onSend, onInvalid)(e);
  };

  const fillWithDefaults = () => {
    form.setValue('email', 'john.doe@example.com');
    form.setValue('cardNumber', '4242 4242 4242 4242');
    form.setValue('cardExpiry', '12/24');
    form.setValue('cardCVC', '123');
    form.setValue('cardholderName', 'John Doe');
    form.setValue('country', countryOptions[0] ?? '');
    form.setValue('region', '12345');
    form.trigger();
  };

  return (
    <YStack>
      <View mb={24}>
        <View onPress={fillWithDefaults} width="100%" height={24} />
        <Controller
          control={form.control}
          name="email"
          render={({ field: { value, onChange, onBlur }, fieldState }) => (
            <Input
              label="Email"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="example@gmail.com"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
      </View>
      <View mb={24}>
        <YStack>
          <View position="relative">
            <Controller
              control={form.control}
              name="cardNumber"
              render={({ field: { value, onChange, onBlur }, fieldState }) => (
                <Input
                  rounded={0}
                  borderTopLeftRadius={8}
                  borderTopRightRadius={8}
                  borderColor={fieldState.error ? COLORS.system.red : undefined}
                  pr={140}
                  label="Card information"
                  placeholder="xxxx-xxxx-xxxx-xxxx"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            <View position="absolute" b={10} r={16}>
              <XStack gap={1}>
                <CardVisa />
                <CardMastercard />
                <CardAmericanExpress />
                <CardDiscover />
              </XStack>
            </View>
          </View>
          <XStack>
            <View width="50%" position="relative">
              <Controller
                control={form.control}
                name="cardExpiry"
                render={({ field: { value, onChange, onBlur }, fieldState }) => (
                  <Input
                    rounded={0}
                    borderBottomLeftRadius={8}
                    borderTopColor="transparent"
                    borderRightColor="transparent"
                    placeholder="MM / YY"
                    focusStyle={{
                      borderTopColor: 'transparent',
                      borderRightColor: 'transparent'
                    }}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />
            </View>
            <View width="50%" position="relative">
              <Controller
                control={form.control}
                name="cardCVC"
                render={({ field: { value, onChange, onBlur }, fieldState }) => (
                  <Input
                    rounded={0}
                    borderBottomRightRadius={8}
                    borderTopColor="transparent"
                    focusStyle={{
                      borderTopColor: 'transparent'
                    }}
                    placeholder="CVC"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />
              <View position="absolute" t={13} r={16}>
                <CardCVC />
              </View>
            </View>
          </XStack>
        </YStack>
      </View>
      <View mb={24}>
        <Controller
          control={form.control}
          name="cardholderName"
          render={({ field: { value, onChange, onBlur }, fieldState }) => (
            <Input
              label="Cardholder Name"
              placeholder="Lorem ipsum"
              autoCapitalize="words"
              autoCorrect={false}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
      </View>
      <View mb={24}>
        <YStack>
          <Controller
            control={form.control}
            name="country"
            render={({ field: { value, onChange, onBlur }, fieldState }) => (
              <Select
                options={countryOptions}
                label="Country or region"
                inputProps={{
                  rounded: 0,
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  borderColor: fieldState.error ? COLORS.system.red : undefined
                }}
                placeholder="Country"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <Controller
            control={form.control}
            name="region"
            render={({ field: { value, onChange, onBlur }, fieldState }) => (
              <Input
                rounded={0}
                borderBottomLeftRadius={8}
                borderBottomRightRadius={8}
                placeholder="Region code"
                borderTopColor="transparent"
                borderColor={fieldState.error ? COLORS.system.red : undefined}
                autoCapitalize="none"
                autoCorrect={false}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </YStack>
      </View>
      <GiftSummary />
      <XStack gap={8} mt="auto" mb={16}>
        <Button grow={1} variant="secondary" onPress={onClose}>
          Cancel
        </Button>
        <Button grow={1} variant="primary" onPress={handleSendPress}>
          Send
        </Button>
      </XStack>
    </YStack>
  );
}

interface Step3Props {
  onConfirm: () => void;
}

function Step3({ onConfirm }: Step3Props) {
  return (
    <YStack grow={1}>
      <GiftSummary />
      <Button mt="auto" mb={16} variant="primary" onPress={onConfirm}>
        Confirm
      </Button>
    </YStack>
  );
}

function GiftSummary() {
  const { amount, fee, total } = useTransactionState();
  return (
    <YStack>
      <XStack justify="space-between" mb={12}>
        <Paragraph color={COLORS.grey[50]} fontWeight={500} fontSize={14}>
          Contribution amount:
        </Paragraph>
        <Paragraph color={COLORS.grey[100]} fontWeight={500} fontSize={14}>
          ${amount}
        </Paragraph>
      </XStack>
      <XStack justify="space-between" mb={8}>
        <Paragraph color={COLORS.grey[50]} fontWeight={500} fontSize={14}>
          NestiFi transaction fee:
        </Paragraph>
        <Paragraph color={COLORS.grey[100]} fontWeight={500} fontSize={14}>
          ${fee}
        </Paragraph>
      </XStack>
      <View width="100%" mb={24} borderColor={COLORS.grey[10]} borderWidth={1} />
      <XStack justify="space-between" mb={24}>
        <Paragraph color={COLORS.grey[100]} fontWeight={500} fontSize={14}>
          Total:
        </Paragraph>
        <Paragraph color={COLORS.grey[100]} fontWeight={700} fontSize={14}>
          ${total}
        </Paragraph>
      </XStack>
      <Paragraph mb={24} fontSize={12} fontWeight={400} numberOfLines={1} adjustsFontSizeToFit>
        By clicking Pay, you agree to the Link Terms and Privacy Policy
      </Paragraph>
    </YStack>
  );
}

export default function Page() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const { session } = useAuthState();
  const { amount, feePercentage, total } = useTransactionState();
  const { setAmount, setInvestmentDetails, resetState } = useTransactionActions();

  if (!session) {
    return null;
  }

  const title = (() => {
    if (step === 1) return 'Gift Deposit';
    if (step === 2) return 'Investment Details';
    if (step === 3) return 'Confirm Payment with 5% Fee';
  })();

  const desc = (() => {
    if (step === 1) return `Enter the amount you want to gift to Dan Williams`;
    if (step === 2) return `You’re about to send Dan a gift. Please review and confirm the details before proceeding`;
    if (step === 3)
      return `You’re about to complete your payment. A ${feePercentage * 100}% transaction fee will be added, making the final amount $${total}. Please review your payment details and confirm to proceed.`;
  })();

  const handleClose = () => {
    setStep(1);
    resetState();
  };

  return (
    <BaseLayout grow={1}>
      <H2 mt={16} mb={8}>
        {title}
      </H2>
      <Paragraph mb={24}>{desc}</Paragraph>
      {step === 1 && (
        <Step1
          onClose={handleClose}
          onSend={(data) => {
            setAmount(data.amount);
            setStep(2);
          }}
        />
      )}
      {step === 2 && (
        <Step2
          onClose={handleClose}
          onSend={(data) => {
            setInvestmentDetails(data);
            setStep(3);
          }}
        />
      )}
      {step === 3 && (
        <Step3
          onConfirm={() => {
            router.navigate({
              pathname: '/(public)/success',
              params: { amount: amount.toString() }
            });
          }}
        />
      )}
    </BaseLayout>
  );
}
