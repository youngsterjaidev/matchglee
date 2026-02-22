import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FontFamily } from '../../../../constants/Fonts';
import CardContainer from '../../../../components/settings/CardContainer';
import SegmentedControl from '../../../../components/settings/SegmentedControl';

const PersonalPrivacyScreen: React.FC = () => {
  const router = useRouter();
  const [messageAccess, setMessageAccess] = useState('Everyone');
  const [callAccess, setCallAccess] = useState('Everyone');
  const [lookingFor, setLookingFor] = useState('Everyone');
  const [galleryVisibility, setGalleryVisibility] = useState('Everyone');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal - Privacy</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.cardBlock}>
          <CardContainer>
            <View style={styles.cardInner}>
              <Text style={styles.sectionTitle}>Who can message me</Text>
              <SegmentedControl
                options={['Everyone', 'Followers', 'Following']}
                value={messageAccess}
                onChange={setMessageAccess}
              />
            </View>
          </CardContainer>
        </View>

        <View style={styles.cardBlock}>
          <CardContainer>
            <View style={styles.cardInner}>
              <Text style={styles.sectionTitle}>Who can call me</Text>
              <SegmentedControl
                options={['Everyone', 'Followers', 'Following']}
                value={callAccess}
                onChange={setCallAccess}
              />
            </View>
          </CardContainer>
        </View>

        <View style={styles.cardBlock}>
          <CardContainer>
            <View style={styles.cardInner}>
              <Text style={styles.sectionTitle}>Looking For</Text>
              <SegmentedControl
                options={['Everyone', 'Followers', 'Following']}
                value={lookingFor}
                onChange={setLookingFor}
              />
            </View>
          </CardContainer>
        </View>

        <View style={styles.cardBlock}>
          <CardContainer>
            <View style={styles.cardInner}>
              <Text style={styles.sectionTitle}>Gallery Visibility</Text>
              <SegmentedControl
                options={['Everyone', 'Followers', 'Following', 'Hide']}
                value={galleryVisibility}
                onChange={setGalleryVisibility}
              />
              <Text style={styles.hintText}>Choose who can view your media gallery from your profile.</Text>
            </View>
          </CardContainer>
        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  cardBlock: {
    marginTop: 18,
  },
  cardInner: {
    paddingHorizontal: 18,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#111',
    fontFamily: FontFamily.semiBold,
  },
  hintText: {
    color: '#8A8F9C',
    fontSize: 13,
    marginHorizontal: 18,
    marginTop: 10,
    lineHeight: 18,
    fontFamily: FontFamily.regular,
  },
});

export default PersonalPrivacyScreen;
