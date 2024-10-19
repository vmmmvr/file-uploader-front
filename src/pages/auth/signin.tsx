import React from 'react';
import { Input, Button, Card, Typography } from "@material-tailwind/react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useUserLogin } from '../../services/user.service';
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';

// Validation schema using Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

const Login = () => {
    const { mutateAsync: loginFunc,data: loginData, isPending , isError, error } = useUserLogin();
   const navigate = useNavigate();
   // authenticated push to home page
  
      
  const handleLogin = (values) => {
    loginFunc({...values}, {
      onSuccess: (res) => {
        Cookies.set('authToken', res.data.token, { expires: 7 })
        navigate("/")
      }
    })
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <Typography variant="h4" className="mb-6 text-center">
          Login
        </Typography>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched }) => (
            <Form>
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
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <div className="mt-4 text-center">
          <Typography variant="small">
            Don't have an account? <a href="/sign-up" className="text-blue-500">Sign up</a>
          </Typography>
        </div>
      </Card>
    </div>
  );
};

export default Login;
