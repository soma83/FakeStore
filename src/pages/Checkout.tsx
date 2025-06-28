import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useCart} from "../context/CartContext";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";

const Checkout = () => {
  const {cart, dispatch} = useCart();
  const [isCompleted, setIsCompleted] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleFinalizePurchase = () => {
    dispatch({type: 'CLEAR'});
    setIsCompleted(true);
  };

  if (cart.length === 0 && !isCompleted) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
        <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
          Continuar comprando
        </Link>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="text-center py-12">
        <div className="text-green-600 text-6xl mb-4">
          <Icon icon={faCheckCircle} />
        </div>
        <h1 className="text-2xl font-bold mb-4">¡Compra exitosa!</h1>
        <p className="mb-6">Gracias por tu compra</p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          onClick={() => setIsCompleted(false)}
        >
          Continuar comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Confirmación de compra</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Resumen del pedido</h2>

        <ul className="space-y-2 mb-4">
          {cart.map(item => (
            <li key={item.id} className="flex justify-between">
              <span>{item.title} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <hr className="my-4"/>

        <div className="flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleFinalizePurchase}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 font-semibold"
        >
          Finalizar compra
        </button>

        <Link to="/cart" className="block w-full text-center py-3 px-4 border border-gray-300 rounded hover:bg-gray-50">
          Volver al carrito
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
