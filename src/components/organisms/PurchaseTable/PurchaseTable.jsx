import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { getPurchases } from "../../../firebase/utils";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    marginTop: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));

export default function PurchaseTable() {
  const { tableContainer, table } = useStyles();
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    getPurchases().then((purchases) => setPurchases(purchases));
  }, []);

  console.log("purchases in render", purchases);
  return (
    <TableContainer component={Paper} className={tableContainer}>
      <Table className={table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Purchase</TableCell>
            <TableCell align="right">Amount&nbsp;($)</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Subcategory</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {purchases.map((purchase) => (
            <TableRow key={purchase.name}>
              <TableCell component="th" scope="row">
                {purchase.name}
              </TableCell>
              <TableCell align="right">{purchase.price}</TableCell>
              <TableCell align="right">{purchase.date}</TableCell>
              <TableCell align="right">{purchase.category}</TableCell>
              <TableCell align="right">{purchase.subcategory}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
