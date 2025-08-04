import { zodResolver } from '@hookform/resolvers/zod';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import type { GestureResponderEvent } from 'react-native';
import { Keyboard } from 'react-native';
import { SizableText, View, XStack, YStack } from 'tamagui';
import z from 'zod';

import { Input } from '@/components/form/input';
import { PressableWithFeedback } from '@/components/pressable-with-feedback';
import { COLORS } from '@/constants/colors';

interface Props {
  onSubmit: SubmitHandler<InviteForm>;
}

const schema = z.object({
  firstName: z.string().min(1, { error: 'First name is required' }),
  lastName: z.string().min(1, { error: 'Last name is required' }),
  phone: z.string().min(1, { error: 'Phone number is required' })
});

type InviteForm = z.infer<typeof schema>;

export function InviteForm({ onSubmit }: Props) {
  const form = useForm<InviteForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: ''
    }
  });

  const onInvalid: SubmitErrorHandler<InviteForm> = (errors) => {
    console.error({ form: 'invite-form', errors });
  };

  const handleSendInvitePress = (e: GestureResponderEvent) => {
    Keyboard.dismiss();
    void form.handleSubmit(onSubmit, onInvalid)(e);
  };

  const fillWithDefaults = () => {
    form.setValue('firstName', 'John');
    form.setValue('lastName', 'Doe');
    form.setValue('phone', '+1 (123) 456-7890');
    form.trigger();
  };

  return (
    <>
      <View width="100%" height={24} onPress={fillWithDefaults} />
      <YStack items="center" bg={COLORS.accent[50]} rounded={16} gap={12} p={16}>
        <XStack gap={8}>
          <Controller
            control={form.control}
            name="firstName"
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <Input
                label="First name"
                placeholder="Harry"
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
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <Input
                label="Last name"
                placeholder="Soures"
                autoCapitalize="words"
                autoCorrect={false}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                errorMessage={fieldState.error?.message}
                flex={1}
              />
            )}
          />
        </XStack>
        <Controller
          control={form.control}
          name="phone"
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <Input
              label="Phone number"
              placeholder="+1 (310) 525-43-63"
              autoCapitalize="none"
              autoCorrect={false}
              value={value}
              onChangeText={(text) => {
                const formattedText = text === '' || text.startsWith('+') ? text : `+${text}`;
                onChange(formattedText);
              }}
              onBlur={onBlur}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
        <PressableWithFeedback onPress={handleSendInvitePress}>
          <SizableText fontWeight={700} color={COLORS.grey[100]}>
            Send invite
          </SizableText>
        </PressableWithFeedback>
      </YStack>
    </>
  );
}
