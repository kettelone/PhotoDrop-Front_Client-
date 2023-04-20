import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Login from '../components/pages/login/Login';
import CodeConfirmation from '../components/pages/codeConfirmation/CodeConfirmation';


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/code-confirmation" element={<CodeConfirmation />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default AppRouter;