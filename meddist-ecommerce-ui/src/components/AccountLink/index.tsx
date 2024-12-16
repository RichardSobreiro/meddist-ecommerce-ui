/** @format */

import { useDevice } from "@/context/DeviceContext";
import ClickableText from "../general/ClickableText";
import styles from "./AccountLink.module.css";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const AccountLink = () => {
  const router = useRouter();
  const authContext = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogin = () => {
    router.push("/entrar");
  };

  const { isMobile } = useDevice();
  return (
    <div className={styles.content}>
      {authContext.user == null ? (
        <ClickableText
          text={isMobile ? "Entrar" : "Olá, faça seu login"}
          onClick={handleLogin}
          className={"small_secondary"} // Example of setting a specific height
          icon={faRightToBracket}
        />
      ) : (
        <div
          className={styles.accountDetails}
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <span>Olá, {authContext.user.username}</span>
          {showDropdown && (
            <div className={styles.dropdown}>
              <ul>
                <li onClick={() => router.push("/manage-account")}>
                  Gerenciar Conta
                </li>
                <li onClick={() => router.push("/orders")}>Meus Pedidos</li>
                <li onClick={() => router.push("/addresses")}>
                  Meus Endereços
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountLink;
