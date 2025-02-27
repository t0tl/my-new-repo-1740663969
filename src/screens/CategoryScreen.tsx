import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useTodo } from '../context/TodoContext';
import type { Category } from '../types/navigation';

export default function CategoryScreen() {
  const { categories, addCategory } = useTodo();
  const [newCategoryName, setNewCategoryName] = useState('');

  const colors = ['#FFB74D', '#81C784', '#64B5F6', '#BA68C8', '#F06292'];

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      addCategory({
        name: newCategoryName.trim(),
        color: randomColor,
      });
      setNewCategoryName('');
    }
  };

  const renderItem = ({ item }: { item: Category }) => (
    <View style={[styles.categoryItem, { borderLeftColor: item.color }]}>
      <Text style={styles.categoryName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newCategoryName}
          onChangeText={setNewCategoryName}
          placeholder="New category name"
        />
        <TouchableOpacity 
          style={[styles.addButton, !newCategoryName.trim() && styles.buttonDisabled]}
          onPress={handleAddCategory}
          disabled={!newCategoryName.trim()}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  list: {
    padding: 16,
  },
  categoryItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  categoryName: {
    fontSize: 16,
    color: '#212121',
    fontWeight: '500',
  },
});