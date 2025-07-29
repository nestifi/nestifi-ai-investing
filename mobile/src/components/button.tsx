import { Button as TamaguiButton } from '@tamagui/button';
import { styled } from '@tamagui/core';
import * as Haptics from 'expo-haptics';
import type { GestureResponderEvent } from 'react-native';
import { Spinner, type ButtonProps } from 'tamagui';

import { COLORS } from '@/constants/colors';

type Variant = 'primary' | 'secondary' | 'tertiary' | 'tertiary-outlined';

interface Props extends Omit<ButtonProps, 'variant'> {
  isLoading?: boolean;
  variant?: Variant;
}

const spinnerColor = (variant: Variant) => {
  switch (variant) {
    case 'primary':
    case 'tertiary':
      return COLORS.white;
    case 'secondary':
      return COLORS.accent[70];
    case 'tertiary-outlined':
      return COLORS.grey[80];
  }
};

export const StyledButton = styled(TamaguiButton, {
  variants: {
    variant: {
      primary: {
        bg: COLORS.accent[90],
        color: COLORS.grey[0],
        borderColor: COLORS.accent[90],
        pressStyle: { bg: COLORS.accent[100], borderColor: COLORS.accent[100] },
        disabledStyle: { bg: COLORS.grey[50], borderColor: COLORS.grey[50], color: COLORS.grey[0] }
      },
      secondary: {
        bg: COLORS.grey[0],
        color: COLORS.accent[90],
        borderColor: COLORS.accent[90],
        pressStyle: {
          color: COLORS.accent[100],
          bg: COLORS.grey[0],
          borderColor: COLORS.accent[100]
        },
        disabledStyle: {
          color: COLORS.grey[30],
          borderColor: COLORS.accent[50]
        }
      },
      tertiary: {
        bg: COLORS.grey[90],
        color: COLORS.grey[0],
        pressStyle: {
          bg: COLORS.grey[100]
        }
      },
      'tertiary-outlined': {
        bg: COLORS.grey[0],
        borderColor: COLORS.grey[90],
        color: COLORS.grey[90],
        pressStyle: {
          bg: COLORS.grey[0],
          borderColor: COLORS.grey[100],
          color: COLORS.grey[100]
        }
      }
    },
    isLoading: {
      true: {
        opacity: 0.85,
        pointerEvents: 'none'
      },
      false: {}
    }
  } as const
});

export const Button = ({ isLoading, children, onPress, ...props }: Props) => {
  const loading = isLoading ?? false;

  const pressWithHaptic = onPress
    ? (event: GestureResponderEvent) => {
        onPress(event);
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch((err) => {
          console.warn('Haptic feedback failed:', err);
        });
      }
    : undefined;

  return (
    <StyledButton
      isLoading={isLoading}
      icon={loading ? () => <Spinner size="small" color={spinnerColor(props.variant ?? 'primary')} /> : props.icon}
      onPress={pressWithHaptic}
      {...props}
    >
      {loading ? null : children}
    </StyledButton>
  );
};
