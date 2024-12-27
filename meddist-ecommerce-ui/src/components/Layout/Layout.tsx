/** @format */

import { ReactNode } from "react";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";
import Header from "../Header";

interface Props {
  children: ReactNode;
  noHeader?: boolean;
}

const Layout: React.FC<Props> = ({ children, noHeader }) => {
  return (
    <div className={styles.layout}>
      {!noHeader && <Header />}
      <main className={styles.content}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
