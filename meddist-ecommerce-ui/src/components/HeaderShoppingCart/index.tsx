/** @format */

import styles from "./ShoppingCart.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useDevice } from "@/context/DeviceContext";
import { useAppSelector } from "../../store/hooks";

const ShoppingCart: React.FC = () => {
  const { isMobile } = useDevice();
  const totalItems = useAppSelector((state) => state.cart.totalItems);
  return (
    <Link href="/carrinho-de-compras" legacyBehavior>
      <div className={styles.content}>
        <FontAwesomeIcon icon={faCartShopping} size={"2x"} />
        <span className={styles.badge}>{totalItems}</span>
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
