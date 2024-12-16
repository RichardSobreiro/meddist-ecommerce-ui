/** @format */

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { DeviceProvider } from "../context/DeviceContext";
import { Provider } from "react-redux";
import { store } from "../store";
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DeviceProvider>
      <AuthProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </AuthProvider>
    </DeviceProvider>
  );
}
