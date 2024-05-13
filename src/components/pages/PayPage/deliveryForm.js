import {Grid, TextField} from "@material-ui/core";
import {Field} from "formik";
import React from "react";

const deliveryForm = (values, setFieldValue) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <Field name="street">
                    {({field, form}) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="Nazwa ulicy"
                            variant="outlined"
                            name="street"
                            error={form.errors.street && form.touched.street}
                            helperText={form.touched.street && form.errors.street}
                        />
                    )}
                </Field>
            </Grid>
            <Grid item xs={12} md={4}>
                <Field name="houseNumber">
                    {({field, form}) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="Numer domu"
                            variant="outlined"
                            name="houseNumber"
                            error={form.errors.houseNumber && form.touched.houseNumber}
                            helperText={form.touched.houseNumber && form.errors.houseNumber}
                        />
                    )}
                </Field>
            </Grid>
            <Grid item xs={12} md={4}>
                <Field name="apartment">
                    {({field, form}) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="Mieszkania"
                            variant="outlined"
                            name="apartment"
                            error={form.errors.apartment && form.touched.apartment}
                            helperText={form.touched.apartment && form.errors.apartment}
                        />
                    )}
                </Field>
            </Grid>
            <Grid item xs={12} md={4}>
                <Field name="postalCode">
                    {({field, form}) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="Kod pocztowy"
                            variant="outlined"
                            name="postalCode"
                            error={form.errors.postalCode && form.touched.postalCode}
                            helperText={form.touched.postalCode && form.errors.postalCode}
                        />
                    )}
                </Field>
            </Grid>
            <Grid item xs={12} md={4}>
                <Field name="region">
                    {({field, form}) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="Miasto"
                            variant="outlined"
                            name="region"
                            error={form.errors.region && form.touched.region}
                            helperText={form.touched.region && form.errors.region}
                        />
                    )}
                </Field>
            </Grid>
        </Grid>
    );
};

export default deliveryForm;