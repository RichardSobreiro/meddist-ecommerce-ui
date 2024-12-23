/** @format */

// components/ResetPasswordPage.tsx
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "./ResetPassword.module.css";
import { useSpinner } from "@/context/SpinnerContext ";
import { useToast } from "@/context/ToastContext";

const ResetPassword: React.FC = () => {
  const router = useRouter();
  const { token } = router.query;
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { showSpinner, hideSpinner } = useSpinner();
  const { addToast } = useToast();

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .required("Senha é obrigatória")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Senha deve conter ao menos 8 caracteres, uma letra maiúscula, uma letra minúscula, e um caractere especial."
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "As senhas devem coincidir")
      .required("Confirmação de senha é obrigatória"),
  });

  return (
    <div className={styles.container}>
      <Formik
        initialValues={{ newPassword: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            showSpinner();
            await axios.post("http://localhost:3001/users/reset-password", {
              token,
              newPassword: values.newPassword,
            });
            setMessage(
              "Senha redefinida com sucesso! Você será redirecionado para o login."
            );
            setTimeout(() => router.push("/entrar"), 3000);
          } catch (error) {
            console.error(error);
            setMessage(null);
            if (axios.isAxiosError(error) && error.response?.data?.message) {
              setErrorMessage(
                `"Erro ao redefinir a senha: ${error.response.data.message}`
              );
              addToast(
                `"Erro ao redefinir a senha.: ${error.response.data.message}`,
                "error"
              );
            } else {
              setErrorMessage("Erro ao redefinir a senha. Tente novamente.");
              addToast("Erro ao redefinir a senha. Tente novamente.", "error");
            }
          } finally {
            setSubmitting(false);
            hideSpinner();
          }
        }}
      >
        {() => (
          <Form className={styles.loginForm} noValidate>
            <h2>Redefinir Senha</h2>
            <label htmlFor="newPassword">Nova Senha</label>
            <Field
              type="password"
              id="newPassword"
              name="newPassword"
              className={styles.input}
            />
            <ErrorMessage
              name="newPassword"
              component="div"
              className={styles.errorMessage}
            />

            <label htmlFor="confirmPassword">Confirme a Senha</label>
            <Field
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={styles.input}
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className={styles.errorMessage}
            />

            <button type="submit" className={styles.loginButton}>
              Redefinir Senha
            </button>
            {message && <p className={styles.messageAfterSent}>{message}</p>}
            {errorMessage && (
              <p className={styles.errorMessageAfterSent}>{errorMessage}</p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
