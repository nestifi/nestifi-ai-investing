import { router } from 'expo-router';
import { Alert } from 'react-native';
import { Avatar, View, XStack, YStack } from 'tamagui';

import DotsIcon from '@/assets/icons/dots.svg';
import { Button } from '@/components/button';
import { BackButton } from '@/components/layout/back-button';
import { BaseLayout } from '@/components/layout/base-layout';
import { Paragraph } from '@/components/paragraph';
import { TouchableOpacityWithFeedback } from '@/components/touchable-opacity-with-feedback';
import { COLORS } from '@/constants/colors';
import { placeholderImageUri } from '@/constants/images';
import { useAuthActions, useAuthState } from '@/store/auth';

const DetailsRow = ({ label, value }: { label: string; value: string }) => (
  <YStack>
    <Paragraph variant="small" color={COLORS.grey[70]}>
      {label}
    </Paragraph>
    <Paragraph variant="secondary" color={COLORS.grey[100]} fontWeight={500} numberOfLines={1} adjustsFontSizeToFit>
      {value}
    </Paragraph>
  </YStack>
);

export default function Page() {
  const { session } = useAuthState();
  const { removeChild } = useAuthActions();

  return (
    <BaseLayout minH="100%">
      <BackButton title="Family Circle" />
      <YStack gap={16} mb="$6">
        {(session?.children ?? []).map((member) => (
          <XStack key={member.id} rounded={16} p={16} gap={12} bg={COLORS.accent[50]} position="relative">
            <YStack gap={12} flex={1} justify="center" items="center">
              <TouchableOpacityWithFeedback
                key={member.id}
                activeOpacity={0.85}
                onPress={() =>
                  router.navigate({ pathname: '/(dashboard)/(add-flow)/profile', params: { id: member.id } })
                }
              >
                <Avatar circular size="$11">
                  <Avatar.Image src={member.photo ?? placeholderImageUri} />
                  <Avatar.Fallback backgroundColor={COLORS.accent[60]} />
                </Avatar>
              </TouchableOpacityWithFeedback>
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
              <TouchableOpacityWithFeedback
                activeOpacity={0.5}
                onPress={() => {
                  Alert.alert('Remove Child', 'Are you sure you want to remove this child from your family circle?', [
                    {
                      text: 'Cancel',
                      style: 'cancel'
                    },
                    {
                      text: 'OK',
                      onPress: () => {
                        removeChild(member.id);
                      }
                    }
                  ]);
                }}
              >
                <DotsIcon />
              </TouchableOpacityWithFeedback>
            </View>
          </XStack>
        ))}
      </YStack>
      <YStack gap={12} mb="$6" mt="auto">
        <Button variant="primary" onPress={() => router.navigate('/(dashboard)/(add-flow)/add-child')}>
          Add child
        </Button>
      </YStack>
    </BaseLayout>
  );
}
