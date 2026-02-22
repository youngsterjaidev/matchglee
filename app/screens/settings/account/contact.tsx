import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FontFamily } from '../../../../constants/Fonts';

const ContactDetailsScreen: React.FC = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Details</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <View style={[styles.dot, styles.emailDot]} />
          <View style={styles.rowTextWrap}>
            <Text style={styles.rowTitle}>Email Address</Text>
            <Text style={styles.rowValue}>sarah@matchglee.com</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#C0C4CC" />
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={[styles.dot, styles.phoneDot]} />
          <View style={styles.rowTextWrap}>
            <Text style={styles.rowTitle}>Phone Number</Text>
            <Text style={styles.rowValue}>+1 (555) 987-1234</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#C0C4CC" />
        </View>
      </View>
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
  card: {
    marginHorizontal: 18,
    marginTop: 20,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    shadowColor: '#0D0A2C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 14,
    elevation: 6,
    overflow: 'hidden',
  },
  row: {
    height: 80,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  emailDot: {
    backgroundColor: '#7B4CFF',
  },
  phoneDot: {
    backgroundColor: '#FF4EC7',
  },
  rowTextWrap: {
    flex: 1,
    marginLeft: 12,
    marginRight: 10,
  },
  rowTitle: {
    fontSize: 16,
    color: '#111',
    fontFamily: FontFamily.semiBold,
  },
  rowValue: {
    fontSize: 15,
    color: '#8A8F9C',
    marginTop: 4,
    fontFamily: FontFamily.regular,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F1F4',
  },
});

export default ContactDetailsScreen;
