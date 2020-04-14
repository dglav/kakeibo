import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Typography,
  makeStyles,
  InputAdornment,
  Paper,
  Select,
  MenuItem,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    display: "flex",
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  input: {
    "box-sizing": "border-box",
    width: "100%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  select: {
    "text-align": "left",
  },
}));

const PurchaseForm = () => {
  const classes = useStyles();

  const [purchaseName, setPurchaseName] = useState("");
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [purchaseType, setPurchaseType] = useState("");

  return (
    <Paper className={classes.paper}>
      <form noValidate autoComplete="off">
        <Typography variant="h5" className={classes.title} gutterbottom="true">
          Add Purchase to Database
        </Typography>
        <FormControl className={classes.input}>
          <InputLabel htmlFor="purchase-name" shrink>
            Purchase Name
          </InputLabel>
          <Input
            id="purchase-name"
            value={purchaseName}
            onChange={(e) => setPurchaseName(e.target.value)}
          />
        </FormControl>
        <FormControl className={classes.input}>
          <InputLabel htmlFor="purchase-type" shrink>
            Purchase Type
          </InputLabel>
          <Select
            id="purchase-type"
            value={purchaseType}
            onChange={(e) => setPurchaseType(e.target.value)}
            className={classes.select}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <KeyboardDatePicker
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={purchaseDate}
          onChange={setPurchaseDate}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          className={classes.input}
        />
        <FormControl className={classes.input}>
          <InputLabel htmlFor="purchase-amount">Amount</InputLabel>
          <Input
            id="purchase-amount"
            value={purchaseAmount}
            onChange={(e) => setPurchaseAmount(e.target.value)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
      </form>
    </Paper>
  );
};

export default PurchaseForm;
