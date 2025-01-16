import React from 'react';
import { Formik, Form, Field } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signUpSchema } from '../assets/validationSchemas';

const SignUpPage = () => {
  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    toast.success('Registration successful!');
    resetForm();
  };

  return (
    <div className="sign-up-page">
      <ToastContainer />
      <div className="sign-up-container">
        <h2>Sign up</h2>
        <Formik
          initialValues={{ email: '', password: '', confirmPassword: '' }}
          validationSchema={signUpSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="form-group">
                <Field name="email" type="email" placeholder="Email" className="form-input" />
                {errors.email && touched.email && <div className="error-message">{errors.email}</div>}
              </div>
              <div className="form-group">
                <Field name="password" type="password" placeholder="Password" className="form-input" />
                {errors.password && touched.password && <div className="error-message">{errors.password}</div>}
              </div>
              <div className="form-group">
                <Field name="confirmPassword" type="password" placeholder="Repeat password" className="form-input" />
                {errors.confirmPassword && touched.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
              </div>
              <button type="submit" className="submit-button">Sign up</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpPage;
