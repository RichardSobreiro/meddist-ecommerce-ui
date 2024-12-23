/** @format */

// components/ForgotPasswordPage.tsx
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./ForgotPassword.module.css";
import axios from "axios";
import ClickableText from "../general/ClickableText";
import { useRouter } from "next/router";
import { useSpinner } from "@/context/SpinnerContext ";
import { useToast } from "@/context/ToastContext";

const ForgotPassword: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const { showSpinner, hideSpinner } = useSpinner();
  const { addToast } = useToast();

  const validationSchema = Yup.object({
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  });

  return (
    <div className={styles.container}>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            showSpinner();
            await axios.post("http://localhost:3001/users/forgot-password", {
              email: values.email,
            });
            setMessage(
              "Email de redefinição enviado. Verifique sua caixa de entrada."
            );
            setErrorMessage(null);
            addToast(
              "Email de redefinição enviado. Verifique sua caixa de entrada.",
              "success"
            );
          } catch (error) {
            console.error(error);
            setMessage(null);
            if (axios.isAxiosError(error) && error.response?.data?.message) {
              setErrorMessage(
                `Erro ao enviar o email: ${error.response.data.message}`
              );
              addToast(
                `Erro ao enviar o email: ${error.response.data.message}`,
                "error"
              );
            } else {
              setErrorMessage("Erro ao enviar o email. Tente novamente.");
              addToast("Erro ao enviar o email. Tente novamente.", "error");
            }
          } finally {
            setSubmitting(false);
            hideSpinner();
          }
        }}
      >
        {() => (
          <Form className={styles.loginForm} noValidate>
            <h2>Esqueci minha senha</h2>
            <label htmlFor="email">Email para Recuperação de Senha</label>
            <Field
              type="email"
              id="email"
              name="email"
              className={styles.input}
            />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.errorMessage}
            />
            <button type="submit" className={styles.loginButton}>
              Enviar Link
            </button>
            {message && <p className={styles.messageAfterSent}>{message}</p>}
            {errorMessage && (
              <p className={styles.errorMessageAfterSent}>{errorMessage}</p>
            )}
            <div className={styles.links}>
              <ClickableText
                text="Entrar"
                onClick={() => {
                  router.push("/entrar");
                }}
                className="small_primary"
              />
              <ClickableText
                text="Criar uma conta"
                onClick={() => {
                  router.push("/criar-conta");
                }}
                className="small_primary"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassword;
