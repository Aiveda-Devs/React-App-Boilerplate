import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { AivedaRootState, AiveadAppDispatch } from './store'

export const useAppDispatch = () => useDispatch<AiveadAppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AivedaRootState> = useSelector
