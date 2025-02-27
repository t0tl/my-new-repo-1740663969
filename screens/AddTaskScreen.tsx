import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import { useTodo } from '../context/TodoContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import CategoryPicker from '../components/CategoryPicker';

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const { addTask } = useTodo();
  const navigation = useNavigation();

  const handleSubmit = () => {
    if (title.trim() && category) {
      addTask({
        title: title.trim(),
        category,
        dueDate,
        completed: false,
      });
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Task title"
        value={title}
        onChangeText={setTitle}
      />
      <CategoryPicker
        selectedCategory={category}
        onSelectCategory={setCategory}
      />
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateButtonText}>
          Due Date: {dueDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) setDueDate(date);
          }}
        />
      )}
      <TouchableOpacity
        style={[styles.button, !title.trim() && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={!title.trim()}
      >
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    fontSize: 16,
    marginBottom: 24,
  },
  dateButton: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginTop: 16,
  },
  dateButtonText: {
    fontSize: 16,
    color: '#212121',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});