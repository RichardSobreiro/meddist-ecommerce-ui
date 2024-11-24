/** @format */

import styles from "./ShoppingCart.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useDevice } from "@/context/DeviceContext";

interface ShoppingCartProps {
  itemCount: number; // Prop to pass the number of items in the cart
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ itemCount }) => {
  const { isMobile } = useDevice();
  return (
    <Link href="/carrinho-de-compras" legacyBehavior>
      <div className={styles.content}>
        <FontAwesomeIcon icon={faCartShopping} size={"2x"} />
        <span className={styles.badge}>{itemCount}</span>
        <div className={styles.text}>
          {!isMobile && (
            <>
              <p>Carrinho de</p>
              <p>Compras</p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ShoppingCart;
