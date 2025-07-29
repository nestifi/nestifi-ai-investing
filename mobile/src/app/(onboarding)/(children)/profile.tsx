import * as Clipboard from 'expo-clipboard';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';
import { Avatar, Image, SizableText, useWindowDimensions, View, XStack, YStack } from 'tamagui';

import AddIcon from '@/assets/icons/add.svg';
import CalendarIcon from '@/assets/icons/calendar.svg';
import CloseIcon from '@/assets/icons/close.svg';
import CopyIcon from '@/assets/icons/copy.svg';
import FamilyIcon from '@/assets/icons/family.svg';
import PencilIcon from '@/assets/icons/pencil.svg';
import ShareIcon from '@/assets/icons/share.svg';
import TargetIcon from '@/assets/icons/target.svg';
import { Button } from '@/components/button';
import { Input } from '@/components/form/input';
import { BackButton } from '@/components/layout/back-button';
import { BaseLayout } from '@/components/layout/base-layout';
import { Paragraph } from '@/components/paragraph';
import { PressableWithFeedback } from '@/components/pressable-with-feedback';
import { InvestmentForm } from '@/components/screens/children/profile/investment-form';
import { InviteForm } from '@/components/screens/children/profile/invite-form';
import { Sheet } from '@/components/sheet';
import { TouchableOpacityWithFeedback } from '@/components/touchable-opacity-with-feedback';
import { COLORS } from '@/constants/colors';
import { env } from '@/constants/env';
import type { FutureGoal } from '@/constants/future-goals';
import { FUTURE_GOALS } from '@/constants/future-goals';
import { familyImageUri, adultAvatarImageUri } from '@/constants/images';
import type { FamilyCircleMember, FrequencyType, Investment } from '@/store/onboarding';
import { useOnboardingActions, useOnboardingState } from '@/store/onboarding';
import { getDayName } from '@/utils/get-day-name';
import { getOrdinalDay } from '@/utils/get-ordinal-day';

export default function Page() {
  const { familyCircle } = useOnboardingState();
  const params = useLocalSearchParams<{ id: string }>();
  const child = familyCircle.find((el) => el.id === Number(params.id));

  const { width } = useWindowDimensions();
  const [futureGoals, setFutureGoals] = useState<FutureGoal[]>(child?.futureGoals ?? []);
  const [family, setFamily] = useState<FamilyCircleMember[]>(child?.familyCircle ?? []);
  const [investment, setInvestment] = useState<Investment | null>(child?.investment ?? null);
  const [addToFamily, setAddToFamily] = useState(false);
  const [futureGoalsOpen, setFutureGoalsOpen] = useState(false);
  const [familyCircleOpen, setFamilyCircleOpen] = useState(false);
  const [investmentOpen, setInvestmentOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const { updateChildFamilyCircle, updateChildFutureGoals, updateChildInvestment } = useOnboardingActions();

  if (!child) {
    return (
      <BaseLayout minH="100%">
        <BackButton title="Child not found" />
      </BaseLayout>
    );
  }

  const shareLink = `${env.DEEPLINK_URL}/invite/98972729u`;

  const handleOnboardingSubmit = () => {
    updateChildInvestment(child.id, investment);
    router.navigate('/(onboarding)/(children)/add-investment-options');
  };

  return (
    <BaseLayout minH="100%">
      <BackButton title={`${child.firstName}'s profile`} />
      <YStack gap={12} mb={24}>
        <TouchableOpacityWithFeedback activeOpacity={0.85} onPress={() => setFutureGoalsOpen(true)}>
          <YStack rounded={16} p={16} gap={12} bg={COLORS.additional.blue}>
            <XStack gap={12} items="center" flexWrap="nowrap">
              <TargetIcon />
              <YStack justify="center" maxW="70%">
                <Paragraph variant="secondary" color={COLORS.grey[70]}>
                  Future goals
                </Paragraph>
              </YStack>
              <View justify="center" ml="auto">
                {child.futureGoals.length > 0 ? <PencilIcon /> : <AddIcon />}
              </View>
            </XStack>
            <XStack>
              {child.futureGoals.length <= 0 ? (
                <Paragraph fontWeight={500} color={COLORS.grey[100]}>
                  No goals yet
                </Paragraph>
              ) : (
                <XStack gap={4} flexWrap="wrap" mt={4}>
                  {child.futureGoals.map((goal) => (
                    <SizableText rounded={24} key={goal.id} px={12} py={2} bg={COLORS.accent[50]}>
                      {goal.name}
                    </SizableText>
                  ))}
                </XStack>
              )}
            </XStack>
          </YStack>
        </TouchableOpacityWithFeedback>
        <TouchableOpacityWithFeedback activeOpacity={0.85} onPress={() => setFamilyCircleOpen(true)}>
          <YStack rounded={16} p={16} bg={COLORS.additional.red}>
            <XStack gap={12} items="center">
              <FamilyIcon />
              <YStack justify="center">
                <Paragraph variant="secondary" color={COLORS.grey[70]}>
                  Family circle
                </Paragraph>
                {child.familyCircle.length === 0 && (
                  <Paragraph fontWeight={500} color={COLORS.grey[100]}>
                    No people
                  </Paragraph>
                )}
              </YStack>
              <View justify="center" ml="auto">
                {child.familyCircle.length > 0 ? <PencilIcon /> : <AddIcon />}
              </View>
            </XStack>
            {child.familyCircle.length > 0 && (
              <XStack flexWrap="wrap" gap={8} mt={12}>
                {child.familyCircle.map((el, idx) => (
                  <YStack key={idx} gap={4} justify="center" items="center" width={`${100 / 4 - 2}%`}>
                    <Paragraph variant="small" fontWeight={700} color={COLORS.grey[100]}>
                      Uncle
                    </Paragraph>
                    <Avatar circular size="$6">
                      <Avatar.Image src={adultAvatarImageUri} />
                      <Avatar.Fallback backgroundColor={COLORS.accent[60]} />
                    </Avatar>
                    <Paragraph
                      variant="small"
                      text="center"
                      numberOfLines={1}
                      color={COLORS.grey[100]}
                      adjustsFontSizeToFit
                    >
                      {el.firstName} {el.lastName}
                    </Paragraph>
                  </YStack>
                ))}
              </XStack>
            )}
          </YStack>
        </TouchableOpacityWithFeedback>
        <TouchableOpacityWithFeedback activeOpacity={0.85} onPress={() => setInvestmentOpen(true)}>
          <XStack rounded={16} p={16} gap={12} items="center" bg={COLORS.additional.yellow}>
            <CalendarIcon />
            <YStack justify="center">
              <Paragraph variant="secondary" color={COLORS.grey[70]}>
                Investment dates
              </Paragraph>
              {investment ? (
                <Paragraph fontWeight={500} color={COLORS.grey[100]}>
                  {investment.frequency.type === 'weekly'
                    ? `Every ${getDayName(investment.frequency.day)}`
                    : `Every ${getOrdinalDay(investment.frequency.day)} of month`}
                  , ${investment.amount} USDC
                </Paragraph>
              ) : (
                <Paragraph fontWeight={500} color={COLORS.grey[100]}>
                  No dates, No amount
                </Paragraph>
              )}
            </YStack>
            <View justify="center" ml="auto">
              <AddIcon />
            </View>
          </XStack>
        </TouchableOpacityWithFeedback>
      </YStack>
      <Sheet
        open={futureGoalsOpen}
        setOpen={setFutureGoalsOpen}
        title="Future goals"
        desc={`Choose ${child.firstName}'s future goals you want to invest in.`}
      >
        <XStack flexWrap="wrap" gap={8} mb={24}>
          {FUTURE_GOALS.map((goal) => (
            <TouchableOpacityWithFeedback
              key={goal.id}
              onPress={() => {
                setFutureGoals((prev) => {
                  const updatedGoals = prev.includes(goal) ? prev.filter((g) => g.id !== goal.id) : [...prev, goal];
                  return updatedGoals;
                });
              }}
            >
              <YStack
                p={8}
                gap={4}
                minW={(width - 32 - 8) / 2}
                rounded={24}
                borderWidth={1}
                borderStyle="solid"
                borderColor={futureGoals.some((el) => el.name === goal.name) ? COLORS.accent[90] : COLORS.grey[20]}
              >
                <Image source={{ uri: goal.image }} width="100%" height={110} objectFit="contain" />
                <Paragraph text="center" variant="secondary" color={COLORS.grey[70]}>
                  {goal.name}
                </Paragraph>
              </YStack>
            </TouchableOpacityWithFeedback>
          ))}
        </XStack>
        <XStack gap={8}>
          <Button
            flex={1}
            variant="secondary"
            onPress={() => {
              setFutureGoals(child.futureGoals);
              setFutureGoalsOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            flex={1}
            variant="primary"
            onPress={() => {
              updateChildFutureGoals(child.id, futureGoals);
              setFutureGoalsOpen(false);
            }}
          >
            Save
          </Button>
        </XStack>
      </Sheet>
      <Sheet
        open={familyCircleOpen}
        setOpen={setFamilyCircleOpen}
        title="Family circle"
        desc="Add friends and family to invest in child’s future"
      >
        {family.length > 0 && (
          <>
            <View position="relative" pr={60} mb={24}>
              <Input label="Invite link" pr={46} value={`${env.DEEPLINK_URL}/invite/98972729u`} />
              <View position="absolute" b={10} r={16 + 56}>
                <TouchableOpacityWithFeedback
                  activeOpacity={0.5}
                  onPress={async () => {
                    await Clipboard.setStringAsync(shareLink);
                  }}
                >
                  <CopyIcon />
                </TouchableOpacityWithFeedback>
              </View>
              <View minW={48} position="absolute" b={10} r={0}>
                <TouchableOpacityWithFeedback activeOpacity={0.5}>
                  <ShareIcon />
                </TouchableOpacityWithFeedback>
              </View>
            </View>
            <YStack gap={12}>
              {family.map((el) => (
                <XStack
                  key={el.id}
                  p={12}
                  rounded={6}
                  justify="space-between"
                  borderWidth={1}
                  borderStyle="solid"
                  borderColor={COLORS.grey[20]}
                >
                  <Paragraph color={COLORS.grey[100]}>{`${el.firstName} ${el.lastName}`}</Paragraph>
                  <TouchableOpacityWithFeedback
                    onPress={() => setFamily((prev) => prev.filter((item) => item.id !== el.id))}
                    activeOpacity={0.5}
                  >
                    <CloseIcon />
                  </TouchableOpacityWithFeedback>
                </XStack>
              ))}
            </YStack>
          </>
        )}
        {addToFamily && (
          <InviteForm
            onSubmit={(data) => {
              setAddToFamily(false);
              setFamily((prev) => [
                ...prev,
                { id: family.length, firstName: data.firstName, lastName: data.lastName, phone: data.phone }
              ]);
            }}
          />
        )}
        <View justify="center" items="center" my={24}>
          <PressableWithFeedback onPress={() => setAddToFamily(true)}>
            <XStack gap={3}>
              <AddIcon color={COLORS.accent[90]} />
              <SizableText color={COLORS.accent[90]}>Add member</SizableText>
            </XStack>
          </PressableWithFeedback>
        </View>
        {family.length === 0 && !addToFamily && (
          <>
            <YStack py={64} justify="center" items="center" gap={32}>
              <Image source={{ uri: familyImageUri }} width={161} height={168} objectFit="contain" />
              <Paragraph text="center">
                Your Family Circle is currently empty. Add members to start building support for your child’s future.
              </Paragraph>
            </YStack>
          </>
        )}
        <XStack gap={8} mt="auto">
          <Button
            flex={1}
            variant="secondary"
            onPress={() => {
              updateChildFamilyCircle(child.id, family);
              setFamilyCircleOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            flex={1}
            variant="primary"
            onPress={() => {
              updateChildFamilyCircle(child.id, family);
              setFamilyCircleOpen(false);
            }}
          >
            Save
          </Button>
        </XStack>
      </Sheet>
      <Sheet
        open={investmentOpen}
        setOpen={setInvestmentOpen}
        title="Investment details"
        desc="Enter the amount you want to invest and the investment dates."
      >
        <InvestmentForm
          onCancel={() => {
            setInvestmentOpen(false);
          }}
          onSubmit={(data) => {
            const [type, day] = data.date.split('-');

            if (!type || !day) {
              Alert.alert('Invalid date format', 'Please select a valid date.');
              return;
            }

            setInvestment({
              payWith: data.payWith,
              product: data.investmentProduct,
              amount: data.amount,
              frequency: {
                type: type as FrequencyType,
                day
              }
            });

            setInvestmentOpen(false);
          }}
        />
      </Sheet>
      {investment && (
        <Sheet
          open={confirmationOpen}
          setOpen={setConfirmationOpen}
          title="Confirm investment"
          desc={`Are you sure you want to invest ${investment.amount} USDC every ${
            investment.frequency.type === 'weekly'
              ? getDayName(investment.frequency.day)
              : getOrdinalDay(investment.frequency.day)
          }?`}
        >
          <XStack gap={8}>
            <Button grow={1} variant="secondary" onPress={() => setConfirmationOpen(false)}>
              Cancel
            </Button>
            <Button
              grow={1}
              variant="primary"
              onPress={() => {
                setConfirmationOpen(false);
                handleOnboardingSubmit();
              }}
            >
              Save
            </Button>
          </XStack>
        </Sheet>
      )}

      <Button
        variant="primary"
        mt="auto"
        mb="$6"
        onPress={() => {
          if (!investment) {
            handleOnboardingSubmit();
          } else {
            setConfirmationOpen(true);
          }
        }}
      >
        Save
      </Button>
    </BaseLayout>
  );
}
