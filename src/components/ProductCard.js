import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function ProductCard({ product }) {
  return (
    <View style={styles.productCard}>
      <Image source={{ uri: product.image }} style={styles.productImage} testID="product-image" />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{product.name}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#eef5f0',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  productImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 13,
    color: '#444',
  }
});