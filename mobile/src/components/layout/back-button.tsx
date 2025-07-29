import { router } from 'expo-router';
import { View, XStack } from 'tamagui';

import ChevronIcon from '@/assets/icons/chevron.svg';
import { Button } from '@/components/button';
import { H3 } from '@/components/header';
import { COLORS } from '@/constants/colors';

interface Props {
  title?: string;
  hiddenGoBack?: boolean;
  style?: 'light' | 'dark';
  onTitlePress?: () => void;
}

export const BackButton: React.FC<Props> = ({ title, hiddenGoBack, style = 'dark', onTitlePress }) => (
  <XStack justify={(hiddenGoBack ?? false) ? 'center' : 'space-between'} gap={8} items="center" py="$3">
    {!(hiddenGoBack ?? false) && (
      <Button
        icon={<ChevronIcon width={24} height={24} color={style === 'dark' ? COLORS.grey[100] : COLORS.white} />}
        p={0}
        bg="transparent"
        pressStyle={{ bg: 'transparent', borderColor: 'transparent' }}
        rounded={20}
        onPress={() => router.back()}
      />
    )}
    {title && (
      <H3 lineHeight={40} onPress={onTitlePress} color={style === 'dark' ? COLORS.grey[100] : COLORS.white}>
        {title}
      </H3>
    )}
    {title && !(hiddenGoBack ?? false) && <View width={40} />}
  </XStack>
);
