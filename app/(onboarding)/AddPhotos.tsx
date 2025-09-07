import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { s } from 'react-native-size-matters';

const { width } = Dimensions.get('window');

const AddPhotos = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={s(24)} color="#171214" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Add Photos</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Showcase Your Best Self</Text>
        </View>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Photos are your first impression. Follow these rules to get the most out of your profile.
          </Text>
        </View>

        {/* Rules */}
        <View style={styles.rulesContainer}>
          <Text style={styles.rules}>
            1. Use clear, well-lit photos.{'\n'}
            2. Show your face in at least one photo.{'\n'}
            3. Avoid group photos as your primary photo.{'\n'}
            4. Be authentic and represent yourself accurately.
          </Text>
        </View>
      </View>

      {/* Photo Grid */}
      <View style={styles.photoGridContainer}>
        <View style={styles.photoGrid}>
          {/* First Row */}
          <View style={styles.photoRow}>
            <View style={styles.photoContainer}>
              <Image
                source={{ uri: 'https://api.builder.io/api/v1/image/assets/TEMP/f119b2cde2b392806a90b4cf1de2d63a040d106a?width=346' }}
                style={styles.photo}
                resizeMode="cover"
              />
            </View>
            <View style={styles.photoContainer}>
              <Image
                source={{ uri: 'https://api.builder.io/api/v1/image/assets/TEMP/d89e5999cf95030b8d4a76e852b72f04acce71d1?width=346' }}
                style={styles.photo}
                resizeMode="cover"
              />
            </View>
          </View>

          {/* Second Row */}
          <View style={styles.photoRow}>
            <TouchableOpacity style={styles.photoContainer}>
              <View style={styles.addPhotoContainer}>
                <Ionicons name="add" size={s(60)} color="#C0C0C0" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.photoContainer}>
              <View style={styles.addPhotoContainer}>
                <Ionicons name="add" size={s(60)} color="#C0C0C0" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Third Row */}
          <View style={styles.photoRow}>
            <TouchableOpacity style={styles.photoContainer}>
              <View style={styles.addPhotoContainer}>
                <Ionicons name="add" size={s(60)} color="#C0C0C0" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.photoContainer}>
              <View style={styles.addPhotoContainer}>
                <Ionicons name="add" size={s(60)} color="#C0C0C0" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Page Indicators */}
      <View style={styles.pageIndicators}>
        <View style={styles.indicator} />
        <View style={[styles.indicator, styles.activeIndicator]} />
        <View style={styles.indicator} />
        <View style={styles.indicator} />
        <View style={styles.indicator} />
      </View>

      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => {
            router.push('/AddIntrest');
          }}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Spacer */}
      <View style={styles.bottomSpacer} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: s(16),
    paddingTop: s(16),
    paddingBottom: s(8),
    backgroundColor: '#FFF',
  },
  backButton: {
    width: s(48),
    height: s(48),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    paddingRight: s(48),
  },
  headerTitle: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: s(18),
    fontWeight: '700',
    lineHeight: s(23),
    color: '#E83894',
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: s(16),
  },
  titleContainer: {
    paddingTop: s(10),
    paddingBottom: s(6),
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: s(22),
    fontWeight: '700',
    lineHeight: s(28),
    color: '#171214',
    textAlign: 'center',
  },
  descriptionContainer: {
    paddingTop: s(2),
    paddingBottom: s(6),
    alignItems: 'center',
  },
  description: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: s(13),
    fontWeight: '400',
    lineHeight: s(18),
    color: '#171214',
    textAlign: 'center',
  },
  rulesContainer: {
    paddingTop: s(2),
    paddingBottom: s(6),
    alignItems: 'center',
  },
  rules: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: s(13),
    fontWeight: '400',
    lineHeight: s(18),
    color: '#171214',
    textAlign: 'center',
  },
  photoGridContainer: {
    paddingHorizontal: s(16),
    paddingTop: s(8),
    flex: 1,
    justifyContent: 'center',
  },
  photoGrid: {
    gap: s(8),
  },
  photoRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: s(8),
    marginBottom: s(8),
  },
  photoContainer: {
    width: (width - s(60)) / 2,
    height: s(100),
    borderRadius: s(12),
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  addPhotoContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: s(12),
  },
  pageIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: s(8),
    paddingVertical: s(10),
  },
  indicator: {
    width: s(8),
    height: s(8),
    borderRadius: s(4),
    backgroundColor: '#E5DBE0',
  },
  activeIndicator: {
    backgroundColor: '#171214',
  },
  buttonContainer: {
    paddingHorizontal: s(16),
    paddingTop: s(24), // increased from s(6) to add more space above the button
  },
  continueButton: {
    height: s(40),
    backgroundColor: '#E34094',
    borderRadius: s(20),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: s(20),
    marginBottom: s(12), // add margin below the button for extra spacing
  },
  continueButtonText: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: s(14),
    fontWeight: '700',
    lineHeight: s(20),
    color: '#FFF',
    textAlign: 'center',
  },
  bottomSpacer: {
    height: s(32), // increased from s(10) to push the button further from the bottom
    backgroundColor: '#FFF',
  },
});

export default AddPhotos;

