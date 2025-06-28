import {Dispatch, SetStateAction} from "react";

interface Props {
  setSearchTerm: Dispatch<SetStateAction<string>>;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
}

const ClearFilters = ({setSearchTerm, setSelectedCategory}: Props) => (
  <div className="text-center py-12">
    <p className="text-gray-500 text-lg">No se encontraron productos</p>
    <button
      onClick={() => {
        setSearchTerm('');
        setSelectedCategory('');
      }}
      className="mt-4 text-blue-600 hover:text-blue-800"
    >
      Limpiar filtros
    </button>
  </div>
);

export default ClearFilters;
