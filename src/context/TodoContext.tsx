import React, { createContext, useContext, useState } from 'react';
import type { Task, Category } from '../types/navigation';

interface TodoContextType {
  tasks: Task[];
  categories: Category[];
  addTask: (task: Omit<Task, 'id'>) => void;
  toggleTask: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  deleteTask: (id: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Personal', color: '#FFB74D' },
    { id: '2', name: 'Work', color: '#81C784' },
    { id: '3', name: 'Shopping', color: '#64B5F6' },
  ]);

  const addTask = (task: Omit<Task, 'id'>) => {
    setTasks([...tasks, { ...task, id: Date.now().toString() }]);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    setCategories([...categories, { ...category, id: Date.now().toString() }]);
  };

  return (
    <TodoContext.Provider value={{
      tasks,
      categories,
      addTask,
      toggleTask,
      addCategory,
      deleteTask,
    }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
}