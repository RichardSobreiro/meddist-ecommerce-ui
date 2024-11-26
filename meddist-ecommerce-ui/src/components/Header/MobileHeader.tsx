/** @format */

import styles from "./MobileHeader.module.css";
import HamburgerMenu from "./HamburgerMenu";
import Logo from "../Logo";
import AccountLink from "../AccountLink";
import ShoppingCart from "../ShoppingCart";
import SearchBar from "../SearchBar";
import DeliveryAddress from "./DeliveryAddress";

const MobileHeader: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerTop}>
        <div className={styles.headerSideContainer}>
          <HamburgerMenu />
          <Logo />
        </div>
        <div className={styles.headerSideContainer}>
          <AccountLink />
          <ShoppingCart />
        </div>
      </div>
      <div className={styles.headerBottom}>
        <SearchBar />
        <DeliveryAddress />
      </div>
    </div>
  );
};

export default MobileHeader;
