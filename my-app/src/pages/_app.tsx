import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ContextHookProvider } from "../context/CustomContextHook";

// paste chakra provider aboce and below page props

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ContextHookProvider>
        <Component {...pageProps} />
      </ContextHookProvider>
    </ChakraProvider>
  );
}