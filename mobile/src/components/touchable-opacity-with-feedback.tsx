import * as Haptics from 'expo-haptics';
import { type TouchableOpacityProps, type GestureResponderEvent, TouchableOpacity } from 'react-native';

export function TouchableOpacityWithFeedback({
  onPress,
  activeOpacity = 0.85,
  children,
  ...rest
}: TouchableOpacityProps) {
  const pressWithHaptic = onPress
    ? (event: GestureResponderEvent) => {
        onPress(event);
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch((err) => {
          console.warn('Haptic feedback failed:', err);
        });
      }
    : undefined;

  return (
    <TouchableOpacity activeOpacity={activeOpacity} onPress={pressWithHaptic} {...rest}>
      {children}
    </TouchableOpacity>
  );
}
