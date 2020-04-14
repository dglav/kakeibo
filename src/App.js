import React, { useState, useEffect } from "react";
import { db } from "./firebase/config";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "./App.css";

import CssBaseline from "@material-ui/core/CssBaseline";
import { Container } from "@material-ui/core";

import Header from "./components/organisms/Header/Header";
import PurchaseForm from "./components/organisms/PurchaseForm/PurchaseForm";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("users").onSnapshot(
      (users) => {
        let usersData = [];
        users.forEach((user) => {
          const userData = user.data();
          usersData.push(userData);
        });
        setUsers(usersData);
      },
      (error) => {
        console.log("There was an error:", error);
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <CssBaseline />
        <Header />
        <Container>
          <PurchaseForm />
        </Container>
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default App;
