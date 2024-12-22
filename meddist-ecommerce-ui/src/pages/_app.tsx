/** @format */

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { DeviceProvider } from "../context/DeviceContext";
import { Provider } from "react-redux";
import { store } from "../store";
import { AuthProvider } from "@/context/AuthContext";
import { SpinnerProvider, useSpinner } from "@/context/SpinnerContext ";
import Spinner from "@/components/Spinner";
import { ToastProvider } from "@/context/ToastContext";
import Toast from "@/components/Toast";

function AppContent({ Component, pageProps, router }: AppProps) {
  const { isLoading } = useSpinner();

  return (
    <>
      {isLoading && <Spinner />}
      <Component {...pageProps} router={router} />
    </>
  );
}

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <SpinnerProvider>
      <DeviceProvider>
        <ToastProvider>
          <AuthProvider>
            <Provider store={store}>
              <AppContent
                Component={Component}
                pageProps={pageProps}
                router={router}
              />
            </Provider>
          </AuthProvider>
          <Toast />
        </ToastProvider>
      </DeviceProvider>
    </SpinnerProvider>
  );
}
