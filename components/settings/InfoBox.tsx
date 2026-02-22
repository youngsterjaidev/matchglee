import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontFamily } from '../../constants/Fonts';

interface InfoBoxProps {
  text: string;
  variant?: 'blue' | 'green';
}

const InfoBox: React.FC<InfoBoxProps> = React.memo(({ text, variant = 'blue' }) => {
  const isGreen = variant === 'green';

  return (
    <View style={[styles.box, isGreen ? styles.greenBox : styles.blueBox]}>
      <Text style={[styles.text, isGreen ? styles.greenText : styles.blueText]}>{text}</Text>
    </View>
  );
});

InfoBox.displayName = 'InfoBox';

const styles = StyleSheet.create({
  box: {
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 18,
    marginTop: 16,
  },
  blueBox: {
    backgroundColor: '#E8F0FF',
  },
  greenBox: {
    backgroundColor: '#E7F6EC',
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FontFamily.regular,
  },
  blueText: {
    color: '#2563EB',
  },
  greenText: {
    color: '#15803D',
  },
});

export default InfoBox;
