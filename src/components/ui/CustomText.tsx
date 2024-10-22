import {COLORS, FONTS} from '@utils/Constants';
import {textScale} from '@utils/Responsive';
import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';

interface Props {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body';
  fontFamily?: FONTS;
  fontSize?: number;
  style?: TextStyle | TextStyle[];
  children?: React.ReactNode;
  numberOfLines?: number;
  onLayout?: (event: object) => void;
}

export default function CustomText({
  variant = 'body',
  fontFamily = FONTS.Regular,
  fontSize,
  style,
  children,
  numberOfLines,
  onLayout,
  ...props
}: Props) {
  let computesFontSize: number;

  switch (variant) {
    case 'h1':
      computesFontSize = textScale(fontSize || 24);
      break;
    case 'h2':
      computesFontSize = textScale(fontSize || 20);
      break;
    case 'h3':
      computesFontSize = textScale(fontSize || 16);
      break;
    case 'h4':
      computesFontSize = textScale(fontSize || 12);
      break;
    case 'h5':
      computesFontSize = textScale(fontSize || 10);
      break;
    case 'h6':
      computesFontSize = textScale(fontSize || 8);
      break;
    case 'body':
      computesFontSize = textScale(fontSize || 12);
      break;
  }

  const fontFamilyStyle = {
    fontFamily,
  };
  return (
    <Text
      onLayout={onLayout}
      style={[
        styles.text,
        {
          color: COLORS.text,
          fontSize: computesFontSize,
        },
        fontFamilyStyle,
        style,
      ]}
      numberOfLines={numberOfLines !== undefined ? numberOfLines : undefined}
      {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
  },
});
