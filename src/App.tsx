import { useState, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import SignUp from './pages/auth/signup';
import ProtectedRoute from './ProtectedRoute';
import { useGetMeQuery } from './services/user.service';
import Login from './pages/auth/signin';
import { Spinner } from '@material-tailwind/react';

// Loading component as fallback
const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner className="h-12 w-12 text-indigo-500" />
    </div>
  );
};

function App() {

  return (
    <>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
            </Route>

            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
