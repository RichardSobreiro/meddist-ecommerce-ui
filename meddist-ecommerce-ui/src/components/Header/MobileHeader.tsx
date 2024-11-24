/** @format */

import styles from "./MobileHeader.module.css";
import HamburgerMenu from "./HamburgerMenu";
import Logo from "../Logo";
import AccountLink from "../AccountLink";
import ShoppingCart from "../ShoppingCart";

const MobileHeader: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerSideContainer}>
        <HamburgerMenu />
        <Logo />
      </div>
      <div className={styles.headerSideContainer}>
        <AccountLink />
        <ShoppingCart itemCount={0} />
      </div>
    </div>
  );
};

export default MobileHeader;
