import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTodo } from '../context/TodoContext';
import { useNavigation } from '@react-navigation/native';

export default function CategoryList() {
  const { categories } = useTodo();
  const navigation = useNavigation();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[styles.category, { backgroundColor: category.color }]}
          onPress={() => navigation.navigate('Categories')}
        >
          <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  category: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
});