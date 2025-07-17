import { useContext } from 'react'
import {
    SettingsContext,
    SettingsContextValue,
} from '../context/Settings.Context'

export const useSettings = (): SettingsContextValue =>
    useContext(SettingsContext)
