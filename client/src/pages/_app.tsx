import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AuthContextProvider from "../../modules/auth_provider";
import WebSocketProvider from "../../modules/websocket_provider";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <>
      <AuthContextProvider>
        <WebSocketProvider>
          <Component {...pageProps} />
        </WebSocketProvider>
      </AuthContextProvider>
    </>
  );
}
