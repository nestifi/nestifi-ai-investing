import { router } from 'expo-router';
import { Avatar, View, XStack, YStack } from 'tamagui';

import CheckedIcon from '@/assets/icons/checked.svg';
import ChevronIcon from '@/assets/icons/chevron_right.svg';
import { Button } from '@/components/button';
import { BackButton } from '@/components/layout/back-button';
import { BaseLayout } from '@/components/layout/base-layout';
import { Paragraph } from '@/components/paragraph';
import { TouchableOpacityWithFeedback } from '@/components/touchable-opacity-with-feedback';
import { COLORS } from '@/constants/colors';
import { childAvatarImageUri } from '@/constants/images';
import { useAuthActions } from '@/store/auth';
import { useOnboardingActions, useOnboardingState } from '@/store/onboarding';

export default function Page() {
  const onboardingData = useOnboardingState();
  const { resetState } = useOnboardingActions();
  const { finishOnboarding } = useAuthActions();

  const handleOnboardingSubmit = async () => {
    await finishOnboarding(onboardingData);
    resetState();
  };

  return (
    <BaseLayout minH="100%">
      <BackButton title="Add investment options" />
      <Paragraph variant="secondary" mb={16}>
        To improve investment experience add information about{' '}
        <Paragraph variant="secondary" color={COLORS.grey[100]} fontWeight={500}>
          future goals
        </Paragraph>
        ,{' '}
        <Paragraph variant="secondary" color={COLORS.grey[100]} fontWeight={500}>
          family circle
        </Paragraph>{' '}
        and{' '}
        <Paragraph variant="secondary" color={COLORS.grey[100]} fontWeight={500}>
          investment dates
        </Paragraph>{' '}
        for each child.
      </Paragraph>
      <YStack gap={16}>
        {onboardingData.familyCircle.map((member) => (
          <TouchableOpacityWithFeedback
            key={member.id}
            activeOpacity={0.85}
            onPress={() =>
              router.navigate({
                pathname: '/(onboarding)/(children)/profile',
                params: {
                  id: member.id
                }
              })
            }
          >
            <XStack rounded={16} p={16} gap={12} items="center" bg={COLORS.accent[50]}>
              {member.investment && <CheckedIcon />}
              <Avatar circular size="$6">
                <Avatar.Image src={childAvatarImageUri} />
                <Avatar.Fallback backgroundColor={COLORS.accent[60]} />
              </Avatar>
              <YStack justify="center" gap={4}>
                <Paragraph fontWeight={500} color={COLORS.grey[100]}>
                  {member.firstName} {member.lastName}
                </Paragraph>
                <Paragraph variant="secondary" color={COLORS.grey[70]}>
                  {member.dateOfBirth}
                </Paragraph>
              </YStack>
              <View justify="center" ml="auto">
                <ChevronIcon />
              </View>
            </XStack>
          </TouchableOpacityWithFeedback>
        ))}
      </YStack>
      <Button variant="primary" mt="auto" onPress={handleOnboardingSubmit} mb="$6">
        Continue
      </Button>
    </BaseLayout>
  );
}
