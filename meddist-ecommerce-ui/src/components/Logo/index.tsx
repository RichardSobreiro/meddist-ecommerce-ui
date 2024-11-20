/** @format */

import Link from "next/link";
import Image from "next/image";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <Link href="/" passHref>
      <Image
        src="/images/logo.jpg"
        alt="MEDDIST"
        height={100}
        width={100}
        className={styles.logo}
      />
    </Link>
  );
};

export default Logo;
