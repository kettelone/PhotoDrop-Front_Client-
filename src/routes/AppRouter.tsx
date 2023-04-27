import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Login from '../components/pages/login/Login';
import CodeConfirmation from '../components/pages/codeConfirmation/CodeConfirmation';
import AddSelfie from '../components/pages/addSelfie/AddSelfie';
import Dashboard from '../components/pages/dashboard/Dashboard';
import Profile from '../components/pages/profile/Profile';
import {
  LOGIN_ROUTE,
  CODE_CONFIRMATION_ROUTE,
  UPLOAD_SELFIE_ROUTE,
  DASHBOARD_ROUTE,
  PROFILE_ROUTE
} from '../utils/consts';


const AppRouter = () => {
  return (
    <Routes>
      <Route path={LOGIN_ROUTE} element={<Login />} />
      <Route path={CODE_CONFIRMATION_ROUTE} element={<CodeConfirmation />} />
      <Route path={UPLOAD_SELFIE_ROUTE} element={<AddSelfie />} />
      <Route path={DASHBOARD_ROUTE} element={<Dashboard />} />
      <Route path={PROFILE_ROUTE} element={<Profile />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default AppRouter;