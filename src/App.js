import React from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "./App.css";

import CssBaseline from "@material-ui/core/CssBaseline";
import { Container } from "@material-ui/core";

import Header from "./components/organisms/Header/Header";
import PurchaseTable from "./components/organisms/PurchaseTable/PurchaseTable";
import PurchaseForm from "./components/organisms/PurchaseForm/PurchaseForm";

function App() {
  return (
    <div className="App">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <CssBaseline />
        <Header />
        <Container>
          <PurchaseTable />
        </Container>
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default App;
