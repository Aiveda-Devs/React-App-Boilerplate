import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AivedaRootState } from '../store'
import { Config } from 'src/core/types'

export interface ConfigState {
    config: Config | null
}

const initialState: ConfigState = {
    config: null,
}

export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setUserConfig: (
            state: ConfigState,
            { payload }: PayloadAction<Config | null>
        ) => {
            state.config = payload
        },
    },
})

/*******************
 **    Actions    **
 *******************/

export const { setUserConfig } = configSlice.actions

/*******************
 **   Selectors   **
 *******************/

export const selectUserConfig = (state: AivedaRootState): Config =>
    state.userConfig.config

/******************
 **   Reducers   **
 ******************/

export default configSlice.reducer
