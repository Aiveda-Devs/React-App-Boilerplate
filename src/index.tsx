import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { AivedaStore, aivedaPersistor } from './store'
// Material UI
import ThemeProvider from '@mui/material/styles/ThemeProvider'

// Chakra UI
import { SettingsConsumer, SettingsProvider } from './context/Settings.Context'
import { PersistGate } from 'redux-persist/integration/react'
import { createTheme } from '@mui/material'
import { SnackbarProvider } from './context/SnackbarContext'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const setConfig: any | undefined = undefined

// create theme provider MUI

const theme = createTheme({
    typography: {
        fontFamily: 'Inter, sans-serif',
    },
})

root.render(
    // <ReactDOM.StrictMode>
    <ThemeProvider theme={theme}>
        <Provider store={AivedaStore}>
            <PersistGate loading={null} persistor={aivedaPersistor}>
                <SnackbarProvider>
                    <SettingsProvider
                        {...(setConfig ? { pageSettings: setConfig() } : {})}
                    >
                        <SettingsConsumer>{({}) => <App />}</SettingsConsumer>
                    </SettingsProvider>
                </SnackbarProvider>
            </PersistGate>
        </Provider>
    </ThemeProvider>

    // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
