import * as Clipboard from 'expo-clipboard';
import * as Linking from 'expo-linking';
import { Alert } from 'react-native';
import { YStack, XStack, View, SheetScrollView, Image } from 'tamagui';

import CopyIcon from '@/assets/icons/copy.svg';
import { Button } from '@/components/button';
import { Input } from '@/components/form/input';
import { Paragraph } from '@/components/paragraph';
import { Sheet } from '@/components/sheet';
import { TouchableOpacityWithFeedback } from '@/components/touchable-opacity-with-feedback';
import { COLORS } from '@/constants/colors';
import { env } from '@/constants/env';
import { SHARE_APPS } from '@/constants/share-apps';
import { useAuthState } from '@/store/auth';
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function SharePaymentLinkSheet({ open, setOpen }: Props) {
  const { session } = useAuthState();

  if (!session) {
    return null;
  }

  const shareLink = `${env.DEEPLINK_URL}/invite/98972729u`;

  const shareViaWhatsApp = async () => {
    try {
      await Linking.openURL(`whatsapp://send?text=${encodeURIComponent(shareLink)}`);
    } catch {
      Alert.alert('Failed to open whatsapp://');
    } finally {
      setOpen(false);
    }
  };

  return (
    <Sheet
      open={open}
      setOpen={setOpen}
      title="Share Payment Link"
      desc={`Share the link below with the family circle so they can invest in Dan's college fund.`}
    >
      <YStack>
        <View position="relative" mb={40}>
          <Input pr={46} value={shareLink} />
          <View position="absolute" b={10} r={16}>
            <TouchableOpacityWithFeedback
              activeOpacity={0.5}
              onPress={async () => {
                await Clipboard.setStringAsync(shareLink);
              }}
            >
              <CopyIcon />
            </TouchableOpacityWithFeedback>
          </View>
        </View>
        <SheetScrollView horizontal showsHorizontalScrollIndicator={false}>
          <XStack gap={20} mb={40}>
            {SHARE_APPS.map((app) => (
              <YStack key={app.name} gap={2}>
                <Image source={{ uri: app.icon }} width={60} height={60} objectFit="contain" />
                <Paragraph fontSize={11} text="center" color={COLORS.grey[100]}>
                  {app.name}
                </Paragraph>
              </YStack>
            ))}
          </XStack>
        </SheetScrollView>
        <Button variant="primary" fontWeight={700} onPress={shareViaWhatsApp}>
          Share via WhatsApp
        </Button>
      </YStack>
    </Sheet>
  );
}
