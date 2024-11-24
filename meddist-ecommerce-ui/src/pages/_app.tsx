/** @format */

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { DeviceProvider } from "../context/DeviceContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DeviceProvider>
      <Component {...pageProps} />
    </DeviceProvider>
  );
}
