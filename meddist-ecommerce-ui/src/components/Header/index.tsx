/** @format */

import Logo from "../Logo";
import SearchBar from "../SearchBar";
import AccountLink from "../AccountLink";
import ShoppingCart from "../ShoppingCart";
import styles from "./Header.module.css";
import DeliveryAddress from "./DeliveryAddress";

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <Logo />
      <DeliveryAddress />
      <SearchBar />
      <AccountLink />
      <ShoppingCart />
    </div>
  );
};

export default Header;
