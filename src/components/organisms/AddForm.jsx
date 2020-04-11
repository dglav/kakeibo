import React from "react";

import { FormControl, TextField } from "@material-ui/core";

const AddForm = () => {
  return (
    <form noValidate autoComplete="off">
      <FormControl>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </FormControl>
    </form>
  );
};

export default AddForm;
