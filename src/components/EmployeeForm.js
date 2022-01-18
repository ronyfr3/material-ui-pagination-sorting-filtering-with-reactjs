import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "./controls/Controls";
import { useForm, Form } from "./useForm";

const initialFValues = {
  id:0,
  first_name: "",
  last_name: "",
  email: "",
};

export default function EmployeeForm(props) {
  const { addOrEdit, recordForEdit } = props;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("first_name" in fieldValues)
      temp.first_name = fieldValues.first_name ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    if ("last_name" in fieldValues)
      temp.last_name = fieldValues.last_name ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues === values) return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit,setValues]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid>
          <Controls.Input
            label="Full Name"
            name="first_name"
            value={values.first_name}
            onChange={handleInputChange}
            error={errors.first_name}
          />
          <Controls.Input
            label="Last Name"
            name="last_name"
            value={values.last_name}
            onChange={handleInputChange}
            error={errors.last_name}
          />
          <Controls.Input
            label="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
         <Grid>
         <Controls.Button type="submit" text="Submit" />
          <Controls.Button text="Reset" color="default" onClick={resetForm} />
         </Grid>
        </Grid>
      </Grid>
    </Form>
  );
}
