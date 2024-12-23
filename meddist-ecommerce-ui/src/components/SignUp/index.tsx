/** @format */
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import styles from "./SignUp.module.css";
import InputMask from "react-input-mask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddressModal from "../Checkout/Address/AddressModal";
import AddressSummary from "./AddressSummary";
import { Address } from "@/interfaces/Address";
import { UserAcount } from "@/interfaces/UserAccount";
import { useRouter } from "next/router";
import { registerUser } from "@/services/userAPI";
import { useSpinner } from "@/context/SpinnerContext ";
import { useToast } from "@/context/ToastContext";

const initialValues: UserAcount = {
  fullName: "",
  username: "",
  password: "",
  passwordConfirmation: "",
  telephone: "",
  email: "",
  cpf: "",
  cnpj: "",
  companySocialReason: "",
  addresses: [],
};

const signUpSchema = Yup.object().shape({
  fullName: Yup.string().required("Nome completo é obrigatório"),
  username: Yup.string().required("Nome de usuário é obrigatório"),
  password: Yup.string()
    .required("Senha é obrigatória")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Senha deve conter ao menos 8 caracteres, uma letra maiúscula, uma letra minúscula, e um caractere especial."
    ),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password")], "As senhas devem coincidir")
    .required("Confirmação de senha é obrigatória"),
  telephone: Yup.string().required("Telefone é obrigatório"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  cpf: Yup.string().required("CPF é obrigatório"),
  cnpj: Yup.string().required("CNPJ é obrigatório"),
  companySocialReason: Yup.string().required("Razão Social é obrigatório"),
  addresses: Yup.array().of(
    Yup.object().shape({
      cep: Yup.string().required("CEP é obrigatório"),
      address: Yup.string().required("Endereço é obrigatório"),
      number: Yup.string().required("Número é obrigatório"),
      neighborhood: Yup.string().required("Bairro é obrigatório"),
      city: Yup.string().required("Cidade é obrigatória"),
      state: Yup.string().required("Estado é obrigatória"),
    })
  ),
});

const SignUp: React.FC = () => {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<UserAcount>(initialValues);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { showSpinner, hideSpinner } = useSpinner();
  const { addToast } = useToast();

  const handleSaveAddress = (address: Address) => {
    if (editIndex !== null) {
      // Update the existing address
      const updatedAddresses = formData.addresses.map((item, index) =>
        index === editIndex ? address : item
      );
      setFormData({ ...formData, addresses: updatedAddresses });
    } else {
      // Add a new address
      setFormData({
        ...formData,
        addresses: [...formData.addresses, address],
      });
    }
    setModalOpen(false);
    setEditIndex(null);
    addToast("Endereço adicionado!", "success");
  };

  const handleEditAddress = (index: number) => {
    setEditIndex(index);
    setModalOpen(true);
  };

  const handleRemoveAddress = (index: number) => {
    const updatedAddresses = formData.addresses.filter(
      (_, idx) => idx !== index
    );
    setFormData({ ...formData, addresses: updatedAddresses });
    addToast("Endereço removido!", "success");
  };

  const handleSubmit = async (values: UserAcount) => {
    try {
      showSpinner();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordConfirmation, ...registrationData } = {
        ...values,
        addresses: formData.addresses,
      };
      console.log("Form Values:", registrationData);
      const result = await registerUser(registrationData);
      console.log("Registration Successful:", result);
      setSuccessMessage(
        "Registro bem-sucedido! Verifique seu email para confirmar sua conta."
      );
    } catch (error) {
      if (error instanceof Error) {
        addToast(error.message, "error");
      }
    } finally {
      hideSpinner();
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h2 className={styles.titlePage}>
            {successMessage ? (
              <p>Aguardando Confirmação do Email</p>
            ) : (
              "Criar Conta"
            )}
          </h2>
        </div>
        {successMessage ? (
          <div className={styles.successMessage}>{successMessage}</div>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={signUpSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <div className={styles.form}>
                  <div className={styles.formColumn}>
                    <h3 className={styles.title}>Dados da Conta</h3>

                    <label htmlFor="username">Nome de usuário</label>
                    <Field type="text" id="username" name="username" />
                    {touched.username && errors.username && (
                      <ErrorMessage
                        name="username"
                        component="div"
                        className={styles.errorMessage}
                      />
                    )}

                    <label htmlFor="password">Senha</label>
                    <Field type="password" id="password" name="password" />
                    {touched.password && errors.password && (
                      <ErrorMessage
                        name="password"
                        component="div"
                        className={styles.errorMessage}
                      />
                    )}

                    <label htmlFor="password">Confirmação da Senha</label>
                    <Field
                      type="password"
                      id="passwordConfirmation"
                      name="passwordConfirmation"
                    />
                    {touched.passwordConfirmation &&
                      errors.passwordConfirmation && (
                        <ErrorMessage
                          name="passwordConfirmation"
                          component="div"
                          className={styles.errorMessage}
                        />
                      )}
                  </div>

                  <div className={styles.formColumn}>
                    <h3 className={styles.title}>Dados Pessoais</h3>
                    <label htmlFor="fullName">Nome completo</label>
                    <Field type="text" id="fullName" name="fullName" />
                    {touched.fullName && errors.fullName && (
                      <ErrorMessage
                        name="fullName"
                        component="div"
                        className={styles.errorMessage}
                      />
                    )}

                    <label htmlFor="telephone">Telefone</label>
                    <Field type="tel" id="telephone" name="telephone">
                      {({ field }: FieldProps<string, UserAcount>) => (
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
                    {touched.telephone && errors.telephone && (
                      <ErrorMessage
                        name="telephone"
                        component="div"
                        className={styles.errorMessage}
                      />
                    )}

                    <label htmlFor="email">Email</label>
                    <Field type="email" id="email" name="email" />
                    {touched.email && errors.email && (
                      <ErrorMessage
                        name="email"
                        component="div"
                        className={styles.errorMessage}
                      />
                    )}

                    <label htmlFor="cpf">CPF</label>
                    <Field name="cpf">
                      {({ field }: FieldProps<string, UserAcount>) => (
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
                    {touched.cpf && errors.cpf && (
                      <ErrorMessage
                        name="cpf"
                        component="div"
                        className={styles.errorMessage}
                      />
                    )}
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
                      {({ field }: FieldProps<string, UserAcount>) => (
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
                    {touched.companySocialReason &&
                      errors.companySocialReason && (
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
                    {formData.addresses.map((address, index) => (
                      <AddressSummary
                        key={index}
                        address={address}
                        updateAddressHandler={() => handleEditAddress(index)}
                        removeAddressHandler={() => handleRemoveAddress(index)}
                      />
                    ))}
                    <div className={styles.actionsAddressContainer}>
                      <button
                        onClick={() => {
                          setModalOpen(true);
                          setEditIndex(null);
                        }}
                        className={styles.actionButton}
                        type="button"
                      >
                        <FontAwesomeIcon
                          icon={faPlus}
                          size="2x"
                          className={styles.iconPlus}
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <div className={styles.actionsContainer}>
                  <button
                    type="button"
                    className={`${styles.button} ${styles.cancelButton}`}
                    onClick={() => {
                      router.push("/entrar");
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className={`${styles.button} ${styles.submitButton}`}
                  >
                    Criar
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
        <AddressModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveAddress}
          initialData={
            editIndex !== null ? formData.addresses[editIndex] : undefined
          }
        />
      </div>
    </>
  );
};

export default SignUp;
