import React, { useState, useEffect } from "react";
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

const expenseCategories = [
  {
    value: "dayToDay",
    text: "Day to Day",
  },
  {
    value: "fixed",
    text: "Fixed",
  },
  {
    value: "savings",
    text: "Savings",
  },
];

const expenseSubcategories = {
  dayToDay: [
    { value: "disposable", text: "Disposable" },
    { value: "foodAndHealth", text: "Food and Health" },
    { value: "transportation", text: "Transportation" },
    { value: "hairCut", text: "Hair Cut" },
  ],
  fixed: [
    { value: "rent", text: "Rent" },
    { value: "cellPhone", text: "Cell Phone" },
    { value: "gym", text: "Gym" },
    { value: "netflix", text: "Netflix" },
  ],
  savings: [
    { value: "presents", text: "Presents" },
    { value: "computer", text: "Computer" },
    { value: "clothes", text: "Clothes" },
    { value: "stuff", text: "Stuff" },
    { value: "cellPhone", text: "Cell Phone" },
    { value: "hairTreatment", text: "Hair Treatment" },
    { value: "travel", text: "Travel" },
    { value: "emergency", text: "Emergency" },
  ],
};

const PurchaseForm = () => {
  const classes = useStyles();

  const [purchaseName, setPurchaseName] = useState("");
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [purchaseCategory, setPurchaseCategory] = useState("");
  const [purchaseSubcategory, setPurchaseSubcategory] = useState({
    disabled: true,
    subcategory: "",
  });

  useEffect(() => {
    purchaseCategory !== "" &&
      setPurchaseSubcategory({ ...purchaseSubcategory, disabled: false });
  }, [purchaseCategory]);

  console.log("purchaseCategory", purchaseCategory);
  console.log("purchaseSubcategory", purchaseSubcategory.subcategory);

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
          <InputLabel htmlFor="category" shrink>
            Category
          </InputLabel>
          <Select
            id="category"
            value={purchaseCategory}
            onChange={(e) => setPurchaseCategory(e.target.value)}
            className={classes.select}
          >
            {expenseCategories.map((category) => (
              <MenuItem key={category.value} value={category.value}>
                {category.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.input}>
          <InputLabel htmlFor="subcategory" shrink>
            Subcategory
          </InputLabel>
          <Select
            id="subcategory"
            value={purchaseSubcategory.subcategory}
            onChange={(e) =>
              setPurchaseSubcategory({
                ...purchaseSubcategory,
                subcategory: e.target.value,
              })
            }
            className={classes.select}
            disabled={purchaseSubcategory.disabled}
          >
            {!purchaseSubcategory.disabled &&
              expenseSubcategories[purchaseCategory].map((subcategory) => (
                <MenuItem key={subcategory.value} value={subcategory.value}>
                  {subcategory.text}
                </MenuItem>
              ))}
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
