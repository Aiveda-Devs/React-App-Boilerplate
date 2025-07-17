import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    styled,
    Typography,
} from '@mui/material'
import IconifyIcon from '../Icon'

interface DialogProps {
    isOpen: boolean
    handleClose: () => void
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    title?: string
    style?: any
    children?: any
    fullscreen?: boolean
}

function CustomDialogTitle(props: any) {
    const { children, onClose, ...other } = props

    return (
        <DialogTitle {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <IconifyIcon icon="charm:cross" />
                </IconButton>
            ) : null}
        </DialogTitle>
    )
}

const CustomDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root': {
        minWidth: '35%',
        borderRadius: '5px',
        [theme.breakpoints.down('sm')]: {
            minWidth: '70%',
        },
    },
}))

const CustomHeader = styled(Typography)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
}))

const MuiDialog = (props: DialogProps) => {
    const { isOpen, handleClose, size, title, children, style, fullscreen } =
        props

    // ** To Handle the backDrop
    const onClose = (event?: any, reason?: any) => {
        if (reason && reason == 'backdropClick') return
        handleClose()
    }

    return (
        <CustomDialog
            fullScreen={fullscreen}
            maxWidth={size ?? 'md'}
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
            sx={{ ...style }}
        >
            <CustomDialogTitle onClose={handleClose}>
                <CustomHeader>{title ?? ''}</CustomHeader>
            </CustomDialogTitle>
            <DialogContent sx={{ borderBottom: 'none' }}>
                {children}
            </DialogContent>
        </CustomDialog>
    )
}

export default MuiDialog
