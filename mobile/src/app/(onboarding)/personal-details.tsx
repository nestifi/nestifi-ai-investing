import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useState } from 'react';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import type { GestureResponderEvent } from 'react-native';
import { Keyboard } from 'react-native';
import { View, XStack, YStack, Image } from 'tamagui';
import z from 'zod';

import PhotoIcon from '@/assets/icons/photo.svg';
import ShieldIcon from '@/assets/icons/shield.svg';
import { Button } from '@/components/button';
import { Input } from '@/components/form/input';
import { Select } from '@/components/form/select';
import { H2 } from '@/components/header';
import { BaseLayout } from '@/components/layout/base-layout';
import { Paragraph } from '@/components/paragraph';
import { TouchableOpacityWithFeedback } from '@/components/touchable-opacity-with-feedback';
import { COLORS } from '@/constants/colors';
import { adultAvatarImageUri, childAvatarImageUri } from '@/constants/images';
import { useAuthActions } from '@/store/auth';
import { useOnboardingActions, useOnboardingState } from '@/store/onboarding';

const schema = z.object({
  firstName: z.string().min(1, { error: 'First name is required' }),
  lastName: z.string().min(1, { error: 'Last name is required' }),
  birthDate: z.string().min(1, { error: 'Date of birth is required' }),
  gender: z.string().min(1, { error: 'Gender is required' }),
  ssn: z.string().min(1, { error: 'SSN is required' })
});

type PersonalDetailsForm = z.infer<typeof schema>;

export default function PersonalDetailsPage() {
  const { accountType, personalDetails } = useOnboardingState();
  const [photo, setPhoto] = useState<string | null>(personalDetails?.photo ?? null);
  const { resetState, setPersonalDetails } = useOnboardingActions();
  const { finishOnboarding } = useAuthActions();
  const form = useForm<PersonalDetailsForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: personalDetails?.firstName,
      lastName: personalDetails?.lastName,
      birthDate: personalDetails?.dateOfBirth,
      gender: personalDetails?.gender,
      ssn: personalDetails?.ssn
    }
  });

  const imageUri = accountType === 'ADULT' ? adultAvatarImageUri : childAvatarImageUri;
  const genderOptions = ['Male', 'Female', 'Other'];

  const onSubmit: SubmitHandler<PersonalDetailsForm> = async (data) => {
    setPersonalDetails({
      photo,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.birthDate,
      gender: data.gender,
      ssn: data.ssn
    });

    if (accountType !== 'CHILD') {
      router.navigate('/(onboarding)/income-informations');
    } else {
      await finishOnboarding({
        accountType: 'CHILD',
        personalDetails: {
          photo,
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.birthDate,
          gender: data.gender,
          ssn: data.ssn
        },
        familyCircle: [],
        incomeInformation: null
      });
      resetState();
    }
  };

  const onInvalid: SubmitErrorHandler<PersonalDetailsForm> = (errors) => {
    console.error({ form: 'personal-details', errors });
  };

  const handleContinuePress = (e: GestureResponderEvent) => {
    Keyboard.dismiss();
    void form.handleSubmit(onSubmit, onInvalid)(e);
  };

  const fillWithDefaults = () => {
    setPhoto(imageUri);
    form.setValue('firstName', 'Doe');
    form.setValue('lastName', 'John');
    form.setValue('birthDate', '01/01/2010');
    form.setValue('gender', genderOptions[0] ?? '');
    form.setValue('ssn', '45-123-1234');
    form.trigger();
  };

  return (
    <BaseLayout grow={1}>
      <View justify="center" flexDirection="row" gap="$2" items="center" p="$4" mb="$2">
        <View width={32} height={8} rounded={4} bg={COLORS.grey[20]} />
        <View width={32} height={8} rounded={4} bg={COLORS.accent[90]} />
        <View width={32} height={8} rounded={4} bg={COLORS.grey[20]} />
      </View>
      <YStack gap={24}>
        <YStack gap={16}>
          <H2 text="center" onPress={fillWithDefaults}>
            Personal Details
          </H2>
          <Paragraph>Enter information below to personalize your experience. Your data is safe.</Paragraph>
        </YStack>
        <YStack gap={8} items="center">
          {photo ? (
            <Image source={{ uri: photo }} rounded={50} width={96} height={96} objectFit="contain" />
          ) : (
            <View rounded={50} width={96} height={96} justify="center" items="center" bg={COLORS.accent[50]}>
              <PhotoIcon height={40} width={40} />
            </View>
          )}
          <TouchableOpacityWithFeedback onPress={() => setPhoto(imageUri)} activeOpacity={0.8}>
            <Paragraph color={COLORS.accent[90]}>{photo ? 'Change photo' : 'Add photo'}</Paragraph>
          </TouchableOpacityWithFeedback>
        </YStack>
        <YStack gap={16}>
          <XStack gap={8}>
            <Controller
              control={form.control}
              name="firstName"
              render={({ field: { value, onChange, onBlur }, fieldState }) => (
                <Input
                  label="First name"
                  placeholder="Sandy"
                  autoCapitalize="words"
                  autoCorrect={false}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name="lastName"
              render={({ field: { value, onChange, onBlur }, fieldState }) => (
                <Input
                  label="Last name"
                  placeholder="Mendes"
                  autoCapitalize="words"
                  autoCorrect={false}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
          </XStack>
          <XStack gap={8}>
            <Controller
              control={form.control}
              name="birthDate"
              render={({ field: { value, onChange, onBlur }, fieldState }) => (
                <Input
                  label="Date of birth"
                  placeholder="12/12/1965"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name="gender"
              render={({ field: { value, onChange, onBlur }, fieldState }) => (
                <Select
                  options={genderOptions}
                  label="Gender"
                  placeholder="Select gender"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
          </XStack>
          <Controller
            control={form.control}
            name="ssn"
            render={({ field: { value, onChange, onBlur }, fieldState }) => (
              <Input
                label="SSN"
                placeholder="544-45-7289"
                autoCapitalize="none"
                autoCorrect={false}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </YStack>
      </YStack>
      <XStack gap={8} mt={8} mb={32}>
        <ShieldIcon />
        <Paragraph flex={1} variant="secondary">
          Your data is securely encrypted and protected. We prioritize your privacy and safety.
        </Paragraph>
      </XStack>
      <YStack mt="auto" justify="flex-end" mb="$6">
        <Button
          //   disabled={!session?.type}
          variant="primary"
          onPress={handleContinuePress}
        >
          Confirm
        </Button>
      </YStack>
    </BaseLayout>
  );
}
