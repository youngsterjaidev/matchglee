import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FontFamily } from '../../../../constants/Fonts';

const DeactivationDeletionScreen: React.FC = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Deactivation or Deletion</Text>
      </View>

      <TouchableOpacity style={styles.deactivateButton} activeOpacity={0.85}>
        <Text style={styles.deactivateButtonText}>Temporarily Deactivate Account</Text>
      </TouchableOpacity>

      <View style={styles.warningCard}>
        <Text style={styles.warningTitle}>Before You Request Deletion</Text>
        <Text style={styles.warningText}>
          Deletion is permanent. Your profile, messages, and preferences will be removed after review.
        </Text>
      </View>

      <TouchableOpacity style={styles.deleteButton} activeOpacity={0.85}>
        <Text style={styles.deleteButtonText}>Request Account Deletion</Text>
      </TouchableOpacity>

      <Text style={styles.noteText}>This action may take up to 30 days to complete.</Text>
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
  deactivateButton: {
    marginHorizontal: 18,
    marginTop: 20,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: '#F59E0B',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deactivateButtonText: {
    color: '#F59E0B',
    fontSize: 15,
    fontFamily: FontFamily.semiBold,
  },
  warningCard: {
    backgroundColor: '#FDECEC',
    borderRadius: 26,
    padding: 18,
    marginHorizontal: 18,
    marginTop: 20,
  },
  warningTitle: {
    fontSize: 16,
    color: '#DC2626',
    fontFamily: FontFamily.semiBold,
  },
  warningText: {
    marginTop: 8,
    fontSize: 14,
    color: '#DC2626',
    lineHeight: 20,
    fontFamily: FontFamily.regular,
  },
  deleteButton: {
    marginHorizontal: 18,
    marginTop: 20,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#F87171',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
  },
  noteText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#DC2626',
    marginTop: 10,
    marginHorizontal: 18,
    fontFamily: FontFamily.regular,
  },
});

export default DeactivationDeletionScreen;
