import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FontFamily } from '../../../../constants/Fonts';

const PasswordAuthenticationScreen: React.FC = () => {
  const router = useRouter();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState<'auth-app' | 'sms'>('auth-app');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Password & Authentication</Text>
      </View>

      <Text style={styles.sectionLabel}>SECURITY</Text>

      <View style={styles.card}>
        <View style={styles.row}> 
          <View style={styles.rowTextWrap}>
            <Text style={styles.rowTitle}>Enable Two-Factor Authentication</Text>
            <Text style={styles.rowSubtitle}>Protect your account with a second step</Text>
          </View>
          <Switch
            value={twoFactorEnabled}
            onValueChange={setTwoFactorEnabled}
            trackColor={{ false: '#E5E7EB', true: '#7B4CFF' }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.divider} />

        <TouchableOpacity
          style={[styles.methodRow, selectedMethod === 'auth-app' && styles.methodRowSelected]}
          onPress={() => setSelectedMethod('auth-app')}
          activeOpacity={0.8}
        >
          <View style={styles.methodTextWrap}>
            <Text style={styles.methodTitle}>Authenticator App</Text>
            <Text style={styles.methodSubtitle}>Recommended for stronger security</Text>
          </View>
          {selectedMethod === 'auth-app' ? <Ionicons name="checkmark-circle" size={20} color="#7B4CFF" /> : null}
        </TouchableOpacity>

        <View style={styles.methodGap} />

        <TouchableOpacity
          style={[styles.methodRow, selectedMethod === 'sms' && styles.methodRowSelected]}
          onPress={() => setSelectedMethod('sms')}
          activeOpacity={0.8}
        >
          <View style={styles.methodTextWrap}>
            <Text style={styles.methodTitle}>SMS Verification</Text>
            <Text style={styles.methodSubtitle}>Receive one-time codes by text</Text>
          </View>
          {selectedMethod === 'sms' ? <Ionicons name="checkmark-circle" size={20} color="#7B4CFF" /> : null}
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionLabel}>ACTIVE SESSIONS</Text>

      <View style={styles.card}>
        <View style={styles.sessionRow}>
          <View style={styles.sessionTextWrap}>
            <Text style={styles.rowTitle}>iPhone 15 Pro</Text>
            <Text style={styles.rowSubtitle}>San Francisco, last active now</Text>
          </View>
          <View style={styles.deviceTag}>
            <Text style={styles.deviceTagText}>This device</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.logoutDeviceButton} activeOpacity={0.85}>
          <Text style={styles.logoutDeviceText}>Log Out This Device</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutAllButton} activeOpacity={0.85}>
        <Text style={styles.logoutAllText}>Log Out From All Devices</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F8',
  },
  header: {
    height: 60,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#F0F1F4',
  },
  backButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    marginLeft: 12,
    color: '#111',
    fontFamily: FontFamily.semiBold,
  },
  sectionLabel: {
    fontSize: 13,
    letterSpacing: 1,
    color: '#8A8F9C',
    marginHorizontal: 18,
    marginTop: 24,
    marginBottom: 8,
    fontFamily: FontFamily.semiBold,
  },
  card: {
    marginHorizontal: 18,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    shadowColor: '#0D0A2C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 14,
    elevation: 6,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowTextWrap: {
    flex: 1,
    paddingRight: 12,
  },
  rowTitle: {
    fontSize: 16,
    color: '#111',
    fontFamily: FontFamily.semiBold,
  },
  rowSubtitle: {
    fontSize: 14,
    color: '#8A8F9C',
    marginTop: 4,
    fontFamily: FontFamily.regular,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F1F4',
    marginVertical: 14,
  },
  methodRow: {
    borderRadius: 18,
    backgroundColor: '#F7F8FA',
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodRowSelected: {
    borderColor: '#7B4CFF',
    borderWidth: 2,
    backgroundColor: '#F4EFFF',
  },
  methodTextWrap: {
    flex: 1,
    paddingRight: 10,
  },
  methodTitle: {
    fontSize: 15,
    color: '#111',
    fontFamily: FontFamily.semiBold,
  },
  methodSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#8A8F9C',
    fontFamily: FontFamily.regular,
  },
  methodGap: {
    height: 10,
  },
  sessionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sessionTextWrap: {
    flex: 1,
    paddingRight: 10,
  },
  deviceTag: {
    backgroundColor: '#D1FAE5',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  deviceTagText: {
    fontSize: 12,
    color: '#16A34A',
    fontFamily: FontFamily.medium,
  },
  logoutDeviceButton: {
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FDECEC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutDeviceText: {
    color: '#FF4EC7',
    fontSize: 15,
    fontFamily: FontFamily.semiBold,
  },
  logoutAllButton: {
    marginHorizontal: 18,
    marginTop: 18,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: '#FF4EC7',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutAllText: {
    color: '#FF4EC7',
    fontSize: 15,
    fontFamily: FontFamily.semiBold,
  },
});

export default PasswordAuthenticationScreen;
