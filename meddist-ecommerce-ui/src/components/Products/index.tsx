/** @format */

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PaginationProps } from "../../interfaces/Product";
import styles from "./Products.module.css";

const ProductList: React.FC<PaginationProps> = ({ products, page, total }) => {
  const totalPages = Math.ceil(total / 10);

  return (
    <div className={styles.container}>
      {products?.map((product) => (
        <div key={product.id} className={styles.product}>
          <Image
            src={product.imageUrl}
            alt={product.name}
            className={styles.image}
            width={200}
            height={200}
          />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price.toFixed(2)}</p>
        </div>
      ))}
      <div className={styles.pagination}>
        {page > 1 && (
          <Link href={`/?page=${page - 1}`} passHref>
            <a className={styles.link}>Previous</a>
          </Link>
        )}
        {page < totalPages && (
          <Link href={`/?page=${page + 1}`} passHref>
            <a className={styles.link}>Next</a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProductList;
