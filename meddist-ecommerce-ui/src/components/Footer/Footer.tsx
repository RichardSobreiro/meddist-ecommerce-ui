/** @format */

// components/Footer/index.tsx
import styles from "./Footer.module.css";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const socialIconsSize = 100;
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLinks}>
          <Link href="/termos-de-uso" legacyBehavior>
            <a>Termo de Uso</a>
          </Link>
          <Link href="/portal-da-privacidade" legacyBehavior>
            <a>Portal da Privacidade</a>
          </Link>
          <Link href="/sobre-nos" legacyBehavior>
            <a>Sobre Nós</a>
          </Link>
        </div>
        <div className={styles.footerIcons}>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://s.magecdn.com/social/tc-youtube.svg"
              alt="Youtube"
              width={socialIconsSize}
              height={socialIconsSize}
            />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://s.magecdn.com/social/tc-linkedin.svg"
              alt="LinkedIn"
              width={socialIconsSize}
              height={socialIconsSize}
            />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://s.magecdn.com/social/tc-instagram.svg"
              alt="Instagram"
              width={socialIconsSize}
              height={socialIconsSize}
            />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://s.magecdn.com/social/tc-twitter.svg"
              alt="Twitter"
              width={socialIconsSize}
              height={socialIconsSize}
            />
          </a>
        </div>
      </div>
      <div className={styles.footerCopyright}>
        &copy; {new Date().getFullYear()} MedDist - Todos os Direitos Reservados
      </div>
    </footer>
  );
};

export default Footer;
