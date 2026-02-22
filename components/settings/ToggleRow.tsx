import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet, Switch, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontFamily } from '../../constants/Fonts';

type IoniconName = keyof typeof Ionicons.glyphMap;

interface ToggleRowProps {
  icon: IoniconName;
  title: string;
  subtitle?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  iconColor?: string;
}

const ToggleRow: React.FC<ToggleRowProps> = React.memo(
  ({
    icon,
    title,
    subtitle,
    value,
    onValueChange,
    iconColor = '#7B4CFF',
  }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
      scaleAnim.setValue(0.99);
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
        bounciness: 6,
      }).start();
    }, [scaleAnim, value]);

    const animatedStyle = useMemo(
      () => ({
        transform: [{ scale: scaleAnim }],
      }),
      [scaleAnim]
    );

    return (
      <Animated.View style={[styles.row, animatedStyle]}>
        <View style={styles.iconCircle}>
          <Ionicons name={icon} size={20} color={iconColor} />
        </View>

        <View style={styles.textWrap}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>

        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#E5E7EB', true: '#7B4CFF' }}
          thumbColor="#FFFFFF"
        />
      </Animated.View>
    );
  }
);

ToggleRow.displayName = 'ToggleRow';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrap: {
    flex: 1,
    marginLeft: 12,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    color: '#111',
    fontFamily: FontFamily.semiBold,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#8A8F9C',
    fontFamily: FontFamily.regular,
  },
});

export default ToggleRow;
