import React, { useCallback, useMemo, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontFamily } from '../../constants/Fonts';

interface PrimaryGradientButtonProps {
  text: string;
  onPress: () => void;
  colors?: [string, string];
  style?: ViewStyle;
}

const PrimaryGradientButton: React.FC<PrimaryGradientButtonProps> = React.memo(
  ({ text, onPress, colors = ['#7B4CFF', '#FF2D9A'], style }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = useCallback(() => {
      Animated.spring(scaleAnim, {
        toValue: 0.96,
        useNativeDriver: true,
        speed: 28,
        bounciness: 0,
      }).start();
    }, [scaleAnim]);

    const handlePressOut = useCallback(() => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 22,
        bounciness: 6,
      }).start();
    }, [scaleAnim]);

    const animatedStyle = useMemo(
      () => ({
        transform: [{ scale: scaleAnim }],
      }),
      [scaleAnim]
    );

    return (
      <TouchableWithoutFeedback onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Animated.View style={[styles.wrapper, style, animatedStyle]}>
          <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradient}>
            <Text style={styles.text}>{text}</Text>
          </LinearGradient>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
);

PrimaryGradientButton.displayName = 'PrimaryGradientButton';

const styles = StyleSheet.create({
  wrapper: {
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
  },
});

export default PrimaryGradientButton;
