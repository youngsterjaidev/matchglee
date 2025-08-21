import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Image,
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Svg, { Path } from 'react-native-svg';

const BackIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 18 16" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 8C18 8.41421 17.6642 8.75 17.25 8.75H2.56031L8.03063 14.2194C8.32368 14.5124 8.32368 14.9876 8.03063 15.2806C7.73757 15.5737 7.26243 15.5737 6.96937 15.2806L0.219375 8.53063C0.0785422 8.38995 -0.000590086 8.19906 -0.000590086 8C-0.000590086 7.80094 0.0785422 7.61005 0.219375 7.46937L6.96937 0.719375C7.26243 0.426319 7.73757 0.426319 8.03063 0.719375C8.32368 1.01243 8.32368 1.48757 8.03063 1.78062L2.56031 7.25H17.25C17.6642 7.25 18 7.58579 18 8Z"
      fill="#171214"
    />
  </Svg>
);

const AIIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 21 18" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.5 3C1.5 2.58579 1.83579 2.25 2.25 2.25H3.75V0.75C3.75 0.335786 4.08579 0 4.5 0C4.91421 0 5.25 0.335786 5.25 0.75V2.25H6.75C7.16421 2.25 7.5 2.58579 7.5 3C7.5 3.41421 7.16421 3.75 6.75 3.75H5.25V5.25C5.25 5.66421 4.91421 6 4.5 6C4.08579 6 3.75 5.66421 3.75 5.25V3.75H2.25C1.83579 3.75 1.5 3.41421 1.5 3ZM14.25 15H13.5V14.25C13.5 13.8358 13.1642 13.5 12.75 13.5C12.3358 13.5 12 13.8358 12 14.25V15H11.25C10.8358 15 10.5 15.3358 10.5 15.75C10.5 16.1642 10.8358 16.5 11.25 16.5H12V17.25C12 17.6642 12.3358 18 12.75 18C13.1642 18 13.5 17.6642 13.5 17.25V16.5H14.25C14.6642 16.5 15 16.1642 15 15.75C15 15.3358 14.6642 15 14.25 15ZM19.5 10.5H18V9C18 8.58579 17.6642 8.25 17.25 8.25C16.8358 8.25 16.5 8.58579 16.5 9V10.5H15C14.5858 10.5 14.25 10.8358 14.25 11.25C14.25 11.6642 14.5858 12 15 12H16.5V13.5C16.5 13.9142 16.8358 14.25 17.25 14.25C17.6642 14.25 18 13.9142 18 13.5V12H19.5C19.9142 12 20.25 11.6642 20.25 11.25C20.25 10.8358 19.9142 10.5 19.5 10.5ZM17.5603 4.5L4.5 17.5603C3.91429 18.1456 2.96508 18.1456 2.37937 17.5603L0.43875 15.6216C0.157371 15.3402 -0.000710964 14.9587 -0.000710964 14.5608C-0.000710964 14.1629 0.157371 13.7813 0.43875 13.5L13.5 0.439687C13.7813 0.158309 14.1629 0.000226498 14.5608 0.000226498C14.9587 0.000226498 15.3402 0.158309 15.6216 0.439687L17.5603 2.37844C17.8417 2.65975 17.9998 3.04133 17.9998 3.43922C17.9998 3.8371 17.8417 4.21869 17.5603 4.5ZM12.4388 7.5L10.5 5.56031L1.5 14.5603L3.43875 16.5L12.4388 7.5ZM16.5 3.43969L14.5603 1.5L11.5603 4.5L13.5 6.43969L16.5 3.43969Z"
      fill="white"
    />
  </Svg>
);

const PageIndicators = ({ current, total }: { current: number; total: number }) => (
  <View style={styles.indicatorContainer}>
    {Array.from({ length: total }, (_, index) => (
      <View
        key={index}
        style={[
          styles.indicator,
          index === current ? styles.activeIndicator : styles.inactiveIndicator,
        ]}
      />
    ))}
  </View>
);

export default function AnswerPrompts() {
  const router = useRouter();
  const [responseText, setResponseText] = useState('');

  const handleBack = () => {
    router.back();
  };

  const handleFinishProfile = () => {
    router.push('/screens/onboarding/FinishProfile');
  };

  const handleShuffle = () => {
    // Logic to shuffle to a new prompt
    console.log('Shuffle prompt');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <BackIcon />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Answer Prompts</Text>
          </View>
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Add a Personal Touch</Text>
        </View>

        {/* Prompt Card */}
        <View style={styles.promptCardContainer}>
          <ImageBackground
            source={{
              uri: 'https://api.builder.io/api/v1/image/assets/TEMP/90c49e19d432293323c8d6873260af7553280639?width=816'
            }}
            style={styles.promptCard}
            imageStyle={styles.promptCardImage}
          >
            <View style={styles.promptOverlay}>
              <View style={styles.promptContent}>
                <Text style={styles.promptQuestion}>
                  What's your favorite way to spend a Sunday?
                </Text>
                <TouchableOpacity onPress={handleShuffle}>
                  <Text style={styles.shuffleText}>Shuffle Prompt</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* Response Input */}
        <View style={styles.responseContainer}>
          <View style={styles.responseInputContainer}>
            <TextInput
              style={styles.responseInput}
              placeholder="Type your response here..."
              placeholderTextColor="#A1A1A1"
              value={responseText}
              onChangeText={setResponseText}
              multiline
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* AI Button */}
        <View style={styles.aiButtonContainer}>
          <TouchableOpacity style={styles.aiButton}>
            <AIIcon />
            <Text style={styles.aiButtonText}>AI</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <PageIndicators current={4} total={5} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.finishButton}
            onPress={handleFinishProfile}
          >
            <Text style={styles.finishButtonText}>Finish Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomSpacer} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
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
    paddingRight: scale(48),
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    lineHeight: moderateScale(23),
    color: '#E83894',
    textAlign: 'center',
    fontFamily: 'System',
  },
  titleContainer: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(12),
  },
  title: {
    fontSize: moderateScale(22),
    fontWeight: '700',
    lineHeight: moderateScale(28),
    color: '#171214',
    fontFamily: 'System',
  },
  promptCardContainer: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(16),
  },
  promptCard: {
    height: verticalScale(400),
    borderRadius: scale(12),
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  promptCardImage: {
    borderRadius: scale(12),
  },
  promptOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: scale(16),
    justifyContent: 'flex-end',
    height: verticalScale(120),
  },
  promptContent: {
    gap: verticalScale(4),
  },
  promptQuestion: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    lineHeight: moderateScale(30),
    color: '#FFFFFF',
    fontFamily: 'System',
  },
  shuffleText: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    lineHeight: moderateScale(24),
    color: '#FFFFFF',
    fontFamily: 'System',
  },
  responseContainer: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(12),
  },
  responseInputContainer: {
    minHeight: verticalScale(144),
    padding: scale(15),
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: '#E3DEE0',
    backgroundColor: '#FFFFFF',
  },
  responseInput: {
    flex: 1,
    fontSize: moderateScale(16),
    fontWeight: '400',
    lineHeight: moderateScale(24),
    color: '#171214',
    fontFamily: 'System',
  },
  aiButtonContainer: {
    paddingHorizontal: scale(28),
    paddingBottom: verticalScale(20),
    alignItems: 'flex-end',
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: scale(40),
    paddingHorizontal: scale(16),
    gap: scale(8),
    borderRadius: scale(20),
    backgroundColor: '#E83894',
  },
  aiButtonText: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    lineHeight: moderateScale(21),
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'System',
  },
  bottomSection: {
    backgroundColor: '#FFFFFF',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(20),
    gap: scale(12),
  },
  indicator: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
  },
  activeIndicator: {
    backgroundColor: '#171214',
  },
  inactiveIndicator: {
    backgroundColor: '#E3DEE0',
  },
  buttonContainer: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
  },
  finishButton: {
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: '#E83894',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  finishButtonText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    lineHeight: moderateScale(24),
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'System',
  },
  bottomSpacer: {
    height: verticalScale(20),
    backgroundColor: '#FFFFFF',
  },
});
