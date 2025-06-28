import {Dispatch, SetStateAction, memo} from "react";

interface Props {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  categories: string[];
}

const Filters = ({searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories}: Props) => (
  <div className="flex flex-col md:flex-row gap-4 mb-6">
    <div className="flex-1">
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
    <div className="min-w-48">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">Todas las categorías</option>
        {categories.map(category => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    </div>
  </div>
);

const notIf = (currProps: Readonly<Props>, nextProps: Readonly<Props>) =>
  currProps.searchTerm === nextProps.searchTerm && currProps.selectedCategory === nextProps.selectedCategory &&
  currProps.categories === nextProps.categories;

export default memo(Filters, notIf);
