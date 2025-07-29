import * as Haptics from 'expo-haptics';
import { type PressableProps, type GestureResponderEvent, Pressable } from 'react-native';

export function PressableWithFeedback({ onPress, children, ...rest }: PressableProps) {
  const pressWithHaptic = onPress
    ? (event: GestureResponderEvent) => {
        onPress(event);
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch((err) => {
          console.warn('Haptic feedback failed:', err);
        });
      }
    : undefined;

  return (
    <Pressable onPress={pressWithHaptic} {...rest}>
      {children}
    </Pressable>
  );
}
