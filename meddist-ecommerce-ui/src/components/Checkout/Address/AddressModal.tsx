/** @format */

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./AddressModal.module.css"; // Ensure to create this CSS module

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    fullName: string;
    telephone: string;
    cep: string;
    address: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
  };
}

const addressSchema = Yup.object().shape({
  fullName: Yup.string().required("Nome completo é obrigatório"),
  telephone: Yup.string().required("Telefone é obrigatório"),
  cep: Yup.string().required("CEP é obrigatório"),
  address: Yup.string().required("Endereço é obrigatório"),
  number: Yup.string().required("Número é obrigatório"),
  neighborhood: Yup.string().required("Bairro é obrigatório"),
  city: Yup.string().required("Cidade é obrigatória"),
  state: Yup.string().required("Estado é obrigatória"),
});

const AddressModal: React.FC<Props> = ({ isOpen, onClose, initialData }) => {
  if (!isOpen) return null;

  const initialValues = {
    fullName: initialData?.fullName || "",
    telephone: initialData?.telephone || "",
    cep: initialData?.cep || "",
    address: initialData?.address || "",
    number: initialData?.number || "",
    complement: initialData?.complement || "",
    neighborhood: initialData?.neighborhood || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    console.log("Form Values:", values);
    // Here you would handle form submission to the server
    onClose(); // Close modal on successful submission
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h2 className={styles.title}>
          {initialData ? "Editar Endereço" : "Adicionar Endereço"}
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={addressSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className={styles.form}>
              <label htmlFor="fullName">Nome completo (nome e sobrenome)</label>
              {touched.fullName && errors.fullName && (
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className={styles.errorMessage}
                />
              )}
              <Field type="text" id="fullName" name="fullName" />

              <label htmlFor="telephone">Telefone</label>
              {touched.telephone && errors.telephone && (
                <ErrorMessage
                  name="telephone"
                  component="div"
                  className={styles.errorMessage}
                />
              )}
              <Field type="tel" id="telephone" name="telephone" />

              <label htmlFor="cep">CEP</label>
              {touched.cep && errors.cep && (
                <ErrorMessage
                  name="cep"
                  component="div"
                  className={styles.errorMessage}
                />
              )}
              <Field type="text" id="cep" name="cep" />

              <label htmlFor="address">Endereço</label>
              {touched.address && errors.address && (
                <ErrorMessage
                  name="address"
                  component="div"
                  className={styles.errorMessage}
                />
              )}
              <Field type="text" id="address" name="address" />

              <label htmlFor="number">Número da residência</label>
              {touched.number && errors.number && (
                <ErrorMessage
                  name="number"
                  component="div"
                  className={styles.errorMessage}
                />
              )}
              <Field type="text" id="number" name="number" />

              <label htmlFor="complement">Complemento (opcional)</label>
              <Field type="text" id="complement" name="complement" />

              <label htmlFor="neighborhood">Bairro</label>
              {touched.neighborhood && errors.neighborhood && (
                <ErrorMessage
                  name="neighborhood"
                  component="div"
                  className={styles.errorMessage}
                />
              )}
              <Field type="text" id="neighborhood" name="neighborhood" />

              <label htmlFor="city">Cidade</label>
              {touched.city && errors.city && (
                <ErrorMessage
                  name="city"
                  component="div"
                  className={styles.errorMessage}
                />
              )}
              <Field type="text" id="city" name="city" />

              <label htmlFor="state">Estado</label>
              {touched.state && errors.state && (
                <ErrorMessage
                  name="state"
                  component="div"
                  className={styles.errorMessage}
                />
              )}
              <Field type="text" id="state" name="state" />

              <button type="submit" className={styles.submitButton}>
                Salvar Endereço
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddressModal;
