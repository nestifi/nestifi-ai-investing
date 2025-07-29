import { Link as ExpoRouterLink, type LinkProps } from 'expo-router';

import { COLORS } from '@/constants/colors';

export const Link: React.FC<LinkProps> = (props) => {
  return <ExpoRouterLink {...props} style={{ color: COLORS.grey[100], textDecorationLine: 'underline' }} />;
};
