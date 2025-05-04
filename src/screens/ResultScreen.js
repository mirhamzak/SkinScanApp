import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import skinData from '../data/skinScanResult.json';
import ProductCard from '../components/ProductCard';

export default function ResultScreen() {
  const [activeTab, setActiveTab] = useState('wrinkles');

  const renderProduct = ({ item }) => (
    <ProductCard product={item} />
  );

  const stats = skinData.scanResult.statistics;
  const recommendationsWrinkles = skinData.scanResult.recommendationsWrinkles;
  const recommendationsBaldness = skinData.scanResult.recommendationsBaldness;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Skin test Results</Text>
      <Text style={styles.subText}>
        This skin test uses AI analysis to reveal any skin issues and suggest possible solutions
      </Text>

      <View style={styles.infoRow}>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Problem severity</Text>
          <Text style={styles.infoValue}>{skinData.scanResult.severity}%</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Your skin age</Text>
          <Text style={styles.infoValue}>{skinData.scanResult.age}</Text>
        </View>
      </View>
      <Text style={styles.recommendationTitle}>Skin statistics</Text>
      <View style={styles.statsBox}>
        {Object.keys(stats).map((key) => (
          <View key={key} style={styles.statRow}>
            <Text style={styles.statLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
            <View style={styles.progressView}>
              <Text style={styles.statPercent}>{stats[key]}%</Text>
              <View style={styles.progressBarBackground}>
                <View style={[styles.progressBarFill, { width: `${stats[key]}%` }]} />
              </View>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.recommendationTitle}>Recommendations</Text>
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setActiveTab('wrinkles')} style={[styles.tab, activeTab === 'wrinkles' && styles.activeTab]}>
          <Text style={[styles.tabText, activeTab === 'wrinkles' && styles.activeTabText]}>For wrinkles</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('baldness')} style={[styles.tab, activeTab === 'baldness' && styles.activeTab]}>
          <Text style={[styles.tabText, activeTab === 'baldness' && styles.activeTabText]}>For baldness</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={activeTab === 'wrinkles' ? recommendationsWrinkles : recommendationsBaldness}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        scrollEnabled={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: '#eef5f0',
    flex: 1,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  infoLabel: {
    fontSize: 13,
    color: '#444',
  },
  infoValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#2e7d32',
  },
  statPercent: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
    width: 30,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 14,
    color: '#888',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '600',
  },
  statsBox: {
    backgroundColor: '#eef5f0',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statRow: {
    width: '48%',
    marginBottom: 16,
  },
  statLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  progressView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarBackground: {
    flex: 1,
    height: 6,
    backgroundColor: '#ccc',
    borderRadius: 4,
  },
  progressBarFill: {
    height: 6,
    backgroundColor: '#558b2f',
    borderRadius: 4,
  },
});