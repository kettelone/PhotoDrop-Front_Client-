import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import jwtDecode from 'jwt-decode'
import Cookies from 'universal-cookie'
export const cookies = new Cookies()


import { useAppSelector } from '../app/hooks'
import { CODE_CONFIRMATION_ROUTE, LOGIN_ROUTE, MAIN_DASHBOARD_ROUTE, UPLOAD_SELFIE_ROUTE } from './consts'

const ProtectedRoute = ({ children }: any) => {
	const user = useAppSelector((state) => state.authUpdate)
	const selfie = useAppSelector(state => state.userUpdate.selfieUrl)
	const location = useLocation()	
	let tokenValid = false
	if (cookies.get('jwt_auth')) {
		const token = cookies.get('jwt_auth')
		const { exp }: { exp: number } = jwtDecode(token)
		tokenValid = exp * 1000 > Date.now()
	}
		
	if (
		!user.isAuthenticated && 
		(location.pathname !== LOGIN_ROUTE && 
		location.pathname !== CODE_CONFIRMATION_ROUTE)
	) {
		return <Navigate to={LOGIN_ROUTE} state={{ from: location }} replace={true} />
	} else if (
		!user.isAuthenticated
	) {
		return children
	} else if (
		user.isAuthenticated &&
		tokenValid &&
		(location.pathname === LOGIN_ROUTE )
	) {
		return <Navigate to={MAIN_DASHBOARD_ROUTE} state={{ from: location }} replace />
	} else if (
		user.isAuthenticated &&
		tokenValid 
	) {
		return children
	}
}


export default ProtectedRoute
