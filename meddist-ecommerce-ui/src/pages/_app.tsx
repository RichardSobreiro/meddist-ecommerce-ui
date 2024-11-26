/** @format */

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { DeviceProvider } from "../context/DeviceContext";
import { Provider } from "react-redux";
import { store } from "../store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DeviceProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </DeviceProvider>
  );
}
