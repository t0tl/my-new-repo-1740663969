export type RootStackParamList = {
  Home: undefined;
  AddTask: undefined;
  Categories: undefined;
};

export interface Task {
  id: string;
  title: string;
  category: string;
  dueDate: Date;
  completed: boolean;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}