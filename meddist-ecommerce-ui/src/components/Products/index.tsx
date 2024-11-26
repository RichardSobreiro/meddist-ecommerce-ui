/** @format */

import React from "react";
import Link from "next/link";

import { PaginationProps } from "../../interfaces/Product";
import styles from "./Products.module.css";
import ProductListItem from "./ProductListItem";

const getPageNumbers = (currentPage: number, totalPages: number) => {
  const pages = [];
  const maxPagesToShow = 10;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  // Adjust the start page if we're close to the end
  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
};

const ProductList: React.FC<PaginationProps> = ({ products, page, total }) => {
  const totalPages = Math.ceil(total / 9);
  const pageNumbers = getPageNumbers(page, totalPages);

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
            <a className={styles.link}>Anterior</a>
          </Link>
        )}
        {pageNumbers.map((num) => (
          <Link key={num} href={`/?page=${num}`} passHref legacyBehavior>
            <a
              className={
                styles.link + (num === page ? ` ${styles.active}` : "")
              }
            >
              {num}
            </a>
          </Link>
        ))}
        {page < totalPages && (
          <Link href={`/?page=${page + 1}`} passHref legacyBehavior>
            <a className={styles.link}>Próxima</a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProductList;
