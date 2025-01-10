import React from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, Trash2 } from "lucide-react";

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

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

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

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Todo List</h1>
      
      <form onSubmit={addTodo} className="flex gap-4 items-end">
        <div className="flex-1">
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="w-full"
          />
        </div>
        
        <Select value={priority} onValueChange={(value: any) => setPriority(value)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="personal">Personal</SelectItem>
            <SelectItem value="work">Work</SelectItem>
            <SelectItem value="shopping">Shopping</SelectItem>
          </SelectContent>
        </Select>

        <Button type="submit">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Todo
        </Button>
      </form>

      <div className="flex gap-4 justify-center">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button
          variant={filter === 'active' ? 'default' : 'outline'}
          onClick={() => setFilter('active')}
        >
          Active
        </Button>
        <Button
          variant={filter === 'completed' ? 'default' : 'outline'}
          onClick={() => setFilter('completed')}
        >
          Completed
        </Button>
      </div>

      <div className="space-y-4">
        {filteredTodos.map((todo) => (
          <div
            key={todo.id}
            className={`flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow ${
              todo.completed ? 'opacity-60' : ''
            }`}
          >
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => toggleTodo(todo.id)}
            />
            
            <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
              {todo.text}
            </span>
            
            <span className={`px-2 py-1 rounded-full text-white text-sm ${getPriorityColor(todo.priority)}`}>
              {todo.priority}
            </span>
            
            <span className="px-2 py-1 bg-secondary-blue rounded-full text-sm">
              {todo.category}
            </span>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};