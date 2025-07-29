import type { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { Tabs, useSegments } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import TabsChatIcon from '@/assets/icons/tabs-chat.svg';
import TabsFamilyIcon from '@/assets/icons/tabs-family.svg';
import TabsHomeIcon from '@/assets/icons/tabs-home.svg';
import TabsRewardsIcon from '@/assets/icons/tabs-rewards.svg';
import TabsWalletIcon from '@/assets/icons/tabs-wallet.svg';
import { PressableWithFeedback } from '@/components/pressable-with-feedback';
import { COLORS } from '@/constants/colors';

function TabButton(props: BottomTabBarButtonProps) {
  // Remove props with null values to satisfy TouchableOpacityProps
  const filteredProps = Object.fromEntries(Object.entries(props).filter(([_, v]) => v !== null));

  return <PressableWithFeedback {...filteredProps} />;
}

export default function HomeLayout() {
  const insets = useSafeAreaInsets();
  const segments = useSegments();
  const currentTab = segments[2];

  const shouldHideTabBar = currentTab === 'family';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: !shouldHideTabBar
          ? {
              backgroundColor: COLORS.white,
              height: 60 + insets.bottom,
              paddingBottom: insets.bottom
            }
          : { display: 'none' },
        tabBarActiveTintColor: COLORS.accent[90],
        tabBarInactiveTintColor: COLORS.grey[50],
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginBottom: 5
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabsHomeIcon width={24} height={24} color={color} />,
          tabBarButton: TabButton,
          sceneStyle: {
            backgroundColor: COLORS.grey[100]
          }
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color }) => <TabsWalletIcon width={24} height={24} color={color} />,
          tabBarButton: TabButton,
          sceneStyle: {
            backgroundColor: COLORS.grey[100]
          }
        }}
      />
      <Tabs.Screen
        name="family"
        options={{
          title: '',
          tabBarIcon: () => (
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: '#0B6E47',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 30,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 4
              }}
            >
              <TabsFamilyIcon width={30} height={30} color="#fff" />
            </View>
          ),
          sceneStyle: {
            backgroundColor: COLORS.white,
            paddingBottom: insets.bottom
          }
        }}
      />
      <Tabs.Screen
        name="seb"
        options={{
          title: 'Seb',
          tabBarIcon: ({ color }) => <TabsChatIcon width={24} height={24} color={color} />,
          tabBarButton: TabButton
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: 'Rewards',
          tabBarIcon: ({ color }) => <TabsRewardsIcon width={24} height={24} color={color} />,
          tabBarButton: TabButton,
          sceneStyle: {
            backgroundColor: COLORS.white
          }
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: null
        }}
      />
    </Tabs>
  );
}
