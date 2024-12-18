/** @format */

import { Address } from "@/interfaces/Address";
import styles from "./AddressSummary.module.css";

interface Props {
  address: Address;
  updateAddressHandler: (address: Address) => void;
  removeAddressHandler: () => void;
}

const AddressSummary: React.FC<Props> = ({
  address,
  updateAddressHandler,
  removeAddressHandler,
}) => {
  return (
    <div className={styles.section}>
      <div className={styles.header}></div>
      <p>
        {address.address} {address.number}, {address.neighborhood},{" "}
        {address.city}, {address.state} - {address.cep}
      </p>
      {address.complement && <p>{address.complement}</p>}
      <div className={styles.actionsContainer}>
        <button
          className={styles.removeButton}
          onClick={() => removeAddressHandler()}
        >
          Remover
        </button>
        <button
          className={styles.alterButton}
          onClick={() => updateAddressHandler(address)}
        >
          Alterar
        </button>
      </div>
    </div>
  );
};

export default AddressSummary;
