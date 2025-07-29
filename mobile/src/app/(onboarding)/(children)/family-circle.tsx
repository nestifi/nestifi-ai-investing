import { router } from 'expo-router';
import { Avatar, View, XStack, YStack } from 'tamagui';

import DotsIcon from '@/assets/icons/dots.svg';
import { Button } from '@/components/button';
import { BackButton } from '@/components/layout/back-button';
import { BaseLayout } from '@/components/layout/base-layout';
import { Paragraph } from '@/components/paragraph';
import { TouchableOpacityWithFeedback } from '@/components/touchable-opacity-with-feedback';
import { COLORS } from '@/constants/colors';
import { childAvatarImageUri } from '@/constants/images';
import { useOnboardingActions, useOnboardingState } from '@/store/onboarding';

const DetailsRow = ({ label, value }: { label: string; value: string }) => (
  <YStack>
    <Paragraph variant="small" color={COLORS.grey[70]}>
      {label}
    </Paragraph>
    <Paragraph variant="secondary" color={COLORS.grey[100]} fontWeight={500}>
      {value}
    </Paragraph>
  </YStack>
);

export default function Page() {
  const { removeChild } = useOnboardingActions();
  const { familyCircle } = useOnboardingState();

  return (
    <BaseLayout minH="100%">
      <BackButton title="Family Circle" />
      <YStack gap={16} mb="$6">
        {familyCircle.map((member) => (
          <XStack key={member.id} rounded={16} p={16} gap={12} bg={COLORS.accent[50]} position="relative">
            <YStack gap={12} flex={1} justify="center" items="center">
              <Avatar circular size="$11">
                <Avatar.Image src={childAvatarImageUri} />
                <Avatar.Fallback backgroundColor={COLORS.accent[60]} />
              </Avatar>
              <YStack>
                <Paragraph text="center" color={COLORS.grey[100]}>
                  {member.firstName} {member.lastName}
                </Paragraph>
                <Paragraph text="center" variant="small">
                  {member.gender}
                </Paragraph>
              </YStack>
            </YStack>
            <YStack gap={16} flex={1}>
              <DetailsRow label="Date of birth" value={member.dateOfBirth} />
              <DetailsRow label="SSN" value={member.ssn} />
              <DetailsRow label="Guardian's phone number" value={member.guardianPhone} />
              <DetailsRow label="Guardian's E-mail" value={member.guardianEmail} />
            </YStack>
            <View position="absolute" r={16} t={16}>
              <TouchableOpacityWithFeedback activeOpacity={0.5} onPress={() => removeChild(member.id)}>
                <DotsIcon />
              </TouchableOpacityWithFeedback>
            </View>
          </XStack>
        ))}
      </YStack>
      <YStack gap={12} mb="$6" mt="auto">
        <Button variant="secondary" onPress={() => router.navigate('/(onboarding)/(children)/add-child')}>
          Add child
        </Button>
        <Button variant="primary" onPress={() => router.navigate('/(onboarding)/(children)/add-investment-options')}>
          Continue
        </Button>
      </YStack>
    </BaseLayout>
  );
}
