import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import type { SelectProps, SelectTriggerProps } from 'tamagui';
import { Adapt, Select as TamaguiSelect, XStack, YStack, styled } from 'tamagui';

import InfoIcon from '@/assets/icons/tooltip.svg';
import { ErrorMessage } from '@/components/form/error-message';
import { Label } from '@/components/form/label';
import { TouchableOpacityWithFeedback } from '@/components/touchable-opacity-with-feedback';
import { COLORS } from '@/constants/colors';
import { zIndexes } from '@/constants/z-index';

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

type Option =
  | string
  | {
      title: string;
      icon: typeof InfoIcon | null;
      tooltip?: boolean;
    };

export const Select = ({
  label,
  placeholder,
  options,
  errorMessage,
  id,
  inputProps,
  onChange,
  onBlur,
  onTooltipPress,
  ...props
}: Omit<SelectProps, 'onValueChange' | 'onOpenChange'> & {
  label: string;
  placeholder: string;
  options: Option[];
  onChange: SelectProps['onValueChange'];
  onBlur: SelectProps['onOpenChange'];
  onTooltipPress?: (item: Extract<Option, object>) => void;
  inputProps?: SelectTriggerProps;
  id?: string;
  errorMessage?: string;
}) => {
  const selectedOption = options.find((o) => (typeof o === 'string' ? o === props.value : o.title === props.value));

  return (
    <YStack gap="$1.5" flex={1}>
      <Label htmlFor={id} lineHeight={16 * 1.5}>
        {label}
      </Label>
      <TamaguiSelect onValueChange={onChange} onOpenChange={onBlur} {...props}>
        <StyledTrigger flex={0} hasError={!!errorMessage} {...inputProps}>
          <XStack gap={8} items="center" justify="center">
            {typeof selectedOption === 'object' && selectedOption.icon && (
              <selectedOption.icon width={24} height={24} />
            )}
            <TamaguiSelect.Value color={props.value ? COLORS.grey[100] : COLORS.grey[50]} placeholder={placeholder} />
          </XStack>
          <ChevronDown size={20} />
        </StyledTrigger>
        <Adapt platform="touch">
          <TamaguiSelect.Sheet
            modal
            dismissOnSnapToBottom
            snapPoints={['fit']}
            snapPointsMode="fit"
            animation="medium"
            zIndex={zIndexes.select}
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
                if (typeof item === 'string') {
                  return (
                    <TamaguiSelect.Item
                      index={i}
                      px="$4"
                      py="$3"
                      borderBottomWidth={1}
                      key={item}
                      value={item}
                      pressStyle={{
                        bg: COLORS.grey[10]
                      }}
                    >
                      <TamaguiSelect.ItemText>{item}</TamaguiSelect.ItemText>
                      <TamaguiSelect.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </TamaguiSelect.ItemIndicator>
                    </TamaguiSelect.Item>
                  );
                }

                return (
                  <TamaguiSelect.Item
                    index={i}
                    px="$4"
                    py="$3"
                    borderBottomWidth={1}
                    key={item.title}
                    value={item.title}
                    pressStyle={{
                      bg: COLORS.grey[10]
                    }}
                  >
                    <XStack gap={8} items="center">
                      {item.icon && <item.icon width={24} height={24} />}
                      <TamaguiSelect.ItemText>{item.title}</TamaguiSelect.ItemText>
                      {item.tooltip === true && (
                        <TouchableOpacityWithFeedback
                          onPress={(e) => {
                            e.stopPropagation();
                            onTooltipPress?.(item);
                          }}
                        >
                          <InfoIcon width={16} height={16} />
                        </TouchableOpacityWithFeedback>
                      )}
                    </XStack>
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
