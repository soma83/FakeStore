import {Link} from 'react-router-dom';
import {useCart} from '../context/CartContext';
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faCartShopping, faPlus, faMinus, faLightbulb} from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const {cart, dispatch} = useCart();

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch({type: 'REMOVE', id});
    } else {
      dispatch({type: 'UPDATE', id, quantity: newQuantity});
    }
  };

  const removeItem = (id: number) => {
    dispatch({type: 'REMOVE', id});
  };

  const clearCart = () => {
    dispatch({type: 'CLEAR'});
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <Icon icon={faCartShopping} className="text-[72px] text-gray-500 mb-4"/>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h1>
          <p className="text-gray-600 mb-6">
            ¡Agrega algunos productos a tu carrito!
          </p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            Continuar comprando
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Carrito de compras ({cart.length} {cart.length === 1 ? 'artículo' : 'artículos'})
        </h1>
        <button
          onClick={clearCart}
          className="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          Vaciar carrito
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md">
            {cart.map((item, index) => (
              <div key={item.id}>
                <div className="p-6 flex items-center space-x-4">
                  <div className="flex-shrink-0 w-20 h-20">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain rounded"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      ${item.price.toFixed(2)} c/u
                    </p>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Icon icon={faMinus}/>
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Icon icon={faPlus}/>
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-800 text-sm mt-1"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
                {index < cart.length - 1 && <hr className="border-gray-200"/>}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Resumen del pedido
            </h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Envío</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-green-600">¡Gratis!</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>

              {subtotal < 50 && (
                <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
                  <Icon icon={faLightbulb} className="mr-2"/>
                  Agrega ${(50 - subtotal).toFixed(2)} más para envío gratis
                </div>
              )}
            </div>

            <hr className="border-gray-200 mb-4"/>

            <div className="flex justify-between text-lg font-bold mb-6">
              <span>Total</span>
              <span className="text-blue-600">${total.toFixed(2)}</span>
            </div>

            <Link
              to="/checkout"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-center block"
            >
              Proceder al pago
            </Link>

            <Link
              to="/"
              className="w-full text-center py-3 px-4 text-blue-600 hover:text-blue-800 text-sm font-medium block mt-3"
            >
              Continuar comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
