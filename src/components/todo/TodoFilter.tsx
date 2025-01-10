import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

interface TodoFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
}

export const TodoFilter = ({
  searchQuery,
  setSearchQuery,
  filter,
  setFilter
}: TodoFilterProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
      <div className="relative w-full md:w-auto group">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search todos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-primary/50"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-primary transition-colors"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </div>

      <div className="flex gap-2 w-full md:w-auto">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
          className="flex-1 md:flex-none rounded-xl hover:bg-primary/10 transition-colors duration-300"
        >
          All
        </Button>
        <Button
          variant={filter === 'active' ? 'default' : 'outline'}
          onClick={() => setFilter('active')}
          className="flex-1 md:flex-none rounded-xl hover:bg-primary/10 transition-colors duration-300"
        >
          Active
        </Button>
        <Button
          variant={filter === 'completed' ? 'default' : 'outline'}
          onClick={() => setFilter('completed')}
          className="flex-1 md:flex-none rounded-xl hover:bg-primary/10 transition-colors duration-300"
        >
          Completed
        </Button>
      </div>
    </div>
  );
};