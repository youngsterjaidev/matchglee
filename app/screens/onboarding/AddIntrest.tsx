import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const AddIntrest = () => {
  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');

  const activities = ['Hiking', 'Yoga', 'Running', 'Swimming', 'Cycling', 'Gym'];
  const foodDrink = ['Coffee', 'Wine', 'Cooking', 'Baking', 'Brunch', 'Sushi'];
  const music = ['Pop', 'Rock', 'Hip Hop', 'Electronic', 'Jazz', 'Classical'];
  const travel = ['Road Trips', 'Backpacking', 'City Breaks', 'Beach Holidays', 'Skiing', 'Camping'];

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest)
        ? prev.filter(item => item !== interest)
        : [...prev, interest]
    );
  };

  const renderInterestChip = (interest: string) => {
    const isSelected = selectedInterests.includes(interest);
    return (
      <TouchableOpacity
        key={interest}
        style={[styles.chip, isSelected && styles.selectedChip]}
        onPress={() => toggleInterest(interest)}
      >
        <Text style={[styles.chipText, isSelected && styles.selectedChipText]}>
          {interest}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderCategory = (title: string, items: string[]) => (
    <View style={styles.categoryContainer}>
      <View style={styles.categoryTitleContainer}>
        <Text style={styles.categoryTitle}>{title}</Text>
      </View>
      <View style={styles.chipContainer}>
        {items.map(renderInterestChip)}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#171214" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Personal interset</Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>What are you into?</Text>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Ionicons name="search" size={20} color="#876375" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#876375"
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
          </View>

          {/* Categories */}
          {renderCategory('Activities', activities)}
          {renderCategory('Food & Drink', foodDrink)}
          {renderCategory('Music', music)}
          {renderCategory('Travel', travel)}
        </View>
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Page Indicators */}
        <View style={styles.pageIndicators}>
          <View style={styles.indicator} />
          <View style={styles.indicator} />
          <View style={styles.indicator} />
          <View style={[styles.indicator, styles.activeIndicator]} />
          <View style={styles.indicator} />
        </View>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.continueButton, selectedInterests.length === 0 && styles.disabledButton]}
            disabled={selectedInterests.length === 0}
            onPress={() => {
              // Navigate to next step in onboarding
              console.log('Selected interests:', selectedInterests);
              router.push('/screens/onboarding/FinishProfile');
            }}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Spacer */}
        <View style={styles.bottomSpacer} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(8),
    backgroundColor: '#FFF',
  },
  backButton: {
    width: scale(48),
    height: scale(48),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerSpacer: {
    width: scale(48),
  },
  headerTitle: {
    fontFamily: 'System',
    fontSize: moderateScale(18),
    fontWeight: '700',
    lineHeight: moderateScale(23),
    color: '#E83894',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingBottom: verticalScale(20),
  },
  titleContainer: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(12),
    alignItems: 'center',
  },
  title: {
    fontFamily: 'System',
    fontSize: moderateScale(28),
    fontWeight: '700',
    lineHeight: moderateScale(35),
    color: '#171214',
    textAlign: 'center',
  },
  searchContainer: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(12),
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: scale(48),
    backgroundColor: '#F5F0F2',
    borderRadius: scale(12),
    paddingLeft: scale(16),
    paddingRight: scale(8),
  },
  searchIcon: {
    marginRight: scale(8),
  },
  searchInput: {
    flex: 1,
    fontFamily: 'System',
    fontSize: moderateScale(16),
    fontWeight: '400',
    lineHeight: moderateScale(24),
    color: '#171214',
  },
  categoryContainer: {
    marginBottom: verticalScale(8),
  },
  categoryTitleContainer: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(12),
  },
  categoryTitle: {
    fontFamily: 'System',
    fontSize: moderateScale(22),
    fontWeight: '700',
    lineHeight: moderateScale(28),
    color: '#171214',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: scale(12),
    paddingBottom: verticalScale(12),
    gap: scale(12),
  },
  chip: {
    paddingHorizontal: scale(16),
    height: scale(32),
    backgroundColor: '#F5F0F2',
    borderRadius: scale(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedChip: {
    backgroundColor: '#E83894',
  },
  chipText: {
    fontFamily: 'System',
    fontSize: moderateScale(14),
    fontWeight: '400',
    lineHeight: moderateScale(21),
    color: '#171214',
  },
  selectedChipText: {
    color: '#FFF',
    fontWeight: '500',
  },
  bottomSection: {
    backgroundColor: '#FFF',
  },
  pageIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(12),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(20),
  },
  indicator: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: '#E5DBE0',
  },
  activeIndicator: {
    backgroundColor: '#171214',
  },
  buttonContainer: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(12),
  },
  continueButton: {
    height: scale(48),
    backgroundColor: '#E83894',
    borderRadius: scale(24),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  disabledButton: {
    backgroundColor: '#E5DBE0',
  },
  continueButtonText: {
    fontFamily: 'System',
    fontSize: moderateScale(16),
    fontWeight: '700',
    lineHeight: moderateScale(24),
    color: '#FFF',
    textAlign: 'center',
  },
  bottomSpacer: {
    height: verticalScale(20),
    backgroundColor: '#FFF',
  },
});

export default AddIntrest;
