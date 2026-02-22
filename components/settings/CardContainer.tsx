import React from 'react';
import { StyleSheet, View } from 'react-native';

interface CardContainerProps {
  children: React.ReactNode;
  withDividers?: boolean;
}

const CardContainer: React.FC<CardContainerProps> = React.memo(({ children, withDividers = false }) => {
  const childArray = React.Children.toArray(children);

  return (
    <View style={styles.card}>
      {childArray.map((child, index) => {
        const shouldShowDivider = withDividers && index < childArray.length - 1;

        return (
          <React.Fragment key={`child-${index}`}>
            {child}
            {shouldShowDivider ? <View style={styles.divider} /> : null}
          </React.Fragment>
        );
      })}
    </View>
  );
});

CardContainer.displayName = 'CardContainer';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    marginHorizontal: 18,
    paddingVertical: 20,
    shadowColor: '#0D0A2C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 14,
    elevation: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F1F4',
    marginHorizontal: 18,
  },
});

export default CardContainer;
