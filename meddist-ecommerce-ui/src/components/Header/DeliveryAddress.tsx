/** @format */

import ClickableText from "../general/ClickableText";
import styles from "./DeliveryAddress.module.css";

const DeliveryAddress: React.FC = () => {
  const handleChangeDeliveryAddress = () => {};

  return (
    <div className={styles.content}>
      <div className={styles.addressContainer}>
        <p className={styles.address}>Entrega será feita em Rua Oligisto, 99</p>
        <p className={styles.address}>Santa Tereza, Belo Horizonte</p>
      </div>
      <ClickableText
        text="Alterar Endereço"
        onClick={handleChangeDeliveryAddress}
        className={"small_secondary"} // Example of setting a specific height
      />
    </div>
  );
};

export default DeliveryAddress;
