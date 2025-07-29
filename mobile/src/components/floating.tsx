import { Platform } from 'react-native';
import { useWindowDimensions, YStack } from 'tamagui';

export const FloatingWrapper = ({ children }: { children: React.ReactElement }) => {
  const { width } = useWindowDimensions();
  return (
    <YStack position="absolute" b={Platform.OS === 'ios' ? 16 : 48} l={16} z={100} width={width - 32} flex={1} pb={16}>
      {children}
    </YStack>
  );
};
