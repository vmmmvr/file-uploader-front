import React from 'react';
import { Input, Button, Card, Typography } from "@material-tailwind/react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useUserSignup } from '../../services/user.service';
import { useNavigate } from 'react-router-dom';
import {  UserSignupRequest } from '../../interface/user';
import { UserResponseType } from '../../core/types';

// Validation schema using Yup
const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});
const Signup = () => {
    const navigate = useNavigate();

    const { mutateAsync: SignupFunc, isPending, isError, error } = useUserSignup();

  const handleSignup = (values: UserSignupRequest) => {
    SignupFunc({...values}).then((data:UserResponseType) => {
        if(data) {
            navigate("/login")
        }
    })
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <Typography variant="h4" className="mb-6 text-center">
          Sign Up
        </Typography>
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={SignupSchema}
          onSubmit={handleSignup}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-4">
                <Field
                  name="name"
                  as={Input}
                  label="Name"
                  type="text"
                  error={errors.name && touched.name ? true : false}
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="mb-4">
                <Field
                  name="email"
                  as={Input}
                  label="Email"
                  type="email"
                  error={errors.email && touched.email ? true : false}
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="mb-6">
                <Field
                  name="password"
                  as={Input}
                  label="Password"
                  type="password"
                  error={errors.password && touched.password ? true : false}
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <Button disabled={isPending} type="submit" fullWidth>
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
        <div className="mt-4 text-center">
          <Typography variant="small">
            Already have an account? <a href="/login" className="text-blue-500">Login</a>
          </Typography>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
