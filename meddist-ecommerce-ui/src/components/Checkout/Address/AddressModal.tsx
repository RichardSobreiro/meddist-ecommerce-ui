/** @format */

import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import styles from "./AddressModal.module.css";
import axios from "axios";
import InputMask from "react-input-mask"; // Ensure InputMask is installed
import { Address } from "@/interfaces/Address";

const brazilianStates = [
  { label: "AC", value: "Acre" },
  { label: "AL", value: "Alagoas" },
  { label: "AP", value: "Amapá" },
  { label: "AM", value: "Amazonas" },
  { label: "BA", value: "Bahia" },
  { label: "CE", value: "Ceará" },
  { label: "DF", value: "Distrito Federal" },
  { label: "ES", value: "Espírito Santo" },
  { label: "GO", value: "Goiás" },
  { label: "MA", value: "Maranhão" },
  { label: "MT", value: "Mato Grosso" },
  { label: "MS", value: "Mato Grosso do Sul" },
  { label: "MG", value: "Minas Gerais" },
  { label: "PA", value: "Pará" },
  { label: "PB", value: "Paraíba" },
  { label: "PR", value: "Paraná" },
  { label: "PE", value: "Pernambuco" },
  { label: "PI", value: "Piauí" },
  { label: "RJ", value: "Rio de Janeiro" },
  { label: "RN", value: "Rio Grande do Norte" },
  { label: "RS", value: "Rio Grande do Sul" },
  { label: "RO", value: "Rondônia" },
  { label: "RR", value: "Roraima" },
  { label: "SC", value: "Santa Catarina" },
  { label: "SP", value: "São Paulo" },
  { label: "SE", value: "Sergipe" },
  { label: "TO", value: "Tocantins" },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (address: Address) => void;
  initialData?: {
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
  cep: Yup.string().required("CEP é obrigatório"),
  address: Yup.string().required("Endereço é obrigatório"),
  number: Yup.string().required("Número é obrigatório"),
  neighborhood: Yup.string().required("Bairro é obrigatório"),
  city: Yup.string().required("Cidade é obrigatória"),
  state: Yup.string().required("Estado é obrigatória"),
});

const AddressModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  if (!isOpen) return null;

  const initialValues = {
    cep: initialData?.cep || "",
    address: initialData?.address || "",
    number: initialData?.number || "",
    complement: initialData?.complement || "",
    neighborhood: initialData?.neighborhood || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  const fetchCepData = async (cep: string, setFieldValue: Function) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;
      if (!data.erro) {
        setFieldValue("address", data.logradouro);
        setFieldValue("neighborhood", data.bairro);
        setFieldValue("city", data.localidade);
        setFieldValue("state", data.uf);
        setFieldValue("complement", data.complemento);
      }
    } catch (error) {
      console.error("Error fetching CEP data:", error);
    }
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
          onSubmit={(values, actions) => {
            onSave?.(values);
            onClose();
            actions.setSubmitting(false);
          }}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className={styles.form}>
              <label htmlFor="cep">CEP</label>
              <Field name="cep">
                {({ field }: FieldProps<string, Address>) => (
                  // eslint-disable-next-line react/jsx-no-undef
                  <InputMask
                    {...field}
                    mask="99999-999"
                    maskChar=" "
                    onChange={(e) => {
                      setFieldValue("cep", e.target.value);
                      if (e.target.value.replace(/[^0-9]/g, "").length === 8) {
                        fetchCepData(e.target.value, setFieldValue);
                      }
                    }}
                  />
                )}
              </Field>
              {touched.cep && errors.cep && (
                <ErrorMessage
                  name="cep"
                  component="div"
                  className={styles.errorMessage}
                />
              )}
              {/* <Field type="text" id="cep" name="cep" /> */}

              <label htmlFor="address">Endereço</label>
              {touched.address && errors.address && (
                <ErrorMessage
                  name="address"
                  component="div"
                  className={styles.errorMessage}
                />
              )}
              <Field type="text" id="address" name="address" />

              <label htmlFor="number">Número</label>
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
              <Field
                as="select"
                name="state"
                id="state"
                className={styles.select}
              >
                {brazilianStates.map((state) => (
                  <option key={state.label} value={state.label}>
                    {state.value}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="state"
                component="div"
                className={styles.errorMessage}
              />

              {initialData ? (
                <div className={styles.actionsContainer}>
                  <button
                    type="button"
                    className={`${styles.submitButton} ${styles.buttonNegative}`}
                    onClick={() => {
                      onClose();
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className={`${styles.submitButton} ${styles.buttonPositive}`}
                  >
                    Salvar
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  className={`${styles.submitButton} ${styles.buttonPositive}`}
                >
                  {onSave ? "Adicionar" : "Salvar Endereço"}
                </button>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddressModal;
