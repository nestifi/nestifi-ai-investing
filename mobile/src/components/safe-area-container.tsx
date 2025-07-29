import { useNavigation } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, type ViewProps } from 'tamagui';

export const SafeAreaContainer: React.FC<ViewProps> = ({ children, ...props }) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const isInTabView = navigation.getState()?.type === 'tab';

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: isInTabView ? 0 : insets.bottom,
        flex: 1
      }}
      {...props}
    >
      {children}
    </View>
  );
};
