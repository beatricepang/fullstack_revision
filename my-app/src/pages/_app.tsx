import "@/styles/globals.css";
import type { AppProps } from "next/app";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";

// paste chakra provider aboce and below page props

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}


// // 1. import `ChakraProvider` component
// function App() {
//   // 2. Wrap ChakraProvider at the root of your app
//   return (
//     <ChakraProvider>
//       <Component {...pageProps} />
//     </ChakraProvider>
//   );
// }