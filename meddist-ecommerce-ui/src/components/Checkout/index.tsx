/** @format */

import React from "react";
import styles from "./Checkout.module.css";
import { useAppSelector } from "../../store/hooks";
import ProductItem from "./ProductItem";
import OrderSummary from "./OrderSummary";
import AddressSummary from "./Address";

const Checkout: React.FC = () => {
  const items = useAppSelector((state) => state.cart.items);
  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.header}>
        <h1>Finalizar Compra Segura</h1>
      </div>
      <div className={styles.purchanseAddrPayContainer}>
        <div className={styles.checkoutContainerMain}>
          <AddressSummary />

          <div className={styles.section}>
            <div className={styles.header}>
              Pagando com Mastercard 3990
              <button className={styles.alterButton}>Alterar</button>
            </div>
            <p>Escolha em quantas vezes parcelar</p>
            <p>Use um vale-presente ou código promocional</p>
          </div>
        </div>
        <div className={styles.checkoutContainerSide}>
          <div
            className={styles.section}
            style={{ backgroundColor: "#f5f5f5" }}
          >
            <div className={styles.summaryHeader}>
              <span>Itens: R$2,274.81</span>
              <span>Frete e manuseio: R$0.00</span>
              <span>Total do pedido: R$2,274.81</span>
            </div>
            <button className={styles.confirmButton}>Confirmar pedido</button>
          </div>
        </div>
      </div>
      {items.length > 0 ? (
        items.map((item) => <ProductItem key={item.id} cartItem={item} />)
      ) : (
        <p>Carrinho vazio</p>
      )}
      <OrderSummary />
    </div>
  );
};

export default Checkout;
