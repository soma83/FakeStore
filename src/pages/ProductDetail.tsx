import {useParams, Link} from 'react-router-dom';
import {useState} from 'react';
import {useProduct} from '../hooks/useProducts';
import {useCart} from '../context/CartContext';
import Loading from "../components/Loading";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faCartPlus, faPlus, faMinus} from "@fortawesome/free-solid-svg-icons";

const ProductDetail = () => {
  const {id} = useParams<{ id: string }>();
  const {product, loading, error} = useProduct(id || '');
  const {dispatch} = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const addToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        dispatch({
          type: 'ADD',
          product: {
            id: product.id, title: product.title, price: product.price, image: product.image, quantity: 1
          }
        });
      }
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  if (loading) {
    return <Loading/>;
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Producto no encontrado</h1>
        <p className="text-gray-600 mb-6">{error || 'El producto que buscas no existe.'}</p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div>
      <nav className="mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-600">
            Inicio
          </Link>
          <span>/</span>
          <span className="capitalize">{product.category}</span>
          <span>/</span>
          <span className="text-gray-900 font-medium">
            {product.title.length > 30 ? product.title.substring(0, 30) + '...' : product.title}
          </span>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="aspect-square">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>

            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product?.rating?.rate || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
                <span className="text-sm text-gray-600 ml-2">
                  {product.rating.rate} ({product.rating.count} reseñas)
                </span>
              </div>
            </div>

            <div className="mb-4">
              <span className="inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full capitalize">
                {product.category}
              </span>
            </div>
          </div>

          <div className="border-t border-b border-gray-200 py-4">
            <span className="text-4xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Descripción
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center space-x-4 mb-4">
              <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                Cantidad:
              </label>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-white border border-gray-300 rounded-l-md px-3 py-2 hover:bg-gray-50"
                >
                  <Icon icon={faMinus}/>
                </button>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-t border-b border-gray-300 py-2"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-white border border-gray-300 rounded-r-md px-3 py-2 hover:bg-gray-50"
                >
                  <Icon icon={faPlus}/>
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={addToCart}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                  addedToCart ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {!addedToCart && <Icon icon={faCartPlus} className="mr-2"/>}
                {addedToCart ? '¡Agregado al carrito!' : 'Agregar al carrito'}
              </button>

              <Link
                to="/cart"
                className="flex-1 text-center py-3 px-6 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Ver carrito
              </Link>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <p>- Envío gratis en compras mayores a $50</p>
              <p>- Garantía de devolución de 30 días</p>
              <p>- Atención al cliente 24/7</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <Icon icon={faArrowLeft}/>
          Volver a la tienda
        </Link>
      </div>
    </div>
  );
}

export default ProductDetail;
