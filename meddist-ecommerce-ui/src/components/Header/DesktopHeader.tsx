/** @format */

import Logo from "../Logo";
import SearchBar from "../SearchBar";
import AccountLink from "../AccountLink";
import ShoppingCart from "../ShoppingCart";
import styles from "./DesktopHeader.module.css";
import DeliveryAddress from "./DeliveryAddress";

const DesktopHeader: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <Logo />
        <DeliveryAddress />
        <SearchBar />
        <AccountLink />
        <ShoppingCart />
      </div>
    </div>
  );
};

export default DesktopHeader;
