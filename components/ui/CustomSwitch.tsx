import React from 'react';
import {
  TouchableOpacity,
  View,
  Animated,
  StyleSheet,
} from 'react-native';

interface CustomSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  value,
  onValueChange,
  disabled = false,
}) => {
  const animatedValue = React.useRef(new Animated.Value(value ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, animatedValue]);

  const handlePress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22], // 51px width - 27px thumb - 2px padding
  });

  return (
    <TouchableOpacity
      style={[
        styles.container,
        disabled && styles.disabled,
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[
          styles.thumb,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 51,
    height: 31,
    borderRadius: 15.5,
    backgroundColor: '#F5F0F2',
    padding: 2,
    justifyContent: 'center',
  },
  thumb: {
    width: 27,
    height: 27,
    borderRadius: 13.5,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default CustomSwitch;
