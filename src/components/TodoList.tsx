import React from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TodoForm } from './todo/TodoForm';
import { TodoFilter } from './todo/TodoFilter';
import { TodoItem } from './todo/TodoItem';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
}

export const TodoList = () => {
  const { toast } = useToast();
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [newTodo, setNewTodo] = React.useState('');
  const [priority, setPriority] = React.useState<'low' | 'medium' | 'high'>('medium');
  const [category, setCategory] = React.useState('personal');
  const [filter, setFilter] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) {
      toast({
        title: "Error",
        description: "Todo text cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo,
      completed: false,
      priority,
      category,
    };

    setTodos([...todos, todo]);
    setNewTodo('');
    toast({
      title: "Success",
      description: "Todo added successfully",
    });
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast({
      title: "Success",
      description: "Todo deleted successfully",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-todo-low';
      case 'medium':
        return 'bg-todo-medium';
      case 'high':
        return 'bg-todo-high';
      default:
        return 'bg-todo-medium';
    }
  };

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    })
    .filter((todo) =>
      todo.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-primary-light to-primary-dark bg-clip-text text-transparent">
          Todo List
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Organize your tasks efficiently <Sparkles className="inline-block ml-2 text-primary animate-pulse" />
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-6 border border-gray-200/50 dark:border-gray-700/50"
      >
        <TodoForm
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          priority={priority}
          setPriority={setPriority}
          category={category}
          setCategory={setCategory}
          onSubmit={addTodo}
        />

        <TodoFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filter={filter}
          setFilter={setFilter}
        />

        <AnimatePresence mode="popLayout">
          <motion.div className="space-y-4">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                getPriorityColor={getPriorityColor}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};