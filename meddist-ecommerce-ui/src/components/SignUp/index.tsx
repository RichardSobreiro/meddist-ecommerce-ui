/** @format */
import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import styles from "./SignUp.module.css";
import InputMask from "react-input-mask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface FormValues {
  fullName: string;
  telephone: string;
  email: string;
  cpf: string;
  cnpj: string;
  companySocialReason: string;
  cep: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

const signUpSchema = Yup.object().shape({
  fullName: Yup.string().required("Nome completo é obrigatório"),
  telephone: Yup.string().required("Telefone é obrigatório"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  cpf: Yup.string().required("CPF é obrigatório"),
  cnpj: Yup.string().required("CNPJ é obrigatório"),
  companySocialReason: Yup.string().required("Razão Social é obrigatório"),
  cep: Yup.string().required("CEP é obrigatório"),
  address: Yup.string().required("Endereço é obrigatório"),
  number: Yup.string().required("Número é obrigatório"),
  neighborhood: Yup.string().required("Bairro é obrigatório"),
  city: Yup.string().required("Cidade é obrigatória"),
  state: Yup.string().required("Estado é obrigatória"),
});

const SignUp: React.FC = () => {
  const initialValues: FormValues = {
    fullName: "",
    telephone: "",
    email: "",
    cpf: "",
    cnpj: "",
    companySocialReason: "",
    cep: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  };

  const handleAddAddress = () => {};

  const handleSubmit = async (values: FormValues) => {
    console.log("Form Values:", values);
    // Here you would handle form submission to the server
  };
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.titlePage}>Criar Conta</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={signUpSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className={styles.form}>
              <div className={styles.formColumn}>
                <h3 className={styles.title}>Dados Pessoais</h3>
                <label htmlFor="fullName">Nome completo</label>
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
                <Field type="tel" id="telephone" name="telephone">
                  {({ field }: FieldProps<string, FormValues>) => (
                    <InputMask
                      {...field}
                      mask="(99) 99999-9999"
                      onChange={(e) => {
                        setFieldValue("telephone", e.target.value);
                      }}
                      type="tel"
                      id="telephone"
                      className={styles.input}
                      maskChar={null}
                    />
                  )}
                </Field>

                <label htmlFor="email">Email</label>
                {touched.email && errors.email && (
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={styles.errorMessage}
                  />
                )}
                <Field type="email" id="email" name="email" />

                <label htmlFor="cpf">CPF</label>
                <Field name="cpf">
                  {({ field }: FieldProps<string, FormValues>) => (
                    <InputMask
                      {...field}
                      mask="999.999.999-99"
                      onChange={(e) => {
                        setFieldValue("cpf", e.target.value);
                      }}
                      type="text"
                      id="cpf"
                      className={styles.input}
                      maskChar={null}
                    />
                  )}
                </Field>
              </div>

              <div className={styles.formColumn}>
                <h3 className={styles.title}>Dados da Empresa</h3>
                <label htmlFor="cnpj">CNPJ</label>
                {touched.cnpj && errors.cnpj && (
                  <ErrorMessage
                    name="cnpj"
                    component="div"
                    className={styles.errorMessage}
                  />
                )}
                <Field type="text" id="cnpj" name="cnpj">
                  {({ field }: FieldProps<string, FormValues>) => (
                    <InputMask
                      {...field}
                      mask="99.999.999/9999-99"
                      onChange={(e) => {
                        setFieldValue("cnpj", e.target.value);
                      }}
                      type="text"
                      id="cnpj"
                      className={styles.input}
                      maskChar={null}
                    />
                  )}
                </Field>

                <label htmlFor="companySocialReason">Razão Social</label>
                {touched.companySocialReason && errors.companySocialReason && (
                  <ErrorMessage
                    name="companySocialReason"
                    component="div"
                    className={styles.errorMessage}
                  />
                )}
                <Field
                  type="tel"
                  id="companySocialReason"
                  name="companySocialReason"
                />
              </div>

              <div className={styles.formColumn}>
                <h3 className={styles.title}>Endereços</h3>
                <button
                  onClick={handleAddAddress}
                  className={styles.actionButton}
                  type="button"
                >
                  <FontAwesomeIcon icon={faPlus} size="2x" />
                </button>
              </div>

              {/* <button type="submit" className={styles.submitButton}>
              Salvar Endereço
            </button> */}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default SignUp;
