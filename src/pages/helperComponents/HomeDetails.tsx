import {memo} from 'react';

interface Props {
  searchTerm: string;
  selectedCategory: string;
  filteredProdsLength: number;
  prodsLength: number;
}

const HomeDetails = ({searchTerm, selectedCategory, filteredProdsLength, prodsLength}: Props) => (
  <div className="mb-4">
    <p className="text-gray-600">
      Mostrando {filteredProdsLength} de {prodsLength} productos
      {searchTerm && ` para "${searchTerm}"`}
      {selectedCategory && ` en la categoría "${selectedCategory}"`}
    </p>
  </div>
);

export default memo(HomeDetails);
