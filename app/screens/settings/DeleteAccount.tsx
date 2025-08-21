import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface DeletionItemProps {
  icon: string;
  title: string;
}

const DeletionItem: React.FC<DeletionItemProps> = ({ icon, title }) => (
  <View style={styles.deletionItem}>
    <View style={styles.iconContainer}>
      <Ionicons name={icon as any} size={24} color="#171212" />
    </View>
    <Text style={styles.deletionItemText}>{title}</Text>
  </View>
);

const DeleteAccount: React.FC = () => {
  const router = useRouter();
  const [deleteText, setDeleteText] = useState('');

  const handleBackPress = () => {
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  const handleDeleteAccount = () => {
    if (deleteText.toLowerCase() !== 'delete') {
      Alert.alert('Error', 'Please type DELETE to confirm account deletion');
      return;
    }

    Alert.alert(
      'Delete Account',
      'Are you sure you want to permanently delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // Handle account deletion
            console.log('Account deleted');
          },
        },
      ]
    );
  };

  const isDeleteEnabled = deleteText.toLowerCase() === 'delete';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Account</Text>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          <Text style={styles.mainTitle}>Delete Your Account?</Text>

          {/* Warning */}
          <DeletionItem
            icon="warning-outline"
            title="Deleting your account will:"
          />

          {/* Deletion consequences */}
          <DeletionItem
            icon="person-outline"
            title="Remove your profile from the app"
          />

          <DeletionItem
            icon="chatbubbles-outline"
            title="Delete all your matches and messages"
          />

          <DeletionItem
            icon="card-outline"
            title="Cancel any active subscriptions"
          />

          {/* Delete confirmation input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.deleteInput}
              placeholder="Type DELETE"
              placeholderTextColor="#876363"
              value={deleteText}
              onChangeText={setDeleteText}
              autoCapitalize="characters"
            />
          </View>

          {/* Delete button */}
          <TouchableOpacity
            style={[
              styles.deleteButton,
              { opacity: isDeleteEnabled ? 1 : 0.5 }
            ]}
            onPress={handleDeleteAccount}
            disabled={!isDeleteEnabled}
          >
            <Text style={styles.deleteButtonText}>Permanently Delete Account</Text>
          </TouchableOpacity>

          {/* Cancel button */}
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home" size={24} color="#171212" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="people-outline" size={24} color="#876363" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="chatbubbles-outline" size={24} color="#876363" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="person-outline" size={24} color="#876363" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 48,
    paddingVertical: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#171212',
    fontFamily: 'Plus Jakarta Sans',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#171212',
    fontFamily: 'Plus Jakarta Sans',
    lineHeight: 28,
    paddingVertical: 20,
    paddingBottom: 12,
  },
  deletionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 16,
    minHeight: 56,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F5F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deletionItemText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#171212',
    fontFamily: 'Plus Jakarta Sans',
    lineHeight: 24,
    flex: 1,
  },
  inputContainer: {
    paddingVertical: 12,
    marginTop: 16,
  },
  deleteInput: {
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5DBDB',
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: '400',
    color: '#171212',
    fontFamily: 'Plus Jakarta Sans',
    lineHeight: 24,
  },
  deleteButton: {
    height: 40,
    backgroundColor: '#E83838',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
    fontFamily: 'Plus Jakarta Sans',
    lineHeight: 21,
  },
  cancelButton: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#876363',
    fontFamily: 'Plus Jakarta Sans',
    lineHeight: 21,
  },
  bottomTabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F5F0F0',
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingBottom: 12,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
  },
});

export default DeleteAccount;
