/** @format */

import Image from "next/image";
import styles from "./ShoppingCartSummary.module.css";
import { useAppSelector } from "../../store/hooks"; // Adjust the path as necessary
import ClickableText from "../general/ClickableText";
import { useRouter } from "next/router";
import ShoppingCartSummaryItem from "./ShoppingCartSummaryItem";

const ShoppingCartSummary: React.FC = () => {
  const router = useRouter();

  const items = useAppSelector((state) => state.cart.items);
  const totalItems = useAppSelector((state) => state.cart.totalItems);

  const handleContinueShopping = () => {
    router.push("/"); // Navigate to the home page
  };

  return (
    <>
      <div className={styles.cartContainer}>
        <div className={styles.topHeaderContainer}>
          <h1>Carrinho de Compras</h1>
          <ClickableText
            text={"Continuar comprando"}
            onClick={handleContinueShopping}
            className={"small_primary"} // Example of setting a specific height
          />
        </div>
        {items.length >= 3 && (
          <div className={styles.cartSummary}>
            <h2 className={styles.header2}>
              Subtotal ({totalItems} produtos): R$&nbsp;
              {items
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </h2>
            <button className={styles.checkoutBtn}>Fechar pedido</button>
          </div>
        )}
        <div className={styles.cartItems}>
          {items.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <Image
                src={item.imageUrl}
                alt={item.name}
                className={styles.image}
                width={150}
                height={150}
              />
              <div className={styles.itemInfo}>
                <p className={styles.itemName}>{item.name}</p>
                {item.stockQuantity > 0 ? (
                  <p className={styles.itemStock}>Em estoque</p>
                ) : (
                  <p className={styles.itemNoStock}>Indisponível</p>
                )}
                <ShoppingCartSummaryItem item={item} />
              </div>
              <p className={styles.itemPrice}>
                R$&nbsp;{(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        {items.length > 0 ? (
          <div className={styles.cartSummary}>
            <h2 className={styles.header2}>
              Subtotal ({totalItems} produtos): R$&nbsp;
              {items
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </h2>
            <button className={styles.checkoutBtn}>Fechar pedido</button>
          </div>
        ) : (
          <p className={styles.noItemsText}>Nenhum item adicionado.</p>
        )}
      </div>
    </>
  );
};

export default ShoppingCartSummary;
