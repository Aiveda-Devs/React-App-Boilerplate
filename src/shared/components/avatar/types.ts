// ** MUI Imports
import { AvatarProps } from '@mui/material/Avatar'

export type CustomAvatarProps = AvatarProps & {
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
    skin?: 'filled' | 'light' | 'light-static'
}
