import * as Clipboard from 'expo-clipboard';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View, XStack, YStack, Image, useWindowDimensions, ScrollView } from 'tamagui';

import ChevronIcon from '@/assets/icons/chevron_right.svg';
import CopyIcon from '@/assets/icons/copy.svg';
import MailOpenIcon from '@/assets/icons/mail-open.svg';
import MoneyBagIcon from '@/assets/icons/money-bag.svg';
import ShareIcon from '@/assets/icons/share.svg';
import UserGroupIcon from '@/assets/icons/user-group.svg';
import { Button } from '@/components/button';
import { Input } from '@/components/form/input';
import { BackButton } from '@/components/layout/back-button';
import { BaseLayout } from '@/components/layout/base-layout';
import { Paragraph } from '@/components/paragraph';
import { InviteForm } from '@/components/screens/family/invite-form';
import { Sheet } from '@/components/sheet';
import { TouchableOpacityWithFeedback } from '@/components/touchable-opacity-with-feedback';
import { COLORS } from '@/constants/colors';
import { env } from '@/constants/env';
import {
  adultAvatar2ImageUri,
  adultAvatar1ImageUri,
  adultAvatar3ImageUri,
  adultAvatar4ImageUri,
  adultAvatar5ImageUri,
  familyImageUri
} from '@/constants/images';

export interface FamilyCircleMember {
  id: number;
  relationship: string;
  firstName: string;
  lastName: string;
  phone: string;
}

const Row = ({ name, desc, uri }: { name: string; desc: string; uri: string }) => (
  <XStack rounded={16} p={16} gap={12} items="center" bg={COLORS.accent[50]}>
    <Image width={56} height={56} source={{ uri: uri }} objectFit="contain" />
    <YStack justify="center" gap={4}>
      <Paragraph fontWeight={500} color={COLORS.grey[100]}>
        {name}
      </Paragraph>
      <Paragraph variant="secondary" color={COLORS.grey[70]}>
        {desc}
      </Paragraph>
    </YStack>
    <View justify="center" ml="auto">
      <ChevronIcon />
    </View>
  </XStack>
);

const STATS = [
  { id: 'members', icon: UserGroupIcon, value: '0', description: 'Active members', bg: COLORS.additional.blue },
  { id: 'invites', icon: MailOpenIcon, value: '5', description: 'Invited members', bg: COLORS.additional.red },
  {
    id: 'contributions',
    icon: MoneyBagIcon,
    value: '$10,200.00',
    description: 'Contributions',
    bg: COLORS.additional.yellow
  }
];

export default function FamilyCircleScreen() {
  const [family, setFamily] = useState<FamilyCircleMember[]>([]);
  const [open, setOpen] = useState(false);
  const { width } = useWindowDimensions();
  const [active, setActive] = useState(true);
  const shareLink = `${env.DEEPLINK_URL}/invite/98972729u`;

  return (
    <>
      <BaseLayout grow={1} px={0}>
        <StatusBar style="dark" />
        <View px={16}>
          <BackButton title="Family Circle" />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} grow={0} contentContainerStyle={{ px: 16 }}>
          <XStack gap={6} flexWrap="nowrap" width="100%">
            {STATS.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <View key={index}>
                  <TouchableOpacityWithFeedback
                    activeOpacity={0.85}
                    onPress={() => {
                      if (stat.id === 'members') {
                        setActive(true);
                      } else if (stat.id === 'invites') {
                        setActive(false);
                      } else {
                        router.navigate('/(dashboard)/(tabs)/rewards');
                      }
                    }}
                  >
                    <YStack gap={6} justify="center" items="center" flex={1} p={16} rounded={8} bg={stat.bg}>
                      <Icon />
                      <Paragraph text="center" fontWeight={600} color={COLORS.grey[100]}>
                        {stat.value}
                      </Paragraph>
                      <Paragraph text="center" lineHeight={14} variant="small" fontWeight={500}>
                        {stat.description}
                      </Paragraph>
                    </YStack>
                  </TouchableOpacityWithFeedback>
                </View>
              );
            })}
          </XStack>
        </ScrollView>
        <View px={16}>
          <Paragraph color={COLORS.grey[100]} mt={24} mb={16} fontWeight={500}>
            {active ? 'Active members' : 'Invited members'}
          </Paragraph>
          {active ? (
            <YStack py={32} my="auto" justify="center" items="center" gap={32} pb={48}>
              <Image source={{ uri: familyImageUri }} width={161} height={168} objectFit="contain" />
              <Paragraph text="center">
                Your Family Circle is currently empty. Add members to start building support for your child’s future.
              </Paragraph>
            </YStack>
          ) : (
            <YStack gap={8} mb={32} grow={1}>
              {family.map((el, idx) => (
                <Row
                  key={idx}
                  name={el.firstName + ' ' + el.lastName}
                  desc={el.relationship}
                  uri={adultAvatar5ImageUri}
                />
              ))}
              <Row name="Harry Soures" desc="Uncle" uri={adultAvatar1ImageUri} />
              <Row name="Olivia Harris" desc="Aunt" uri={adultAvatar2ImageUri} />
              <Row name="Chloe Anderson" desc="Godmother" uri={adultAvatar3ImageUri} />
              <Row name="Tom Aspen" desc="Godfather" uri={adultAvatar4ImageUri} />
              <Row name="Chase Parker" desc="Cousin" uri={adultAvatar5ImageUri} />
            </YStack>
          )}
        </View>
      </BaseLayout>
      <Sheet
        open={open}
        setOpen={setOpen}
        title="Family circle"
        desc="Add friends and family to invest in child’s future"
      >
        <View position="relative" pr={60}>
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
        <InviteForm
          onClose={() => setOpen(false)}
          onSubmit={(data) => {
            setOpen(false);
            setFamily((prev) => [
              ...prev,
              {
                id: family.length,
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                relationship: data.relationship
              }
            ]);
          }}
        />
      </Sheet>
      <Button
        variant="primary"
        position="sticky"
        b={0}
        l={16}
        width={width - 32}
        onPress={() => {
          setOpen(true);
        }}
        mt="auto"
        mb={32}
      >
        Add new member
      </Button>
    </>
  );
}
