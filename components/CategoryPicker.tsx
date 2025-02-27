import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTodo } from '../context/TodoContext';

export default function CategoryPicker({ selectedCategory, onSelectCategory }) {
  const { categories } = useTodo();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.category,
              { backgroundColor: category.color },
              selectedCategory === category.id && styles.selectedCategory,
            ]}
            onPress={() => onSelectCategory(category.id)}
          >
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  label: {
    fontSize: 16,
    color: '#212121',
    marginBottom: 8,
  },
  category: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    opacity: 0.6,
  },
  selectedCategory: {
    opacity: 1,
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
});