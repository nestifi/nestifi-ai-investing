declare module '*.ttf' {
  import type { FontSource } from 'expo-font';
  const content: FontSource;
  export default content;
}

declare module '*.png' {
  import type { ImageSourcePropType } from 'react-native';
  const content: ImageSourcePropType;
  export default content;
}

declare module '*.jpg' {
  import type { ImageSourcePropType } from 'react-native';
  const content: ImageSourcePropType;
  export default content;
}

declare module '*.svg' {
  import type { ViewStyle, TextStyle, ImageStyle, StyleProp } from 'react-native';
  type SvgPropsWithoutStyle = Omit<React.SVGProps<SVGSVGElement>, 'style'>;
  const ReactComponent: React.FC<SvgPropsWithoutStyle & { style?: StyleProp<ViewStyle | TextStyle | ImageStyle> }>;
  export default ReactComponent;
}
