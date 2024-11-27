/** @format */

import { CartItem } from "@/interfaces/CartItem";
import styles from "./ShoppingCartSummaryItem.module.css";
import {
  addItem,
  removeFromCart,
  updateItemQuantity,
} from "../../features/cart/cartSlice";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

interface Props {
  item: CartItem;
}

const ShoppingCartSummaryItem: React.FC<Props> = ({ item }) => {
  const [quantity, setQuantity] = useState<string>(item.quantity + "");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const numQuantity = Number(quantity);
    if (numQuantity >= 0) {
      dispatch(updateItemQuantity({ ...item, quantity: +quantity }));
    }
  }, [quantity, dispatch, item.id, item]);

  const handleIncrement = () => {
    setQuantity(String(Number(quantity) + 1));
    dispatch(addItem({ ...item, quantity: 1 }));
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) =>
      Number(prevQuantity) > 0 ? String(Number(prevQuantity) - 1) : "0"
    );
    dispatch(removeFromCart(item.id));
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
  );
};

export default ShoppingCartSummaryItem;
