/** @format */

import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputMask from "react-input-mask";
import styles from "./LoginPage.module.css"; // Ensure you have this CSS module
import ClickableText from "../general/ClickableText";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const authContext = useAuth();
  const validationSchema = Yup.object({
    username: Yup.string().required("CPF ou Email é obrigatório"),
    password: Yup.string().required("Senha é obrigatória"),
  });

  const getMask = (value: string) => {
    if (!value) return;
    const unMaskedValue = value.replace(/[.\-\/]/g, "");
    if (unMaskedValue.match(/\D/)) {
      return "";
    } else {
      return "999.999.999-99";
    }
  };

  useEffect(() => {
    if (authContext.user != null) {
      router.back();
    }
  }, [authContext.user, router]);

  return (
    <div className={styles.container}>
      <Formik
        initialValues={{ username: "", password: "", rememberMe: false }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const loginApi = authContext.login;
          try {
            await loginApi({
              username: values.username,
              password: values.password,
            });
            console.log("Login successful:");
            router.back();
          } catch (error) {
            if (error instanceof Error) {
              console.error("Login failed:", error.message);
              alert("Failed to login: " + error.message);
            } else {
              console.error("Login failed:", error);
              alert("Failed to login: An unknown error occurred");
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className={styles.loginForm}>
            <h2>Entrar</h2>

            <label htmlFor="username">CPF ou Email</label>
            <Field name="username">
              {({ field }) => (
                <InputMask
                  {...field}
                  mask={getMask(values.username)}
                  maskChar={null}
                  onChange={(e) => {
                    setFieldValue("username", e.target.value);
                  }}
                  type="text"
                  id="username"
                  className={styles.input}
                />
              )}
            </Field>
            <ErrorMessage
              name="username"
              component="div"
              className={styles.errorMessage}
            />

            <label htmlFor="password">Senha</label>
            <Field
              type="password"
              id="password"
              name="password"
              className={styles.input}
            />
            <ErrorMessage
              name="password"
              component="div"
              className={styles.errorMessage}
            />

            <div className={styles.checkboxContainer}>
              <Field type="checkbox" name="rememberMe" id="rememberMe" />
              <label htmlFor="rememberMe">Matenha-me logado</label>
            </div>

            <button type="submit" className={styles.loginButton}>
              Entrar
            </button>

            <div className={styles.links}>
              <ClickableText
                text="Esqueci minha senha"
                onClick={() => {}}
                className="small_primary"
              />
              <ClickableText
                text="Criar uma conta"
                onClick={() => {}}
                className="small_primary"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optionally, handle 401 Unauthorized responses here by attempting to refresh tokens
