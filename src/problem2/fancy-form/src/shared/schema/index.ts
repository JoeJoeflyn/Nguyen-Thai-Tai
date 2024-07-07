import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    amount: Yup.number()
        .positive("Amount must be greater than zero")
        .required("Amount is required"),
});