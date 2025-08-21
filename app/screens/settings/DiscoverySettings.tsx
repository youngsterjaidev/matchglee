import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import CustomSwitch from '../../../components/ui/CustomSwitch';

interface RelationshipChipProps {
  title: string;
  isSelected: boolean;
  onPress: () => void;
}

const RelationshipChip: React.FC<RelationshipChipProps> = ({
  title,
  isSelected,
  onPress,
}) => (
  <TouchableOpacity
    style={[styles.chip, isSelected && styles.chipSelected]}
    onPress={onPress}
  >
    <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const DiscoverySettings: React.FC = () => {
  const router = useRouter();
  const [showMeOnApp, setShowMeOnApp] = useState(false);
  const [selectedRelationshipIntents, setSelectedRelationshipIntents] = useState<string[]>([]);
  const [distanceRadius, setDistanceRadius] = useState(20);
  const [ageRange, setAgeRange] = useState({ min: 18, max: 35 });
  const [onlyShowInRange, setOnlyShowInRange] = useState(false);

  const relationshipOptions = [
    'Long-term partner',
    'Long-term, open to short',
    'Short-term, open to long',
    'Short-term fun',
  ];

  const handleBackPress = () => {
    router.back();
  };

  const toggleRelationshipIntent = (intent: string) => {
    setSelectedRelationshipIntents(prev => 
      prev.includes(intent) 
        ? prev.filter(item => item !== intent)
        : [...prev, intent]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="#171214" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Discovery Settings</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Show me on app toggle */}
        <View style={styles.toggleSection}>
          <View style={styles.toggleItem}>
            <Text style={styles.toggleTitle}>Show me on MatchGlee</Text>
            <CustomSwitch
              value={showMeOnApp}
              onValueChange={setShowMeOnApp}
            />
          </View>
        </View>

        {/* Relationship Intent Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Relationship Intent</Text>
          <View style={styles.chipContainer}>
            {relationshipOptions.map((option) => (
              <RelationshipChip
                key={option}
                title={option}
                isSelected={selectedRelationshipIntents.includes(option)}
                onPress={() => toggleRelationshipIntent(option)}
              />
            ))}
          </View>
        </View>

        {/* Distance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Distance</Text>
          <View style={styles.sliderSection}>
            <View style={styles.sliderHeader}>
              <Text style={styles.sliderLabel}>Distance Radius</Text>
              <Text style={styles.sliderValue}>{distanceRadius} mi</Text>
            </View>
            <View style={styles.sliderContainer}>
              <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={100}
                value={distanceRadius}
                onValueChange={(value) => setDistanceRadius(Math.round(value))}
                minimumTrackTintColor="#171214"
                maximumTrackTintColor="#E5DBE0"
                thumbTintColor="#171214"
              />
            </View>
          </View>
        </View>

        {/* Age Range Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Age Range</Text>
          <View style={styles.sliderSection}>
            <View style={styles.sliderHeader}>
              <Text style={styles.sliderLabel}>Age Range</Text>
              <Text style={styles.sliderValue}>{ageRange.min}-{ageRange.max}</Text>
            </View>
            <View style={styles.ageSliderContainer}>
              {/* This would typically use a range slider component */}
              <View style={styles.ageSliderTrack}>
                <View style={styles.ageSliderActive} />
              </View>
            </View>
          </View>
        </View>

        {/* Only show people in range toggle */}
        <View style={styles.toggleSection}>
          <View style={styles.toggleItem}>
            <Text style={styles.toggleTitle}>Only show people in this range</Text>
            <CustomSwitch
              value={onlyShowInRange}
              onValueChange={setOnlyShowInRange}
            />
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
  },
  backButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    paddingRight: 48,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#171214',
    fontFamily: 'Plus Jakarta Sans',
  },
  scrollContainer: {
    flex: 1,
  },
  toggleSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  toggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 56,
  },
  toggleTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#171214',
    fontFamily: 'Plus Jakarta Sans',
    lineHeight: 24,
    flex: 1,
  },
  section: {
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#171214',
    fontFamily: 'Plus Jakarta Sans',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    gap: 12,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#F5F0F2',
    height: 32,
    justifyContent: 'center',
  },
  chipSelected: {
    backgroundColor: '#171214',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#171214',
    fontFamily: 'Plus Jakarta Sans',
    lineHeight: 21,
  },
  chipTextSelected: {
    color: '#FFF',
  },
  sliderSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: '#171214',
    fontFamily: 'Plus Jakarta Sans',
    lineHeight: 24,
  },
  sliderValue: {
    fontSize: 14,
    fontWeight: '400',
    color: '#171214',
    fontFamily: 'Plus Jakarta Sans',
    lineHeight: 21,
  },
  sliderContainer: {
    height: 16,
    justifyContent: 'center',
  },
  slider: {
    width: '100%',
    height: 20,
  },
  ageSliderContainer: {
    height: 38,
    justifyContent: 'center',
    paddingTop: 6,
  },
  ageSliderTrack: {
    height: 4,
    backgroundColor: '#E5DBE0',
    borderRadius: 2,
    paddingHorizontal: 54,
  },
  ageSliderActive: {
    height: 4,
    backgroundColor: '#171214',
    borderRadius: 2,
    flex: 1,
    marginLeft: 161, // Approximate positioning based on design
  },
  bottomSpacing: {
    height: 20,
  },
});

export default DiscoverySettings;
