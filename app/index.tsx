import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import AppleIcon from '../components/welcome/Apple-icon';
import GoogleIcon from '../components/welcome/Google-icon';

import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { s } from 'react-native-size-matters';

// Feature data matching the design
const features = [
  {
    icon: <Image source={require('@/assets/images/welcome/personality.png')} style={{ width: 23, height: 20 }} />,
    text: 'Personality-matched connections',

  },
  {
    icon: <Image source={require('@/assets/images/welcome/meme.png')} style={{ width: 20, height: 20 }} />,
    text: 'Meme-powered icebreakers',

  },
  {
    icon: <Image source={require('@/assets/images/welcome/verified.png')} style={{ width: 20, height: 20 }} />,
    text: 'Verified, real people only',

  },
];

// Social button component
const SocialButton: React.FC<{
  icon: React.ReactNode;
  text: string;
  onPress?: () => void;
  style?: any;
}> = ({ icon, text, onPress, style }) => (
  <TouchableOpacity style={[styles.socialButton, style]} onPress={onPress}>
    {/* Render icon directly */}
    <View style={styles.socialIcon}>{icon}</View>
    <Text style={styles.socialButtonText}>{text}</Text>
  </TouchableOpacity>
);

const WelcomeScreen: React.FC = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.innerContainer}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Image source={require('@/assets/images/welcome/Vector.png')} style={styles.logoImage} resizeMode="contain" />
          </View>
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Find your vibe, <Text style={styles.titleHighlight}>not{'\n'}just a match</Text>.
          </Text>
        </View>

        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <Image
            source={require('@/assets/images/welcome/home-hero.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        {/* Features */}
        <View style={styles.featureList}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <View style={styles.featureIconContainer}>
                <View style={styles.iconBackground}>
                  <Text style={styles.featureIcon}>
                    {feature.icon}
                  </Text>
                </View>
              </View>
              <Text style={styles.featureText}>{feature.text}</Text>
            </View>
          ))}
        </View>

        {/* Get Started Button */}
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() => router.push('/screens/login')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#E91E63', '#C2185B']}
            style={styles.getStartedButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Social Login */}
        <Text style={styles.orContinue}>or continue with</Text>
        <View style={styles.socialRow}>
          <SocialButton
            icon={<GoogleIcon style={{ width: s(18), height: s(18) }} />}
            text="Google"
            style={styles.socialButtonLeft}
          />
          <SocialButton
            icon={<AppleIcon style={{ width: s(18), height: s(18) }} />}
            text="Apple"
            style={styles.socialButtonRight}
          />
        </View>

        <TouchableOpacity style={styles.emailSignupContainer}>
          <Text style={styles.signUpEmail}>Sign up with email</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing, you agree to our{' '}
            <Text style={styles.link}>Privacy Policy</Text>
            {' '}
            <Text style={styles.link}>Terms</Text>.
          </Text>
          <View style={styles.footerStats}>
            <View style={styles.footerStatItem}>
              <Text style={styles.footerStatIcon}>🛡️</Text>
              <Text style={styles.footerStat}>100% Verified Profiles</Text>
            </View>
            <View style={styles.footerStatItem}>
              <Text style={styles.footerStatIcon}>🚫</Text>
              <Text style={styles.footerStat}>No Bots</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    paddingHorizontal: s(24),
    paddingVertical: s(12),
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: s(8),
    marginBottom: s(0),
    flexShrink: 0,
  },
  iconBackground: {
    width: s(28),             // Circle width
    height: s(28),            // Circle height (same as width)
    borderRadius: s(15),    // Half of width & height to make it a circle
    backgroundColor: '#F2F0FF', // Choose a circle background color
    justifyContent: 'center', // Center icon vertically
    alignItems: 'center',      // Center icon horizontally
  },
  logoCircle: {
    backgroundColor: '#E91E63',
    borderRadius: s(24),
    width: s(64),
    height: s(64),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#E91E63',
    shadowOffset: {
      width: 0,
      height: s(8),
    },
    shadowOpacity: 0.3,
    shadowRadius: s(16),
    elevation: 8,
  },
  logoImage: {
    width: s(30),
    height: s(30),
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: s(0),
    flexShrink: 0,
  },
  title: {
    fontSize: s(26),
    fontWeight: '700',
    color: '#2E2E2E',
    textAlign: 'center',
    lineHeight: s(32),
  },
  titleHighlight: {
    color: '#E91E63',
  },
  illustrationContainer: {
    alignItems: 'center',
    marginVertical: s(4),
    flexShrink: 1,
  },
  illustration: {
    width: '100%',
    maxWidth: s(320),
    height: undefined,
    aspectRatio: 1.6,
  },
  featureList: {
    marginVertical: s(4),
    flexShrink: 1,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: s(8),
  },
  featureIconContainer: {
    width: s(24),
    height: s(24),
    marginRight: s(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: s(16),
    fontWeight: '600',
  },
  featureText: {
    fontSize: s(15),
    color: '#333',
    fontWeight: '500',
    flex: 1,
    flexWrap: 'wrap',
  },
  buttonWrapper: {
    marginHorizontal: 0,
    marginBottom: s(0),
  },
  getStartedButton: {
    borderRadius: s(28),
    paddingVertical: s(14),
    alignItems: 'center',
    shadowColor: '#E91E63',
    shadowOffset: {
      width: 0,
      height: s(4),
    },
    shadowOpacity: 0.3,
    shadowRadius: s(8),
    elevation: 6,
  },
  getStartedText: {
    color: '#fff',
    fontSize: s(17),
    fontWeight: '700',
  },
  orContinue: {
    color: '#999',
    textAlign: 'center',
    marginVertical: s(4),
    fontSize: s(13),
    fontWeight: '500',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 0,
    marginBottom: s(0),
  },
  socialButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: s(12),
    paddingVertical: s(10),
    paddingHorizontal: s(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  socialButtonLeft: {
    marginRight: s(8),
  },
  socialButtonRight: {
    marginLeft: s(8),
  },
  socialIcon: {
    fontSize: s(18),
    marginRight: s(8),
    fontWeight: '600',
  },
  socialButtonText: {
    fontSize: s(15),
    color: '#333',
    fontWeight: '600',
  },
  emailSignupContainer: {
    alignItems: 'center',
    marginBottom: s(0),
  },
  signUpEmail: {
    color: '#E91E63',
    fontSize: s(15),
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingTop: s(8),
    marginBottom: s(0),
  },
  footerText: {
    color: '#999',
    fontSize: s(11),
    textAlign: 'center',
    lineHeight: s(15),
    marginBottom: s(8),
  },
  link: {
    color: '#E91E63',
    fontWeight: '600',
  },
  footerStats: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: s(8),
  },
  footerStatIcon: {
    fontSize: s(12),
    marginRight: s(4),
  },
  footerStat: {
    color: '#999',
    fontSize: s(12),
    fontWeight: '500',
  },
});

export default WelcomeScreen;
