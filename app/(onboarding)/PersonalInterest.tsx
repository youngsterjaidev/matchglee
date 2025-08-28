import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PersonalInterest = () => {
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
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#171214" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Personal interset</Text>
          </View>
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
              <Ionicons name="search" size={24} color="#876375" style={styles.searchIcon} />
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
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Spacer */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#FFF',
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    paddingRight: 48,
  },
  headerTitle: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 23,
    color: '#E83894',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  titleContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 35,
    color: '#171214',
    textAlign: 'center',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: '#F5F0F2',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: '#171214',
  },
  categoryContainer: {
    marginBottom: 8,
  },
  categoryTitleContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },
  categoryTitle: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 28,
    color: '#171214',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    paddingBottom: 12,
    gap: 12,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F5F0F2',
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedChip: {
    backgroundColor: '#E83894',
  },
  chipText: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    color: '#171214',
  },
  selectedChipText: {
    color: '#FFF',
    fontWeight: '500',
  },
  pageIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 20,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5DBE0',
  },
  activeIndicator: {
    backgroundColor: '#171214',
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  continueButton: {
    height: 48,
    backgroundColor: '#E34094',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  disabledButton: {
    backgroundColor: '#E5DBE0',
  },
  continueButtonText: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    color: '#FFF',
    textAlign: 'center',
  },
  bottomSpacer: {
    height: 20,
    backgroundColor: '#FFF',
  },
});

export default PersonalInterest;
