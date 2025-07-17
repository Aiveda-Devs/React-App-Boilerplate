import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'
import NotFound from './pages/not-found'
import Dashboard from './pages/dashboard'
import SidePanel from './pages/side-panel'
import VerticalNavItems from './navigation'
import './App.css'

import { useSettings } from './hooks/useSettings'
import Login from 'src/auth/Login'
import ForgotPassword from 'src/auth/Forgot.Password'
import Logout from './auth/Logout'

import { useAppSelector } from './store'
import { selectGeneralInfo } from './store/features/general.feature'

import RouteTracker from './shared/components/router-tracker'
import SuperAdmin from './pages/super-admin'
import ProtectedSuperUserPanel from './configs/Protected.Super.User'
import { selectUserConfig } from './store/features/config.feature'
import UserProfile from './pages/profile'
import ProtectedRoutes from './configs/Protected.Routes'

function App() {
    const { settings, saveSettings } = useSettings()

    // Store Data

    const generalConfig = useAppSelector(selectGeneralInfo)
    const userConfig = useAppSelector(selectUserConfig)

    const hideNav = generalConfig.hideNav ? true : false

    return (
        <Router
            future={{
                v7_startTransition: true, // Enable future features in React Router v7
                v7_relativeSplatPath: true, // Enable relative splat paths in React Router v7
            }}
        >
            <RouteTracker />
            {/* Use RouteTracker component at the parent level */}
            <Routes>
                <Route path="auth">
                    <Route index element={<Navigate to="login" />} />
                    <Route path="login" element={<Login />} />
                    <Route
                        path="forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route path="logout" element={<Logout />} />
                </Route>

                {/* <Route path="/" element={<ProtectedRoutes />}> */}
                <Route path="/">
                    <Route index element={<Navigate to="apps" />} />
                    <Route
                        path="/apps"
                        element={
                            <SidePanel
                                hidden={hideNav}
                                contentHeightFixed={false}
                                settings={settings}
                                saveSettings={saveSettings}
                                verticalLayoutProps={{
                                    navMenu: {
                                        navItems: VerticalNavItems(userConfig),
                                    },
                                }}
                            >
                                {null}
                            </SidePanel>
                        }
                    >
                        <Route index element={<Navigate to="dashboard" />} />
                        <Route path="dashboard" element={<Dashboard />} />

                        <Route path="profile" element={<UserProfile />} />

                        <Route
                            path="super"
                            element={<ProtectedSuperUserPanel />}
                        >
                            <Route index element={<Navigate to="user" />} />
                            <Route path="user" element={<SuperAdmin />} />
                        </Route>
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default App
