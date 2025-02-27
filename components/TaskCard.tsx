import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { useTodo } from '../context/TodoContext';
import { AntDesign } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function TaskCard({ task }) {
  const { toggleTask, deleteTask, categories } = useTodo();

  const category = categories.find(cat => cat.id === task.category);

  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
    });

    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          deleteTask(task.id);
        }}
      >
        <Animated.View
          style={[styles.deleteAction, { transform: [{ translateX: trans }] }]}
        >
          <AntDesign name="delete" size={24} color="white" />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => {
            Haptics.selectionAsync();
            toggleTask(task.id);
          }}
        >
          {task.completed && (
            <AntDesign name="check" size={16} color="#2196F3" />
          )}
        </TouchableOpacity>
        <View style={styles.content}>
          <Text
            style={[
              styles.title,
              task.completed && styles.completedTitle,
            ]}
          >
            {task.title}
          </Text>
          <View style={styles.details}>
            <View
              style={[
                styles.category,
                { backgroundColor: category?.color },
              ]}
            >
              <Text style={styles.categoryText}>{category?.name}</Text>
            </View>
            <Text style={styles.date}>
              {new Date(task.dueDate).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2196F3',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: '#212121',
    marginBottom: 4,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#9e9e9e',
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  category: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 12,
  },
  date: {
    fontSize: 12,
    color: '#757575',
  },
  deleteButton: {
    backgroundColor: '#ff5252',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: 100,
    height: '100%',
  },
  deleteAction: {
    padding: 16,
  },
});