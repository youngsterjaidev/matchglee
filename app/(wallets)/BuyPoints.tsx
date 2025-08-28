import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const BuyPoints = ({ navigation }: { navigation: any }) => {
  const pointOptions = [
    {
      id: 1,
      points: 1000,
      price: 9.99,
      bestValue: true,
      gradientColors: ['#FF6B6B', '#FFE066', '#4ECDC4']
    },
    {
      id: 2,
      points: 500,
      price: 5.99,
      bestValue: false,
      gradientColors: ['#FFB199', '#FF9A9E', '#FAD0C4']
    },
    {
      id: 3,
      points: 200,
      price: 2.99,
      bestValue: false,
      gradientColors: ['#A8EDEA', '#FED6E3', '#D299C2']
    }
  ];

  const handleBuyPoints = (points, price) => {
    // Handle purchase logic here
    console.log(`Buying ${points} points for $${price}`);
  };

  const handleMainPurchase = () => {
    // Handle main purchase button
    handleBuyPoints(1000, 9.99);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation?.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Top Up Your Points</Text>
        </View>

        {/* Point Options */}
        <View style={styles.optionsContainer}>
          {pointOptions.map((option) => (
            <View key={option.id} style={styles.optionRow}>
              <View style={styles.textSection}>
                {option.bestValue && (
                  <Text style={styles.bestValueLabel}>Best Value</Text>
                )}
                <Text style={styles.pointsText}>
                  {option.points} Points
                </Text>
                <Text style={styles.priceText}>
                  ${option.price.toFixed(2)}
                </Text>
                <TouchableOpacity 
                  style={styles.buyButton}
                  onPress={() => handleBuyPoints(option.points, option.price)}
                >
                  <Text style={styles.buyButtonText}>Buy</Text>
                  <Ionicons name="arrow-forward" size={16} color="#666" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.cardContainer}>
                <LinearGradient
                  colors={option.gradientColors}
                  style={styles.gradientCard}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.cardText}>EPIC</Text>
                </LinearGradient>
              </View>
            </View>
          ))}
        </View>

        {/* Bottom Purchase Button */}
        <TouchableOpacity 
          style={styles.mainBuyButton}
          onPress={handleMainPurchase}
        >
          <Text style={styles.mainBuyButtonText}>Buy 1000 Points</Text>
        </TouchableOpacity>

        {/* Payment Methods */}
        <Text style={styles.paymentMethods}>
          Payment methods: Visa, Mastercard, PayPal
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 30,
  },
  backButton: {
    padding: 8,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#E91E63',
    flex: 1,
  },
  optionsContainer: {
    flex: 1,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingVertical: 8,
  },
  textSection: {
    flex: 1,
  },
  bestValueLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
    fontWeight: '500',
  },
  pointsText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  priceText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 12,
  },
  buyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  buyButtonText: {
    fontSize: 14,
    color: '#666',
    marginRight: 6,
    fontWeight: '500',
  },
  cardContainer: {
    marginLeft: 20,
  },
  gradientCard: {
    width: 120,
    height: 70,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 2,
  },
  mainBuyButton: {
    backgroundColor: '#E91E63',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 16,
  },
  mainBuyButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  paymentMethods: {
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
    marginBottom: 30,
  },
});

export default BuyPoints;
