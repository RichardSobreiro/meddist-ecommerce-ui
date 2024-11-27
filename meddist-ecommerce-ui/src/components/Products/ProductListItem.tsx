/** @format */
import { Product } from "@/interfaces/Product";
import styles from "./ProductListItem.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addItem, removeFromCart } from "../../features/cart/cartSlice";

interface Props {
  product: Product;
}

const ProductListItem: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartItem = cartItems.find((item) => item.id === product.id);
  const [quantity, setQuantity] = useState<string>(
    cartItem ? String(cartItem.quantity) : "0"
  );

  useEffect(() => {
    if (cartItem) {
      setQuantity(String(cartItem.quantity));
    } else {
      setQuantity("0");
    }
  }, [cartItem]);

  const handleIncrement = () => {
    setQuantity(String(Number(quantity) + 1));
    dispatch(addItem({ ...product, quantity: 1 }));
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) =>
      Number(prevQuantity) > 0 ? String(Number(prevQuantity) - 1) : "0"
    );
    dispatch(removeFromCart(product.id));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Filter the input to allow only digits
    const filteredValue = value.replace(/[^0-9]/g, "");
    setQuantity(filteredValue);
  };

  const handleBlur = () => {
    // Ensure the value is not empty and not less than 0 on blur
    if (!quantity || Number(quantity) < 0) {
      setQuantity("0");
    }
  };

  return (
    <div className={styles.product}>
      <div className={styles.productDetails}>
        <Image
          src={product.imageUrl}
          alt={product.name}
          className={styles.image}
          width={150}
          height={150}
        />
        <h3 className={styles.productNameText}>{product.name}</h3>
      </div>
      <div className={styles.actionsContainer}>
        <p className={styles.productPriceText}>R$ {product.price.toFixed(2)}</p>
        <div className={styles.actionsAddRemove}>
          <button onClick={handleDecrement} className={styles.actionButton}>
            <FontAwesomeIcon icon={faMinus} size="2x" />
          </button>
          <input
            type="text" // Changed to 'text' to allow for empty string and custom validation
            className={styles.quantityInput}
            value={quantity}
            onChange={handleChange}
            onBlur={handleBlur} // Validate on blur
          />
          <button onClick={handleIncrement} className={styles.actionButton}>
            <FontAwesomeIcon icon={faPlus} size="2x" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;
