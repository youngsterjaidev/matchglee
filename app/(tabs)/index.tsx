import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { useRouter } from 'expo-router'
import WelcomeScreen from '../screens/welcome-screen'

const index = () => {
  const router = useRouter()

  const handleSettingsPress = () => {
    router.push('/screens/settings/Settings')
  }

  return (
    <View style={styles.container}>
      <WelcomeScreen/>
      <TouchableOpacity style={styles.settingsButton} onPress={handleSettingsPress}>
        <Text style={styles.settingsButtonText}>Settings</Text>
      </TouchableOpacity>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingsButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#E340AB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 1000,
  },
  settingsButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
})
