import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
    // Enable this to on Maintenance Page
    // return isAuthenticated() ? <MaintenancePage /> : <MaintenancePage />

    return isAuthenticated() ? <Outlet /> : <Navigate to={'/auth'} />
}

export default ProtectedRoutes

// isAuthentication

export const isAuthenticated = () => {
    return !!localStorage.getItem('nm-corp-token')
}
