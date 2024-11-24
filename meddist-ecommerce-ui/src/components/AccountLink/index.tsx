/** @format */

import { useDevice } from "@/context/DeviceContext";
import ClickableText from "../general/ClickableText";
import styles from "./AccountLink.module.css";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

const AccountLink = () => {
  const handleLogin = () => {};
  const { isMobile } = useDevice();
  return (
    <div className={styles.content}>
      <ClickableText
        text={isMobile ? "Entrar" : "Olá, faça seu login"}
        onClick={handleLogin}
        className={"small_secondary"} // Example of setting a specific height
        icon={faRightToBracket}
      />
    </div>
  );
};

export default AccountLink;
