/** @format */

import React from "react";
import Image from "next/image";
import styles from "./ProductItem.module.css";
import { CartItem } from "@/interfaces/CartItem";

interface ProductProps {
  cartItem: CartItem;
}

const ProductItem: React.FC<ProductProps> = ({ cartItem }) => {
  const deliveryDate = new Date();
  return (
    <div className={styles.product}>
      <Image
        src={cartItem.imageUrl}
        alt={cartItem.name}
        className={styles.productImage}
        width={150}
        height={150}
      />
      <div className={styles.productDetails}>
        <h3>{cartItem.name}</h3>
        <p>{cartItem.name}</p>
        <p>Preço: R$ {cartItem.price.toFixed(2)}</p>
        <p>Chega em {deliveryDate.toLocaleDateString()}</p>
        <p>Quantidade: {cartItem.quantity}</p>
        <p>Total: R$ {(cartItem.price * cartItem.quantity).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductItem;
