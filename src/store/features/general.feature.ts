import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AivedaRootState } from '../store'

export interface GeneralState {
    pageTitle: string | null
    hideNav: boolean | null
    tokens: number | null
}

const initialState: GeneralState = {
    pageTitle: null,
    hideNav: null,
    tokens: 0,
}

export const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setPageTitle: (
            state: GeneralState,
            { payload }: PayloadAction<string | null>
        ) => {
            state.pageTitle = payload
        },
        setHideNav: (
            state: GeneralState,
            { payload }: PayloadAction<boolean | null>
        ) => {
            state.hideNav = payload
        },
        setTokens: (
            state: GeneralState,
            { payload }: PayloadAction<number | null>
        ) => {
            state.tokens = payload
        },
    },
})

/*******************
 **    Actions    **
 *******************/

export const { setPageTitle, setHideNav, setTokens } = generalSlice.actions

/*******************
 **   Selectors   **
 *******************/

export const selectGeneralInfo = (state: AivedaRootState): GeneralState =>
    state.general

/******************
 **   Reducers   **
 ******************/

export default generalSlice.reducer
