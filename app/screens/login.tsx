import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AppleIcon from '../../components/welcome/Apple-icon';
import GoogleIcon from '../../components/welcome/Google-icon';

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleBack = () => {
    router.back();
  };

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login with email:', email, 'password:', password);
    router.push('/(tabs)')
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign in
    console.log('Google sign in');
  };

  const handleAppleSignIn = () => {
    // Handle Apple sign in
    console.log('Apple sign in');
  };

  const handleForgotPassword = () => {
    // Handle forgot password
    console.log('Forgot password');
  };

  const handleSignUp = () => {
    // Handle navigation to sign up
    console.log('Navigate to sign up');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header with Back Button */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Ionicons name="arrow-back" size={24} color="#171214" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Back</Text>
            <View style={styles.headerSpacer} />
          </View>

          {/* Main Content */}
          <View style={styles.content}>
            {/* Welcome Title */}
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Welcome Back!</Text>
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Email"
                  placeholderTextColor="#876375"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Password"
                  placeholderTextColor="#876375"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Forgot Password */}
            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <View style={styles.loginButtonContainer}>
              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Log In</Text>
              </TouchableOpacity>
            </View>

            {/* Social Login Buttons */}
            <View style={styles.socialLoginContainer}>
              <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignIn}>
                <View style={styles.contineuWithButoon}>
                  <GoogleIcon  width={30} height={20} fill="#171214" />
                  <Text style={styles.socialButtonText}>Continue with Google</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.socialButton} onPress={handleAppleSignIn}>
                <View style={styles.contineuWithButoon}>
                  <AppleIcon width={30} height={20} fill="#171214" />
                  <Text style={styles.socialButtonText}>Continue with Apple</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom Sign Up Link */}
          <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.signUpText}> Don't have an account? Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    minHeight: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  contineuWithButoon:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
 
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#E83894',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    marginRight: 48, // Compensate for back button width
  },
  headerSpacer: {
    width: 48,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
  },
  titleContainer: {
    paddingVertical: 20,
    paddingBottom: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#171214',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    lineHeight: 35,
  },
  inputContainer: {
    marginBottom: 12,
    paddingVertical: 12,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: '#171214',
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    lineHeight: 24,
  },
  inputWrapper: {
    height: 56,
    backgroundColor: '#F5F0F2',
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 16,
    color: '#171214',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    lineHeight: 24,
    padding: 0,
  },
  forgotPasswordContainer: {
    paddingVertical: 4,
    paddingBottom: 12,
    alignItems: 'flex-start',
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#876375',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    lineHeight: 21,
  },
  loginButtonContainer: {
    paddingVertical: 12,
  },
  loginButton: {
    height: 48,
    backgroundColor: '#E83894',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    lineHeight: 24,
  },
  socialLoginContainer: {
    paddingVertical: 12,
    gap: 12,
    alignItems: 'center',
  },
  socialButton: {
    height: 40,
    backgroundColor: '#F5F0F2',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
    gap: 8,
    alignSelf: 'stretch',
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#171214',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    lineHeight: 21,
  },
  bottomContainer: {
    paddingVertical: 4,
    paddingBottom: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  signUpText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#876375',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    lineHeight: 21,
  },
});

export default LoginScreen;
