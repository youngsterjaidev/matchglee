import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FontFamily } from '../../../../constants/Fonts';

interface SettingsPlaceholderScreenProps {
  title: string;
}

const SettingsPlaceholderScreen: React.FC<SettingsPlaceholderScreenProps> = ({ title }) => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.body}>
        <Text style={styles.bodyText}>This is {title}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    minHeight: 56,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: '#111',
    fontFamily: FontFamily.semiBold,
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  body: {
    paddingHorizontal: 24,
    paddingTop: 28,
  },
  bodyText: {
    fontSize: 16,
    color: '#111',
    fontFamily: FontFamily.regular,
    textAlign: 'center',
  },
});

export default SettingsPlaceholderScreen;
