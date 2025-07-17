import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useAppSelector } from 'src/store'
import { selectUserConfig } from 'src/store/features/config.feature'

const ProtectedSuperUserPanel = () => {
    const userConfig = useAppSelector(selectUserConfig)

    return isAuthenticated() && userConfig.superAdmin ? (
        <Outlet />
    ) : (
        <Navigate to={'/apps/admin'} />
    )
}

export default ProtectedSuperUserPanel

// isAuthentication

export const isAuthenticated = () => {
    return !!Cookies.get('token')
}
