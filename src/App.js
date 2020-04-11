import React, { useState, useEffect } from "react";
import { db } from "./firebase/config";
import "./App.css";

import CssBaseline from "@material-ui/core/CssBaseline";
import {
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import "./components/organisms/AddForm";
import AddForm from "./components/organisms/AddForm";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  const [users, setUsers] = useState();

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

  const handleClick = () => {
    console.log(users);
  };

  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="sm">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <AddForm></AddForm>
      </Container>
    </div>
  );
}

export default App;
