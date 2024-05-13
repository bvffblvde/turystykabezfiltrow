import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    firstName: Yup.string().label('Imię').required('Wpisz swoje imię'),
    lastName: Yup.string().label('Nazwisko').required('Wpisz swoje nazwisko'),
    phoneNumber: Yup.string().label('Numer telefonu').required('Wpisz swój numer telefonu'),
    email: Yup.string().label('E-mail').email('Proszę podać poprawny adres e-mail').required('Wprowadź swój email'),
    city: Yup.string().label('Miasto').required('Wpisz miasto'),
    deliveryType: Yup.string().label('Sposób dostawy').required('Wybierz sposób dostawy'),
    street: Yup.string().when(['deliveryType'], (deliveryType, schema) => {
        return deliveryType === 'delivery' ? schema.label('Nazwa ulicy').required('Wpisz nazwę ulicy') : schema.label('Nazwa ulicy').optional();
    }),
    houseNumber: Yup.string().when(['deliveryType'], (deliveryType, schema) => {
        return deliveryType === 'delivery' ? schema.label('Numer domu').required('Wpisz numer domu') : schema.label('Numer domu').optional();
    }),
    postalCode: Yup.string().when(['deliveryType'], (deliveryType, schema) => {
        return deliveryType === 'delivery' ? schema.label('Kod pocztowy').required('Wpisz kod pocztowy') : schema.label('Kod pocztowy').optional();
    }),
    region: Yup.string().when(['deliveryType'], (deliveryType, schema) => {
        return deliveryType === 'delivery' ? schema.label('Miasto').required('Wpisz miasto') : schema.label('Miasto').optional();
    }),
    apartment: Yup.string().when(['deliveryType'], (deliveryType, schema) => {
        return deliveryType === 'delivery' ? schema.label('Mieszkanie').required('Wpisz numer mieszkania') : schema.label('Mieszkanie').optional();
    }),
    buyType: Yup.string().label('Sposób płatności').required('Wybierz sposób płatności'),
    cardNumber: Yup.string().when(['buyType'], (buyType, schema) => {
        return buyType === 'visaOrMastercard' ? schema.label('Numer karty').required('Wpisz numer karty') : schema.label('Numer karty').optional();
    }),
    expirationDate: Yup.string().when(['buyType'], (buyType, schema) => {
        return buyType === 'visaOrMastercard' ? schema.label('Data ważności').required('Wpisz datę ważności') : schema.label('Data ważności').optional();
    }),
    cvv: Yup.string().when(['buyType'], (buyType, schema) => {
        return buyType === 'visaOrMastercard' ? schema.label('CVV').required('Wpisz CVV') : schema.label('CVV').optional();
    }),

});

export default validationSchema;