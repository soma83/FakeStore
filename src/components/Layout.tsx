import {type ReactNode, useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faHome, faCartShopping} from "@fortawesome/free-solid-svg-icons";
import {useCart} from "../context/CartContext";

interface Props {
  children: ReactNode;
}

const Layout = ({children}: Props) => {
  const {cart} = useCart();
  const location = useLocation();
  const [isMinWidth, setIsMinWidth] = useState<boolean>(false);

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const onResize = () => {
      const width = window.innerWidth;
      setIsMinWidth(width <= 390);
    }

    onResize();

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">
            Soma's Store
          </Link>
          <nav className={!isMinWidth ? "space-x-4" : "space-x-1"}>
            <Link
              to="/"
              className={`hover:text-blue-600 ${location.pathname === "/" ? "font-semibold text-blue-600" : ""}`}>
              <Icon icon={faHome} className="mr-2" />
              {!isMinWidth && 'Inicio'}
            </Link>
            <Link
              to="/cart"
              className={`hover:text-blue-600 ${location.pathname === "/cart" ? "font-semibold text-blue-600" : ""}`}>
              <Icon icon={faCartShopping} className="mr-2" />
              {`${!isMinWidth ? `Carrito ` : ''}[${itemCount}]`}
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
        {children}
      </main>

      <footer className="text-center text-sm text-gray-500 py-6">
        &copy; {new Date().getFullYear()} Soma's Store
      </footer>
    </div>
  );
}

export default Layout;
