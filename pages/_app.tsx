import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createClient, Provider } from "urql";
import { ChakraProvider } from "@chakra-ui/react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const client = createClient({
  url: "http://localhost:4000/graphql",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ChakraProvider>
        <Provider value={client}>
          <Component {...pageProps} />
        </Provider>
      </ChakraProvider>
    </MuiPickersUtilsProvider>
  );
}

export default MyApp;
