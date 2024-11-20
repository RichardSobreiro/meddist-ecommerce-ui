/** @format */

import { ReactNode } from "react";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";
import Header from "../Header";

interface Props {
  children: ReactNode; // ReactNode accepts everything React can render
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.content}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
