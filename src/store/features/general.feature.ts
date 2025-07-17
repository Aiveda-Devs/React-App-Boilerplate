import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AivedaRootState } from '../store'

export interface GeneralState {
    pageTitle: string | null
    hideNav: boolean | null
}

const initialState: GeneralState = {
    pageTitle: null,
    hideNav: null,
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
    },
})

/*******************
 **    Actions    **
 *******************/

export const { setPageTitle, setHideNav } = generalSlice.actions

/*******************
 **   Selectors   **
 *******************/

export const selectGeneralInfo = (state: AivedaRootState): GeneralState =>
    state.general

/******************
 **   Reducers   **
 ******************/

export default generalSlice.reducer
