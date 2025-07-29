import { XStack } from 'tamagui';

import SearchIcon from '@/assets/icons/search.svg';
import { Paragraph } from '@/components/paragraph';
import { COLORS } from '@/constants/colors';

export const PlaceholderSearch = () => {
  return (
    <XStack
      flex={1}
      bg={COLORS.grey[90]}
      borderWidth={1}
      gap={16}
      rounded={30}
      p={12}
      borderColor={COLORS.grey[80]}
      items="center"
    >
      <SearchIcon />
      <Paragraph color={COLORS.white}>Search</Paragraph>
    </XStack>
  );
};
