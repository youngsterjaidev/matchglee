import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontFamily } from '../../constants/Fonts';

export interface RadioOption {
  label: string;
  value: string;
  subtitle?: string;
}

interface RadioCardGroupProps {
  options: RadioOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  embedded?: boolean;
  compactSelected?: boolean;
}

const RadioCardGroup: React.FC<RadioCardGroupProps> = React.memo(
  ({ options, selectedValue, onSelect, embedded = false, compactSelected = false }) => {
    return (
      <View style={[styles.container, embedded && styles.embeddedContainer]}>
        {options.map((option, index) => {
          const isSelected = option.value === selectedValue;
          const showDivider = index < options.length - 1;

          return (
            <View key={option.value}>
              <TouchableOpacity style={styles.row} activeOpacity={0.85} onPress={() => onSelect(option.value)}>
                <View style={styles.optionTextWrap}>
                  <Text style={styles.optionTitle}>{option.label}</Text>
                  {option.subtitle ? <Text style={styles.optionSubtitle}>{option.subtitle}</Text> : null}
                </View>

                <View
                  style={[
                    styles.indicatorOuter,
                    isSelected ? styles.indicatorOuterSelected : styles.indicatorOuterDefault,
                    compactSelected && isSelected ? styles.indicatorOuterCompact : null,
                  ]}
                >
                  {isSelected ? (
                    <View style={[styles.indicatorInner, compactSelected && styles.indicatorInnerCompact]}>
                      <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                    </View>
                  ) : null}
                </View>
              </TouchableOpacity>
              {showDivider ? <View style={[styles.divider, embedded && styles.embeddedDivider]} /> : null}
            </View>
          );
        })}
      </View>
    );
  }
);

RadioCardGroup.displayName = 'RadioCardGroup';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    marginHorizontal: 18,
    shadowColor: '#0D0A2C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 14,
    elevation: 6,
    overflow: 'hidden',
  },
  embeddedContainer: {
    marginHorizontal: 0,
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    borderRadius: 0,
  },
  row: {
    paddingVertical: 18,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionTextWrap: {
    flex: 1,
    marginRight: 12,
  },
  optionTitle: {
    fontSize: 16,
    color: '#111',
    fontFamily: FontFamily.semiBold,
  },
  optionSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#8A8F9C',
    fontFamily: FontFamily.regular,
  },
  indicatorOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorOuterSelected: {
    borderWidth: 2,
    borderColor: '#7B4CFF',
  },
  indicatorOuterDefault: {
    borderWidth: 2,
    borderColor: '#D1D5DB',
  },
  indicatorOuterCompact: {
    borderWidth: 0,
  },
  indicatorInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#7B4CFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorInnerCompact: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F1F4',
    marginHorizontal: 18,
  },
  embeddedDivider: {
    marginHorizontal: 18,
  },
});

export default RadioCardGroup;
