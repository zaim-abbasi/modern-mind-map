import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

interface TodoFormProps {
  newTodo: string;
  setNewTodo: (value: string) => void;
  priority: 'low' | 'medium' | 'high';
  setPriority: (value: 'low' | 'medium' | 'high') => void;
  category: string;
  setCategory: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const TodoForm = ({
  newTodo,
  setNewTodo,
  priority,
  setPriority,
  category,
  setCategory,
  onSubmit
}: TodoFormProps) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col md:flex-row gap-4 items-end">
      <div className="flex-1 relative group">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className="w-full bg-gray-50/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary/50 transition-all duration-300 pl-4 pr-10 py-3 rounded-xl"
        />
        <div className="absolute inset-0 border border-primary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
      
      <Select value={priority} onValueChange={(value: any) => setPriority(value)}>
        <SelectTrigger className="w-[140px] bg-gray-50/50 dark:bg-gray-700/50 rounded-xl">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>

      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-[140px] bg-gray-50/50 dark:bg-gray-700/50 rounded-xl">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="personal">Personal</SelectItem>
          <SelectItem value="work">Work</SelectItem>
          <SelectItem value="shopping">Shopping</SelectItem>
        </SelectContent>
      </Select>

      <Button 
        type="submit" 
        className="w-full md:w-auto bg-primary hover:bg-primary-dark transition-all duration-300 rounded-xl shadow-lg hover:shadow-primary/20"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Todo
      </Button>
    </form>
  );
};