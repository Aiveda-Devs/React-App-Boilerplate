// src/context/SnackbarContext.tsx
import React, { createContext, useContext, useState } from 'react'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

type SnackbarSeverity = 'success' | 'error' | 'warning' | 'info'

interface SnackbarContextType {
    showMessage: (
        message: string,
        severity?: SnackbarSeverity,
        duration?: number | null
    ) => void
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
    undefined
)

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState<SnackbarSeverity>('success')
    const [duration, setDuration] = useState<number | null>(4000)

    const showMessage = (
        msg: string,
        sev: SnackbarSeverity = 'success',
        duration: number | null = 4000
    ) => {
        setMessage(msg)
        setSeverity(sev)
        setDuration(duration)
        setOpen(true)
    }

    const handleClose = () => setOpen(false)

    return (
        <SnackbarContext.Provider value={{ showMessage }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={duration}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    )
}

export const useSnackbar = (): SnackbarContextType => {
    const context = useContext(SnackbarContext)
    if (!context)
        throw new Error('useSnackbar must be used within a SnackbarProvider')
    return context
}
