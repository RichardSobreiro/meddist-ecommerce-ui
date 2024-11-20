/** @format */

import ClickableText from "../general/ClickableText";
import styles from "./DeliveryAddress.module.css";

const DeliveryAddress: React.FC = () => {
  const handleChangeDeliveryAddress = () => {};

  return (
    <div className={styles.content}>
      <p className={styles.address}>Entrega será feita em Rua Oligisto, 99</p>
      <p className={styles.address}>Santa Tereza, Belo Horizonte</p>
      <ClickableText
        text="Alterar Endereço"
        onClick={handleChangeDeliveryAddress}
        className={"small_secondary"} // Example of setting a specific height
      />
    </div>
  );
};

export default DeliveryAddress;
