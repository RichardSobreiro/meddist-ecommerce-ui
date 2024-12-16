/** @format */

import React from "react";
import styles from "./OrderSummary.module.css";
import { useAppSelector } from "@/store/hooks";

const OrderSummary: React.FC = () => {
  const items = useAppSelector((state) => state.cart.items);
  return (
    <div className={styles.summary}>
      <h3>Resumo do Pedido</h3>
      {/* <p>
        Itens: R$&nbsp;{" "}
        {items
          .reduce((total, item) => total + item.price * item.quantity, 0)
          .toFixed(2)}
      </p> */}
      <p>Frete e manuseio: R$&nbsp;{"0,00"}</p>
      <p>
        Total do pedido: R$&nbsp;
        {items
          .reduce((total, item) => total + item.price * item.quantity, 0)
          .toFixed(2)}
      </p>
      <button className={styles.confirmButton}>Confirmar pedido</button>
    </div>
  );
};

export default OrderSummary;
