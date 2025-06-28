import {createContext, useContext, useReducer, type ReactNode, Dispatch} from "react";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CtxProps {
  children: ReactNode;
}

type Action =
  { type: "ADD"; product: Product; } | { type: "REMOVE"; id: number; } |
  { type: "UPDATE"; id: number; quantity: number; } | { type: "CLEAR"; };

const cartReducer = (state: Product[], action: Action): Product[] => {
  switch (action.type) {
    case "ADD":
      const exists = state.find(p => p.id === action.product.id);
      if (exists) {
        return state.map(p => p.id === action.product.id ? {...p, quantity: p.quantity + 1} : p);
      }
      return [...state, {...action.product, quantity: 1}]
    case "REMOVE":
      return state.filter(p => p.id !== action.id);
    case "UPDATE":
      return state.map(p => p.id === action.id ? {...p, quantity: action.quantity} : p);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

const CartContext = createContext<{ cart: Product[]; dispatch: Dispatch<Action>; }>({
  cart: [],
  dispatch: () => {
  }
});

export const CartProvider = ({children}: CtxProps) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{cart, dispatch}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
