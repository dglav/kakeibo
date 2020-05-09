import React, { useState, useEffect } from "react";
import { uploadPurchase } from "../../../firebase/utils";
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
  Button,
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
  button: {
    margin: theme.spacing(1),
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
  const { paper, title, input, select, button } = useStyles();

  const [purchaseName, setPurchaseName] = useState("");
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [purchaseCategory, setPurchaseCategory] = useState("");
  const [purchaseSubcategory, setPurchaseSubcategory] = useState({
    disabled: true,
    value: "",
  });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    purchaseCategory !== "" &&
      setPurchaseSubcategory({ ...purchaseSubcategory, disabled: false });
  }, [purchaseCategory, purchaseSubcategory]);

  useEffect(() => {
    if (
      purchaseName &&
      purchaseAmount &&
      purchaseDate &&
      purchaseCategory &&
      purchaseSubcategory.value
    ) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [
    purchaseName,
    purchaseAmount,
    purchaseDate,
    purchaseCategory,
    purchaseSubcategory,
  ]);

  return (
    <Paper className={paper}>
      <form noValidate autoComplete="off">
        <Typography variant="h5" className={title} gutterbottom="true">
          Add Purchase to Database
        </Typography>
        <FormControl className={input}>
          <InputLabel htmlFor="purchase-name" shrink>
            Purchase Name
          </InputLabel>
          <Input
            id="purchase-name"
            value={purchaseName}
            onChange={(e) => setPurchaseName(e.target.value)}
          />
        </FormControl>
        <FormControl className={input}>
          <InputLabel htmlFor="category" shrink>
            Category
          </InputLabel>
          <Select
            id="category"
            value={purchaseCategory}
            onChange={(e) => setPurchaseCategory(e.target.value)}
            className={select}
          >
            {expenseCategories.map((category) => (
              <MenuItem key={category.value} value={category.value}>
                {category.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={input}>
          <InputLabel htmlFor="subcategory" shrink>
            Subcategory
          </InputLabel>
          <Select
            id="subcategory"
            value={purchaseSubcategory.value}
            onChange={(e) =>
              setPurchaseSubcategory({
                ...purchaseSubcategory,
                value: e.target.value,
              })
            }
            className={select}
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
          className={input}
        />
        <FormControl className={input}>
          <InputLabel htmlFor="purchase-amount">Amount</InputLabel>
          <Input
            id="purchase-amount"
            value={purchaseAmount}
            onChange={(e) => setPurchaseAmount(e.target.value)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          className={button}
          disabled={isSubmitDisabled}
          onClick={() =>
            uploadPurchase({
              purchaseName,
              purchaseAmount,
              purchaseDate,
              purchaseCategory,
              purchaseSubcategory: purchaseSubcategory.value,
            })
          }
        >
          Submit
        </Button>
        <Button variant="contained" className={button}>
          Cancel
        </Button>
      </form>
    </Paper>
  );
};

export default PurchaseForm;
