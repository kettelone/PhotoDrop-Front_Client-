import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useAppSelector } from '../app/hooks'
import { CODE_CONFIRMATION_ROUTE,LOGIN_ROUTE, MAIN_DASHBOARD_ROUTE } from './consts'

const ProtectedRoute = ({ children }: any) => {
	const user = useAppSelector((state) => state.authUpdate)
	const location = useLocation()
	if (!user.isAuthenticated) {
		return <Navigate to={LOGIN_ROUTE} state={{ from: location }} replace />
	} else if (
		user.isAuthenticated &&
		(location.pathname === LOGIN_ROUTE || location.pathname === CODE_CONFIRMATION_ROUTE)) {
		return <Navigate to={MAIN_DASHBOARD_ROUTE} state={{ from: location }} replace />
	} else{
		return children
	}
}

export default ProtectedRoute
