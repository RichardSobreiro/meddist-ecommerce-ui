/** @format */

import React from "react";
import Link from "next/link";

import { PaginationProps } from "../../interfaces/Product";
import styles from "./Products.module.css";
import ProductListItem from "./ProductListItem";

const ProductList: React.FC<PaginationProps> = ({ products, page, total }) => {
  const totalPages = Math.ceil(total / 9);

  return (
    <div className={styles.container}>
      <div className={styles.listContainer}>
        {products?.map((product) => (
          <ProductListItem product={product} key={product.id} />
        ))}
      </div>
      <div className={styles.pagination}>
        {page > 1 && (
          <Link href={`/?page=${page - 1}`} passHref legacyBehavior>
            <a className={styles.link}>Previous</a>
          </Link>
        )}
        {page < totalPages && (
          <Link href={`/?page=${page + 1}`} passHref legacyBehavior>
            <a className={styles.link}>Next</a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProductList;
