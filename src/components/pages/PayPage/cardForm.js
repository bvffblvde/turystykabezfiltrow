import {Grid, TextField} from "@material-ui/core";
import {Field} from "formik";
import StyledButton from "../../UI/StyledButton";
import React from "react";

const renderCardForm = (values, setFieldValue) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
                <Field name="cardNumber">
                    {({field, form}) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="Numer karty"
                            variant="outlined"
                            name="cardNumber"
                            error={form.errors.cardNumber && form.touched.cardNumber}
                            helperText={form.touched.cardNumber && form.errors.cardNumber}
                        />
                    )}
                </Field>
            </Grid>
            <Grid item xs={12} md={6}>
                <Field name="expirationDate">
                    {({field, form}) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="MM/RR"
                            variant="outlined"
                            name="expirationDate"
                            error={form.errors.dateCard && form.touched.dateCard}
                            helperText={form.touched.dateCard && form.errors.dateCard}
                        />
                    )}
                </Field>
            </Grid>
            <Grid item xs={12} md={6}>
                <Field name="cvv">
                    {({field, form}) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="CVV"
                            variant="outlined"
                            name="cvv"
                            error={form.errors.cvv && form.touched.cvv}
                            helperText={form.touched.cvv && form.errors.cvv}
                        />
                    )}
                </Field>
            </Grid>
            <Grid item xs={12} md={12}>
                <StyledButton text="Zamówienie potwierdzone." type="submit" width="100%"/>
            </Grid>
        </Grid>
    );
};

export default renderCardForm;