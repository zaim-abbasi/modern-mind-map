import React from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface TodoItemProps {
  todo: {
    id: string;
    text: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    category: string;
  };
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  getPriorityColor: (priority: string) => string;
}

export const TodoItem = ({ todo, onToggle, onDelete, getPriorityColor }: TodoItemProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex items-center gap-4 p-4 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl border border-gray-200/50 dark:border-gray-600/50 hover:shadow-lg hover:scale-[1.01] transition-all duration-300 ${
        todo.completed ? 'opacity-60' : ''
      }`}
    >
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
        className="data-[state=checked]:bg-primary"
      />
      
      <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
        {todo.text}
      </span>
      
      <span 
        className={`px-3 py-1 rounded-full text-white text-sm ${getPriorityColor(todo.priority)} 
          transition-all hover:scale-105 shadow-sm`}
      >
        {todo.priority}
      </span>
      
      <span className="px-3 py-1 bg-secondary-blue/50 dark:bg-gray-600/50 rounded-full text-sm transition-all hover:scale-105 shadow-sm backdrop-blur-sm">
        {todo.category}
      </span>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(todo.id)}
        className="text-red-500 hover:text-red-700 hover:bg-red-100/50 dark:hover:bg-red-900/20 rounded-xl"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </motion.div>
  );
};