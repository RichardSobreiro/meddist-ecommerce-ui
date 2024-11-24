/** @format */

import Link from "next/link";
import Image from "next/image";
import styles from "./Logo.module.css";
import { useDevice } from "@/context/DeviceContext";

const Logo = () => {
  const { isMobile } = useDevice();

  return (
    <Link href="/" passHref>
      <Image
        src="/images/logo.jpg"
        alt="MEDDIST"
        height={isMobile ? 50 : 100}
        width={isMobile ? 50 : 100}
        className={styles.logo}
      />
    </Link>
  );
};

export default Logo;
