import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useState } from 'react';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import type { GestureResponderEvent } from 'react-native';
import { Keyboard } from 'react-native';
import { YStack, Image, View, XStack } from 'tamagui';
import z from 'zod';

import PhotoIcon from '@/assets/icons/photo.svg';
import { Button } from '@/components/button';
import { Input } from '@/components/form/input';
import { Select } from '@/components/form/select';
import { BackButton } from '@/components/layout/back-button';
import { BaseLayout } from '@/components/layout/base-layout';
import { Paragraph } from '@/components/paragraph';
import { TouchableOpacityWithFeedback } from '@/components/touchable-opacity-with-feedback';
import { COLORS } from '@/constants/colors';
import { childAvatarImageUri } from '@/constants/images';
import { useOnboardingActions, useOnboardingState } from '@/store/onboarding';

const schema = z.object({
  firstName: z.string().min(1, { error: 'First name is required' }),
  lastName: z.string().min(1, { error: 'Last name is required' }),
  birthDate: z.string().min(1, { error: 'Date of birth is required' }),
  gender: z.string().min(1, { error: 'Gender is required' }),
  guardianPhone: z.string().min(1, { error: "Guardian's phone number is required" }),
  guardianEmail: z.string().email({ message: 'Invalid email address' }),
  ssn: z.string().min(1, { error: 'SSN is required' })
});

type AddChildForm = z.infer<typeof schema>;

const genderOptions = ['Male', 'Female', 'Other'];

export default function Page() {
  const [showImage, setShowImage] = useState(false);
  const { familyCircle } = useOnboardingState();
  const { addChild } = useOnboardingActions();
  const form = useForm<AddChildForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      birthDate: '',
      gender: '',
      guardianPhone: '',
      guardianEmail: '',
      ssn: ''
    }
  });

  const imageUri = showImage ? childAvatarImageUri : null;

  const onSubmit: SubmitHandler<AddChildForm> = async (data) => {
    addChild({
      id: familyCircle.length,
      photo: imageUri ?? null,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.birthDate,
      gender: data.gender,
      guardianPhone: data.guardianPhone,
      guardianEmail: data.guardianEmail,
      ssn: data.ssn,
      familyCircle: [],
      futureGoals: [],
      investment: null
    });

    router.navigate('/(onboarding)/(children)/family-circle');
  };

  const onInvalid: SubmitErrorHandler<AddChildForm> = (errors) => {
    console.error({ form: 'add-child', errors });
  };

  const handleContinuePress = (e: GestureResponderEvent) => {
    Keyboard.dismiss();
    void form.handleSubmit(onSubmit, onInvalid)(e);
  };

  const fillWithDefaults = () => {
    setShowImage(true);
    form.setValue('firstName', 'John');
    form.setValue('lastName', 'Doe');
    form.setValue('birthDate', '01/01/2010');
    form.setValue('gender', genderOptions[0] ?? '');
    form.setValue('guardianPhone', '123-456-7890');
    form.setValue('guardianEmail', 'john.doe@example.com');
    form.setValue('ssn', '123-45-6789');
    form.trigger();
  };

  return (
    <BaseLayout minH="100%">
      <BackButton title="Child's Details" onTitlePress={fillWithDefaults} />
      <Paragraph>Add personal information of the child you want to invest in.</Paragraph>
      <YStack gap={8} items="center" my={16}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} rounded={50} width={96} height={96} objectFit="contain" />
        ) : (
          <View rounded={50} width={96} height={96} justify="center" items="center" bg={COLORS.accent[50]}>
            <PhotoIcon height={40} width={40} />
          </View>
        )}
        <TouchableOpacityWithFeedback onPress={() => setShowImage(true)} activeOpacity={0.8}>
          <Paragraph color={COLORS.accent[90]}>{showImage ? 'Change photo' : 'Add photo'}</Paragraph>
        </TouchableOpacityWithFeedback>
      </YStack>
      <YStack gap={16} mb={32}>
        <XStack gap={8}>
          <Controller
            control={form.control}
            name="firstName"
            render={({ field: { value, onChange, onBlur }, fieldState }) => (
              <Input
                label="First name"
                placeholder="Sandy"
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
            name="lastName"
            render={({ field: { value, onChange, onBlur }, fieldState }) => (
              <Input
                label="Last name"
                placeholder="Mendes"
                autoCapitalize="none"
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
                placeholder="12/12/2015"
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
          name="guardianPhone"
          render={({ field: { value, onChange, onBlur }, fieldState }) => (
            <Input
              label="Guardian's phone number"
              placeholder="+1 2137-2137-22"
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
          name="guardianEmail"
          render={({ field: { value, onChange, onBlur }, fieldState }) => (
            <Input
              label="Guardian's E-mail"
              placeholder="example@email.com"
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
      <Button variant="primary" onPress={handleContinuePress} mb="$6">
        Confirm
      </Button>
    </BaseLayout>
  );
}
