import { useState } from 'react';
import type { TabsProps } from 'tamagui';
import { SizableText, Tabs as TamaguiTabs } from 'tamagui';

import { COLORS } from '@/constants/colors';

export interface Option {
  value: string;
  label: string;
  content: React.ReactElement;
}

interface Props extends TabsProps {
  options: Option[];
}

export const Tabs: React.FC<Props> = (props) => {
  const [activeTab, setActiveTab] = useState(props.defaultValue);
  return (
    <TamaguiTabs
      {...props}
      value={activeTab}
      onValueChange={(value) => {
        setActiveTab(value);
      }}
      defaultValue={props.defaultValue}
      flexDirection="column"
      orientation="horizontal"
    >
      <TamaguiTabs.List disablePassBorderRadius="end" bg={COLORS.accent[50]} p={4} rounded={40} mb={12}>
        {props.options.map((el) => (
          <TamaguiTabs.Tab rounded={40} key={el.value} value={el.value} unstyled flex={1}>
            <SizableText
              text="center"
              p={8}
              rounded={40}
              bg={activeTab === el.value ? COLORS.accent[90] : COLORS.accent[50]}
              color={activeTab === el.value ? COLORS.white : COLORS.grey[100]}
            >
              {el.label}
            </SizableText>
          </TamaguiTabs.Tab>
        ))}
      </TamaguiTabs.List>

      {props.options.map((el) => (
        <TamaguiTabs.Content key={el.value + 'content'} value={el.value}>
          {el.content}
        </TamaguiTabs.Content>
      ))}
    </TamaguiTabs>
  );
};
