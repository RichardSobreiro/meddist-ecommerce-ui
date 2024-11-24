/** @format */

import React, { useEffect, useRef, useState } from "react";
import styles from "./SearchBar.module.css";
import Link from "next/link";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pageClickEvent = (e: MouseEvent) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(!isOpen);
      }
    };

    if (isOpen) {
      window.addEventListener("click", pageClickEvent);
    }

    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [isOpen]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className={styles.form}>
      <div className={styles.dropdown} ref={dropdownRef}>
        <button onClick={toggle} className={styles.dropdownbutton}>
          Todos
        </button>
        {isOpen && (
          <div className={`${styles.content} ${isOpen ? styles.open : ""}`}>
            <Link href="/" legacyBehavior>
              <div className={styles.item}>
                <p>Insumos Hospitalares</p>
                <p className={styles.itemDescription}>
                  Luvas, máscaras, toucas, abaixador de língua, etc...
                </p>
              </div>
            </Link>
            <Link href="/" legacyBehavior>
              <div className={styles.item}>
                <p>Materiais Permanentes</p>
                <p className={styles.itemDescription}>
                  Aparelhos de pressão, tesouras, glicosímetro, etc...
                </p>
              </div>
            </Link>
            <Link href="/" legacyBehavior>
              <div className={styles.item}>
                <p>Medicamentos</p>
                <p className={styles.itemDescription}>
                  Ácido Acetilsalicílico, Amoxilina, Diclofenaco, Soro
                  fisiológico, etc...
                </p>
              </div>
            </Link>
            <Link href="/" legacyBehavior>
              <div className={styles.item}>
                <p>Textil</p>
                <p className={styles.itemDescription}>
                  Algodão, Ataduras, campo operatório, gorros, compressas,
                  etc...
                </p>
              </div>
            </Link>
            <Link href="/" legacyBehavior>
              <div className={styles.item}>
                <p>Saneantes</p>
                <p className={styles.itemDescription}>
                  Ácido Fosforico, Água Oxigenada, Álcool, Glicerina, Formol,
                  etc...
                </p>
              </div>
            </Link>
            <Link href="/" legacyBehavior>
              <div className={styles.item}>
                <p>Controlados</p>
                <p className={styles.itemDescription}>
                  Alprazolam, Clomipramina, Codeína, Paracetamol, Propofol,
                  etc...
                </p>
              </div>
            </Link>
          </div>
        )}
      </div>
      <input
        type="text"
        placeholder="Buscar produtos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
