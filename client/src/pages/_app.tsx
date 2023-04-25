import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AuthContextProvider from "../../modules/auth_provider";
import WebSocketProvider from "../../modules/websocket_provider";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <>
      <AuthContextProvider>
        <WebSocketProvider>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </WebSocketProvider>
      </AuthContextProvider>
    </>
  );
}
