import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import { Search } from "lucide-react"; // Importing search icon

interface SearchBarProps {
  query: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  placeholder?: string;
}

export const SearchBar = ({
  query,
  onSearchChange,
  onSearchSubmit,
  placeholder = "Search",
}: SearchBarProps) => {
  return (
    <form
      onSubmit={onSearchSubmit}
      className="relative flex items-center w-full max-w-sm"
    >
      <Search className="absolute left-3 text-gray-400" size={20} />
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={onSearchChange}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-400"
      />
    </form>
  );
};
