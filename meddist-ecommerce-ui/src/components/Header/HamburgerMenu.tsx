/** @format */

import React, { useState, useEffect, useRef } from "react";
import styles from "./HamburgerMenu.module.css";

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      <button
        className={styles.hamburger}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        &#9776;
      </button>
      <div
        className={`${styles.menu} ${isOpen ? styles.open : ""}`}
        ref={menuRef}
      >
        <ul className={styles.menuList}>
          <li>
            <a href="#" className={styles.menuItemLink}>
              Home
            </a>
          </li>
          <li>
            <a href="#" className={styles.menuItemLink}>
              Services
            </a>
          </li>
          <li>
            <a href="#" className={styles.menuItemLink}>
              About
            </a>
          </li>
          <li>
            <a href="#" className={styles.menuItemLink}>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;
