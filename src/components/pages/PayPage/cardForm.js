import { Grid, TextField } from "@material-ui/core";
import { Field } from "formik";
import StyledButton from "../../UI/StyledButton";
import React from "react";

const renderCardForm = (values, setFieldValue) => {
    const handleCardNumberChange = (e) => {
        const cardNumber = e.target.value.replace(/[^\d]/g, '').substring(0, 16); // Удаляем все символы кроме цифр и ограничиваем длину в 16 символов
        const formattedCardNumber = cardNumber.match(/.{1,4}/g)?.join(' '); // Форматируем номер карты по 4 цифры через пробел
        setFieldValue('cardNumber', formattedCardNumber || '');
    };

    const handleExpirationDateChange = (e) => {
        const expirationDate = e.target.value.replace(/[^\d]/g, '').substring(0, 4); // Удаляем все символы кроме цифр и ограничиваем длину в 4 символа
        const formattedExpirationDate = expirationDate.replace(/(\d{2})/, '$1/'); // Добавляем разделитель "/" после первых двух цифр
        setFieldValue('expirationDate', formattedExpirationDate || '');
    };

    const handleCvvChange = (e) => {
        const cvv = e.target.value.replace(/[^\d]/g, '').substring(0, 3); // Удаляем все символы кроме цифр и ограничиваем длину в 3 символа
        setFieldValue('cvv', cvv || '');
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
                <Field name="cardNumber">
                    {({ field, form }) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="Numer karty"
                            variant="outlined"
                            name="cardNumber"
                            value={values.cardNumber}
                            onChange={handleCardNumberChange}
                            error={form.errors.cardNumber && form.touched.cardNumber}
                            helperText={form.touched.cardNumber && form.errors.cardNumber}
                        />
                    )}
                </Field>
            </Grid>
            <Grid item xs={12} md={6}>
                <Field name="expirationDate">
                    {({ field, form }) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="MM/RR"
                            variant="outlined"
                            name="expirationDate"
                            value={values.expirationDate}
                            onChange={handleExpirationDateChange}
                            error={form.errors.expirationDate && form.touched.expirationDate}
                            helperText={form.touched.expirationDate && form.errors.expirationDate}
                        />
                    )}
                </Field>
            </Grid>
            <Grid item xs={12} md={6}>
                <Field name="cvv">
                    {({ field, form }) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="CVV"
                            variant="outlined"
                            name="cvv"
                            value={values.cvv}
                            onChange={handleCvvChange}
                            error={form.errors.cvv && form.touched.cvv}
                            helperText={form.touched.cvv && form.errors.cvv}
                        />
                    )}
                </Field>
            </Grid>
            <Grid item xs={12} md={12}>
                <StyledButton text="Zamówienie potwierdzone." type="submit" width="100%" />
            </Grid>
        </Grid>
    );
};

export default renderCardForm;
