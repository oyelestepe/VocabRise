import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email address').required('Email required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password required'),
});

export const signUpSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email address').required('Email required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match')
    .required('Repeat password required'),
});
