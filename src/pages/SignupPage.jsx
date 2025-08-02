import React from 'react';
import { Formik, Form, Field } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import { signUpSchema } from '../assets/validationSchemas';
import { auth, db, doc, setDoc } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Navbar from '../components/Navbar';
import '../style/SignupPage.css';

const SignupPage = () => {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const { email, password, name, subscriptionPlan } = values;

      // Create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Saving user information to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        subscriptionPlan,
      });

      toast.success('Registration successful!');
      resetForm();
    } catch (error) {
      toast.error('Error: ' + error.message);
    }
  };

  return (
    <>
      <Navbar />
    <div className="signup-page">
      <ToastContainer />
      <h2>Sign Up</h2>
      <Formik
        initialValues={{ name: '', email: '', password: '', subscriptionPlan: 'Free' }}
        validationSchema={signUpSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-group">
              <Field name="name" type="text" placeholder="Name" />
              {errors.name && touched.name && <div>{errors.name}</div>}
            </div>
            <div className="form-group">
              <Field name="email" type="email" placeholder="Email" />
              {errors.email && touched.email && <div>{errors.email}</div>}
            </div>
            <div className="form-group">
              <Field name="password" type="password" placeholder="Password" />
              {errors.password && touched.password && <div>{errors.password}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="subscriptionPlan">Subscription Plan:</label>
              <Field name="subscriptionPlan" as="select">
                <option value="Free">Free</option>
                <option value="Premium">Premium</option>
                <option value="Pro">Pro</option>
              </Field>
            </div>
            <button type="submit">Sign Up</button>
          </Form>
        )}
      </Formik>
    </div>
    </>
  );
};

export default SignupPage;