/** @format */

import { useState } from "react";
import styles from "./AddressSummary.module.css";
import AddressModal from "./AddressModal";

const AddressSummary: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        Entrega para Richard
        <button
          className={styles.alterButton}
          onClick={() => setModalOpen(true)}
        >
          Alterar
        </button>
      </div>
      <p>
        Rua Olígio 99, Apto 301 Santa Tereza, Belo Horizonte, MG, 31010430,
        Brasil
      </p>
      <button className={styles.alterButton}>
        Adicionar instruções de entrega
      </button>
      <AddressModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default AddressSummary;
