import {useState, useMemo, useCallback} from 'react';
import {Link} from 'react-router-dom';
import {useProducts, useCategories} from '../hooks/useProducts';
import {useCart} from '../context/CartContext';
import type {ApiProduct} from '../hooks/useProducts';
import Loading from "../components/Loading";
import Retry from "./helperComponents/Retry";
import Filters from "./helperComponents/Filters";
import HomeDetails from "./helperComponents/HomeDetails";
import AddBtn from "./helperComponents/AddBtn";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import ClearFilters from "./helperComponents/ClearFilters";

const Home = () => {
  const {products, loading, error} = useProducts();
  const {categories} = useCategories();
  const {dispatch} = useCart();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const filteredProducts = useMemo(() => (
    products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
  ), [products, searchTerm, selectedCategory]);

  const addToCart = useCallback((product: ApiProduct) => {
    dispatch({
      type: 'ADD',
      product: {
        id: product.id, title: product.title, price: product.price, image: product.image, quantity: 1
      }
    });
  }, [dispatch]);

  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <Retry error={error}/>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Bienvenido a Soma's Store
        </h1>
        <p className="text-gray-600 mb-6">
          Descubre nuestra selección de productos
        </p>

        <Filters
          categories={categories}
          selectedCategory={selectedCategory}
          searchTerm={searchTerm}
          setSelectedCategory={setSelectedCategory}
          setSearchTerm={setSearchTerm}
        />

        <HomeDetails
          selectedCategory={selectedCategory}
          searchTerm={searchTerm}
          filteredProdsLength={filteredProducts.length}
          prodsLength={products.length}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id}
               className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
            <Link to={`/product/${product.id}`}>
              <div className="aspect-square p-4 bg-gray-50">
                <img src={product.image} alt={product.title}
                     className="w-full h-full object-contain hover:scale-105 transition-transform"/>
              </div>
            </Link>

            <div className="p-4 flex flex-col flex-grow">
              <Link to={`/product/${product.id}`}>
                <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 line-clamp-2">
                  {product.title}
                </h3>
              </Link>

              <div className="flex-grow"/>

              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      icon={faStar} key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating.rate) ? 'text-yellow-400' : 'text-gray-300'}`}/>
                  ))}
                  <span className="text-sm text-gray-500 ml-1">
                    ({product.rating.count})
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {product.category}
                </span>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <span className="text-xl font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </span>
                <AddBtn product={product} addToCart={addToCart} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && !loading && (
        <ClearFilters setSearchTerm={setSearchTerm} setSelectedCategory={setSelectedCategory}/>
      )}
    </div>
  );
}

export default Home;
