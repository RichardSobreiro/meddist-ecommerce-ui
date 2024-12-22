/** @format */

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/context/ToastContext";

const ConfirmEmail = () => {
  const router = useRouter();
  const { token } = router.query;
  const [message, setMessage] = useState("Confirmando email...");
  const { addToast } = useToast();

  useEffect(() => {
    if (token) {
      axios
        .post("http://localhost:3001/users/confirm-email", { token })
        .then(() => {
          setMessage("Email confirmado com sucesso!");
          addToast("Email confirmado com sucesso!", "success");
          router.push("/entrar");
        })
        .catch((err) => {
          setMessage(
            err.response?.data?.message ||
              "A verificação de email falhou. Tente novamento ou entre em contato conosco."
          );
        });
    }
  }, [addToast, router, token]);

  return <div>{message}</div>;
};

export default ConfirmEmail;
