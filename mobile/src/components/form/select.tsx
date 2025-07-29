import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import type { SelectProps, SelectTriggerProps } from 'tamagui';
import { Adapt, Select as TamaguiSelect, YStack, styled } from 'tamagui';

import { ErrorMessage } from '@/components/form/error-message';
import { Label } from '@/components/form/label';
import { COLORS } from '@/constants/colors';

export const StyledTrigger = styled(TamaguiSelect.Trigger, {
  color: COLORS.grey[100],
  bg: COLORS.white,
  borderColor: COLORS.grey[20],
  rounded: 8,
  variants: {
    hasError: {
      true: {
        borderColor: COLORS.system.red,
        borderWidth: 1
      }
    }
  }
});

export const Select = ({
  label,
  placeholder,
  options,
  errorMessage,
  id,
  inputProps,
  onChange,
  onBlur,
  ...props
}: Omit<SelectProps, 'onValueChange' | 'onOpenChange'> & {
  label: string;
  placeholder: string;
  options: string[];
  onChange: SelectProps['onValueChange'];
  onBlur: SelectProps['onOpenChange'];
  inputProps?: SelectTriggerProps;
  id?: string;
  errorMessage?: string;
}) => {
  return (
    <YStack gap="$1.5" flex={1}>
      <Label htmlFor={id} lineHeight={16 * 1.5}>
        {label}
      </Label>
      <TamaguiSelect onValueChange={onChange} onOpenChange={onBlur} {...props}>
        <StyledTrigger flex={0} hasError={!!errorMessage} {...inputProps}>
          <TamaguiSelect.Value color={props.value ? COLORS.grey[100] : COLORS.grey[50]} placeholder={placeholder} />
          <ChevronDown size={20} />
        </StyledTrigger>
        <Adapt platform="touch">
          <TamaguiSelect.Sheet
            modal
            dismissOnSnapToBottom
            snapPoints={['fit']}
            snapPointsMode="fit"
            animation="medium"
            zIndex={1_000_000}
          >
            <TamaguiSelect.Sheet.Frame>
              <TamaguiSelect.Sheet.ScrollView contentContainerStyle={{ justify: 'center', items: 'center', pb: 64 }}>
                <Adapt.Contents />
              </TamaguiSelect.Sheet.ScrollView>
            </TamaguiSelect.Sheet.Frame>
            <TamaguiSelect.Sheet.Overlay
              animation="lazy"
              bg="$shadow6"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </TamaguiSelect.Sheet>
        </Adapt>
        <TamaguiSelect.Content>
          <TamaguiSelect.ScrollUpButton items="center" justify="center" position="relative" width="100%" height="$3">
            <YStack z={10}>
              <ChevronUp size={20} color="white" />
            </YStack>
          </TamaguiSelect.ScrollUpButton>
          <TamaguiSelect.Viewport minW={200} z={100}>
            <TamaguiSelect.Group>
              <TamaguiSelect.Label>{label}</TamaguiSelect.Label>
              {options.map((item, i) => {
                return (
                  <TamaguiSelect.Item
                    index={i}
                    px="$4"
                    py="$3"
                    borderBottomWidth={1}
                    key={item}
                    pressStyle={{
                      bg: COLORS.grey[10]
                    }}
                    value={item}
                  >
                    <TamaguiSelect.ItemText>{item}</TamaguiSelect.ItemText>
                    <TamaguiSelect.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </TamaguiSelect.ItemIndicator>
                  </TamaguiSelect.Item>
                );
              })}
            </TamaguiSelect.Group>
          </TamaguiSelect.Viewport>
          <TamaguiSelect.ScrollDownButton items="center" justify="center" position="relative" width="100%" height="$3">
            <YStack z={10}>
              <ChevronDown size={20} />
            </YStack>
          </TamaguiSelect.ScrollDownButton>
        </TamaguiSelect.Content>
      </TamaguiSelect>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </YStack>
  );
};
