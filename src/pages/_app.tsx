import "@/styles/globals.css";
import "../i18n";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}
