import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import type { GestureResponderEvent } from 'react-native';
import { Keyboard } from 'react-native';
import { SizableText, View, YStack } from 'tamagui';
import z from 'zod';

import { Button } from '@/components/button';
import { Checkbox } from '@/components/form/checkbox';
import { Select } from '@/components/form/select';
import { H2 } from '@/components/header';
import { BaseLayout } from '@/components/layout/base-layout';
import { Paragraph } from '@/components/paragraph';
import { COLORS } from '@/constants/colors';
import { useOnboardingActions, useOnboardingState } from '@/store/onboarding';

const schema = z.object({
  employmentStatus: z.string().min(1, { error: 'Employment status is required' }),
  annualIncome: z.string().min(1, { error: 'Annual income is required' }),
  federalTaxBracket: z.string().min(1, { error: 'Federal tax bracket is required' }),
  termsAndConditions: z.boolean().refine((v) => v === true, { error: 'You must accept the terms and conditions' })
});

type IncomeInformationForm = z.infer<typeof schema>;

const employmentStatusOptions = ['Employed', 'Unemployed', 'Self-employed', 'Student', 'Retired', 'Other'];
const annualIncomeOptions = [
  '0 - 100,000 $',
  '100,000 - 150,000 $',
  '150,000 - 200,000 $',
  '200,000 - 250,000 $',
  '250,000 - 300,000 $',
  '300,000 $+'
];
const federalTaxBracketOptions = ['0-10%', '11-13%', '13-22%', '23-50%', '51-100%'];

export default function IncomeInformationsPage() {
  const { accountType, incomeInformation } = useOnboardingState();
  const { setIncomeInformation } = useOnboardingActions();
  const form = useForm<IncomeInformationForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      employmentStatus: incomeInformation?.employmentStatus ?? '',
      annualIncome: incomeInformation?.annualIncome ?? '',
      federalTaxBracket: incomeInformation?.federalTaxBracket ?? '',
      termsAndConditions: !!incomeInformation
    }
  });

  const onSubmit: SubmitHandler<IncomeInformationForm> = async (data) => {
    setIncomeInformation({
      employmentStatus: data.employmentStatus,
      annualIncome: data.annualIncome,
      federalTaxBracket: data.federalTaxBracket
    });

    if (accountType !== 'CHILD') {
      router.navigate('/(onboarding)/connect-your-account');
    }
  };

  const onInvalid: SubmitErrorHandler<IncomeInformationForm> = (errors) => {
    console.error({ form: 'income-informations', errors });
  };

  const handleContinuePress = (e: GestureResponderEvent) => {
    Keyboard.dismiss();
    void form.handleSubmit(onSubmit, onInvalid)(e);
  };

  const fillWithDefaults = () => {
    form.setValue('employmentStatus', employmentStatusOptions[0] ?? '');
    form.setValue('annualIncome', annualIncomeOptions[0] ?? '');
    form.setValue('federalTaxBracket', federalTaxBracketOptions[0] ?? '');
    form.setValue('termsAndConditions', true);
    form.trigger();
  };

  return (
    <BaseLayout grow={1}>
      <View justify="center" flexDirection="row" gap="$2" items="center" p="$4" mb="$2">
        <View width={32} height={8} rounded={4} bg={COLORS.grey[20]} />
        <View width={32} height={8} rounded={4} bg={COLORS.grey[20]} />
        <View width={32} height={8} rounded={4} bg={COLORS.accent[90]} />
      </View>
      <YStack gap={24} mb={24}>
        <YStack gap={16}>
          <H2 text="center" onPress={fillWithDefaults}>
            Income information
          </H2>
          <Paragraph>Share your financial details to get personalized recommendations that fit your needs.</Paragraph>
        </YStack>
        <YStack gap={16}>
          <Controller
            control={form.control}
            name="employmentStatus"
            render={({ field: { value, onChange, onBlur }, fieldState }) => (
              <Select
                options={employmentStatusOptions}
                label="Employment status"
                placeholder="Choose option"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={form.control}
            name="annualIncome"
            render={({ field: { value, onChange, onBlur }, fieldState }) => (
              <Select
                options={annualIncomeOptions}
                label="Annual income"
                placeholder="0$"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={form.control}
            name="federalTaxBracket"
            render={({ field: { value, onChange, onBlur }, fieldState }) => (
              <Select
                options={federalTaxBracketOptions}
                label="Federal tax bracket"
                placeholder="0%"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </YStack>
      </YStack>
      <Controller
        control={form.control}
        name="termsAndConditions"
        render={({ field: { value, onChange }, fieldState }) => {
          return (
            <Checkbox
              checked={value}
              onCheckedChange={onChange}
              errorMessage={fieldState.error?.message}
              label={
                <>
                  I confirm that I have read, understood, and agree to NestiFi{' '}
                  <SizableText
                    onPress={() => router.navigate('/(onboarding)/terms-and-conditions')}
                    textDecorationLine="underline"
                    fontSize={16}
                    color={COLORS.grey[100]}
                  >
                    Terms and Conditions
                  </SizableText>
                  .
                </>
              }
            />
          );
        }}
      />
      <YStack mt="auto" justify="flex-end" mb="$6">
        <Button variant="primary" onPress={handleContinuePress}>
          Confirm
        </Button>
      </YStack>
    </BaseLayout>
  );
}
