import { useRouter } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Svg, { Path } from 'react-native-svg';

const CloseIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 16 16" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.2806 14.2194C15.5737 14.5124 15.5737 14.9876 15.2806 15.2806C14.9876 15.5737 14.5124 15.5737 14.2194 15.2806L8 9.06031L1.78062 15.2806C1.48757 15.5737 1.01243 15.5737 0.719375 15.2806C0.426319 14.9876 0.426319 14.5124 0.719375 14.2194L6.93969 8L0.719375 1.78062C0.426319 1.48757 0.426319 1.01243 0.719375 0.719375C1.01243 0.426319 1.48757 0.426319 1.78062 0.719375L8 6.93969L14.2194 0.719375C14.5124 0.426319 14.9876 0.426319 15.2806 0.719375C15.5737 1.01243 15.5737 1.48757 15.2806 1.78062L9.06031 8L15.2806 14.2194Z"
      fill="#171214"
    />
  </Svg>
);

const ShieldIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 18 20" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.5 0.75H1.5C0.671573 0.75 0 1.42157 0 2.25V7.76062C0 16.1616 7.10812 18.9487 8.53125 19.4222C8.8352 19.5256 9.1648 19.5256 9.46875 19.4222C10.8938 18.9487 18 16.1616 18 7.76062V2.25C18 1.42157 17.3284 0.75 16.5 0.75ZM16.5 7.76156C16.5 15.1134 10.2797 17.5697 9 17.9972C7.73156 17.5744 1.5 15.12 1.5 7.76156V2.25H16.5V7.76156ZM4.71938 10.2806C4.42632 9.98757 4.42632 9.51243 4.71938 9.21937C5.01243 8.92632 5.48757 8.92632 5.78063 9.21937L7.5 10.9388L12.2194 6.21937C12.5124 5.92632 12.9876 5.92632 13.2806 6.21937C13.5737 6.51243 13.5737 6.98757 13.2806 7.28063L8.03063 12.5306C7.88995 12.6715 7.69906 12.7506 7.5 12.7506C7.30094 12.7506 7.11005 12.6715 6.96937 12.5306L4.71938 10.2806Z"
      fill="#171214"
    />
  </Svg>
);

const UserIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 20 20" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.6488 17.875C18.2209 15.4066 16.0206 13.6366 13.4528 12.7975C16.0635 11.2433 17.3141 8.13638 16.5082 5.2069C15.7022 2.27741 13.0383 0.247449 10 0.247449C6.96167 0.247449 4.29779 2.27741 3.49182 5.2069C2.68585 8.13638 3.93645 11.2433 6.54719 12.7975C3.97938 13.6356 1.77906 15.4056 0.35125 17.875C0.208704 18.1074 0.203527 18.3989 0.337731 18.6363C0.471935 18.8736 0.724375 19.0194 0.997024 19.0171C1.26967 19.0147 1.51958 18.8646 1.64969 18.625C3.41594 15.5725 6.53781 13.75 10 13.75C13.4622 13.75 16.5841 15.5725 18.3503 18.625C18.4804 18.8646 18.7303 19.0147 19.003 19.0171C19.2756 19.0194 19.5281 18.8736 19.6623 18.6363C19.7965 18.3989 19.7913 18.1074 19.6488 17.875ZM4.75 7C4.75 4.1005 7.1005 1.75 10 1.75C12.8995 1.75 15.25 4.1005 15.25 7C15.25 9.8995 12.8995 12.25 10 12.25C7.10179 12.2469 4.7531 9.89821 4.75 7Z"
      fill="#171214"
    />
  </Svg>
);

const GroupIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 16" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.9922 10.805C13.0561 9.43099 13.9769 6.86767 13.2592 4.49441C12.5414 2.12114 10.3544 0.497718 7.875 0.497718C5.39558 0.497718 3.20857 2.12114 2.49084 4.49441C1.7731 6.86767 2.69393 9.43099 4.75781 10.805C2.93952 11.4752 1.38666 12.7153 0.330938 14.3403C0.179932 14.5647 0.161484 14.8531 0.28266 15.095C0.403836 15.3368 0.645857 15.4947 0.916031 15.5081C1.18621 15.5215 1.44266 15.3884 1.58719 15.1597C2.97076 13.0317 5.33677 11.7479 7.875 11.7479C10.4132 11.7479 12.7792 13.0317 14.1628 15.1597C14.3917 15.4999 14.8514 15.5932 15.1948 15.3692C15.5382 15.1452 15.6381 14.6869 15.4191 14.3403C14.3633 12.7153 12.8105 11.4752 10.9922 10.805ZM3.75 6.125C3.75 3.84683 5.59683 2 7.875 2C10.1532 2 12 3.84683 12 6.125C12 8.40317 10.1532 10.25 7.875 10.25C5.5979 10.2474 3.75258 8.4021 3.75 6.125ZM23.4506 15.3781C23.1037 15.6043 22.6391 15.5066 22.4128 15.1597C21.0308 13.0303 18.6636 11.7466 16.125 11.75C15.7108 11.75 15.375 11.4142 15.375 11C15.375 10.5858 15.7108 10.25 16.125 10.25C17.7863 10.2484 19.2846 9.25041 19.9261 7.71798C20.5677 6.18554 20.2273 4.4178 19.0626 3.23312C17.898 2.04844 16.1363 1.67805 14.5931 2.29344C14.3427 2.40171 14.0531 2.36541 13.8372 2.19864C13.6212 2.03188 13.5128 1.76096 13.5542 1.49125C13.5956 1.22154 13.7802 0.995581 14.0363 0.90125C16.7109 -0.165433 19.7592 0.960007 21.099 3.50883C22.4388 6.05765 21.6374 9.2067 19.2422 10.805C21.0605 11.4752 22.6133 12.7153 23.6691 14.3403C23.8953 14.6872 23.7975 15.1518 23.4506 15.3781Z"
      fill="#171214"
    />
  </Svg>
);

const FeatureItem = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) => (
  <View style={styles.featureItem}>
    <View style={styles.iconContainer}>
      {icon}
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  </View>
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

export default function OnboardingStep1() {
  const router = useRouter();

  const handleClose = () => {
    // Handle close action
    console.log('Close onboarding');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header with close button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <CloseIcon />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>A Community Built on Trust</Text>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <FeatureItem
            icon={<ShieldIcon />}
            title="Safety First"
            description="We're committed to creating a safe and inclusive space for everyone."
          />
          <FeatureItem
            icon={<UserIcon />}
            title="Be Yourself"
            description="We value authenticity and encourage genuine connections."
          />
          <FeatureItem
            icon={<GroupIcon />}
            title="Respect Everyone"
            description="We believe in treating others with respect and kindness."
          />
        </View>
      </ScrollView>

    {/* Bottom Section */}
    <View style={styles.bottomSection}>
      <PageIndicators current={0} total={5} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => {
            // Navigate to AddPhotos screen
            router.push('/AddPhotos')
          }}
        >
        <Text style={styles.continueButtonText}>I Understand</Text>
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
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(8),
    alignItems: 'flex-end',
  },
  closeButton: {
    width: scale(48),
    height: scale(48),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(24),
  },
  titleContainer: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(8),
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    lineHeight: moderateScale(30),
    color: '#171214',
    textAlign: 'center',
    fontFamily: 'System',
  },
  featuresContainer: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(8),
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(16),
    minHeight: verticalScale(72),
  },
  iconContainer: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(8),
    backgroundColor: '#F5F0F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(16),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    lineHeight: moderateScale(24),
    color: '#171214',
    marginBottom: verticalScale(2),
    fontFamily: 'System',
  },
  featureDescription: {
    fontSize: moderateScale(14),
    fontWeight: '400',
    lineHeight: moderateScale(21),
    color: '#87637A',
    fontFamily: 'System',
  },
  bottomSection: {
    paddingTop: verticalScale(20),
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
    backgroundColor: '#E5DBE3',
  },
  buttonContainer: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
  },
  continueButton: {
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: '#E838AB',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  continueButtonText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    lineHeight: moderateScale(24),
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'System',
  },
  bottomSpacer: {
    height: verticalScale(20),
  },
});
