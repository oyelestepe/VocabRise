import React from 'react';
import { Formik, Form, Field } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginSchema } from '../assets/validationSchemas';

const LoginPage = () => {
  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    toast.success('Login successfully!');
    resetForm();
  };

  return (
    <div className="login-page">
      <ToastContainer />
      <div className="login-container">
        <h2>Login</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
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
              <button type="submit" className="submit-button">Login</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
