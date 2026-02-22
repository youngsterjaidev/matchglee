import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { FontFamily } from '../../constants/Fonts';

interface SectionLabelProps {
  text: string;
}

const SectionLabel: React.FC<SectionLabelProps> = React.memo(({ text }) => {
  return <Text style={styles.label}>{text}</Text>;
});

SectionLabel.displayName = 'SectionLabel';

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#8A8F9C',
    marginHorizontal: 18,
    marginTop: 28,
    marginBottom: 10,
    fontFamily: FontFamily.semiBold,
  },
});

export default SectionLabel;
