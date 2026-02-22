import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontFamily } from '../../constants/Fonts';

interface SegmentedControlProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const SegmentedControl: React.FC<SegmentedControlProps> = React.memo(({ options, value, onChange }) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const translateAnim = useRef(new Animated.Value(0)).current;
  const selectedIndex = Math.max(options.indexOf(value), 0);

  const segmentWidth = useMemo(() => {
    if (containerWidth === 0 || options.length === 0) {
      return 0;
    }

    return (containerWidth - 12) / options.length;
  }, [containerWidth, options.length]);

  useEffect(() => {
    if (segmentWidth === 0) {
      return;
    }

    Animated.spring(translateAnim, {
      toValue: selectedIndex * segmentWidth,
      useNativeDriver: true,
      bounciness: 6,
      speed: 18,
    }).start();
  }, [segmentWidth, selectedIndex, translateAnim]);

  const thumbStyle = useMemo(
    () => ({
      width: segmentWidth,
      transform: [{ translateX: translateAnim }],
    }),
    [segmentWidth, translateAnim]
  );

  return (
    <View style={styles.container} onLayout={(event) => setContainerWidth(event.nativeEvent.layout.width)}>
      <Animated.View style={[styles.thumb, thumbStyle]} />
      {options.map((option) => {
        const isActive = option === value;

        return (
          <TouchableOpacity
            key={option}
            style={styles.segmentButton}
            activeOpacity={0.85}
            onPress={() => onChange(option)}
          >
            <Text style={[styles.segmentText, isActive ? styles.segmentTextActive : styles.segmentTextInactive]}>
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
});

SegmentedControl.displayName = 'SegmentedControl';

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F1F2F6',
    padding: 6,
    flexDirection: 'row',
    marginTop: 14,
  },
  thumb: {
    position: 'absolute',
    top: 6,
    bottom: 6,
    left: 6,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#0D0A2C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  segmentButton: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  segmentText: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
  },
  segmentTextActive: {
    color: '#7B4CFF',
    fontFamily: FontFamily.semiBold,
  },
  segmentTextInactive: {
    color: '#6B7280',
  },
});

export default SegmentedControl;
