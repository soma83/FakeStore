import {Dispatch, SetStateAction, useState, memo} from "react";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faCartPlus} from "@fortawesome/free-solid-svg-icons";
import type {ApiProduct} from "../../hooks/useProducts";

interface Props {
  product: ApiProduct;
  addToCart: Dispatch<SetStateAction<ApiProduct>>;
}

const AddBtn = memo(({product, addToCart}: Props) => {
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
    addToCart(product);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  return (
    <button
      onClick={handleAddToCart}
      className={`px-1 py-2 rounded-lg transition-colors text-sm font-medium cursor-pointer min-w-[147px] ${
        addedToCart
          ? 'bg-green-600 text-white'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      {!addedToCart && <Icon icon={faCartPlus} className="mr-2"/>}
      {addedToCart ? '¡Agregado!' : 'Agregar al carrito'}
    </button>
  )
});

export default AddBtn;
