import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

// Reducers
import generalReducer from './features/general.feature'
import configReducer from './features/config.feature'

import { userApi } from 'src/services/user.service'
import { dashboardApi } from 'src/services/dashboard.service'
import { superUserApi } from 'src/services/super.user.service'

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// MARK: ALWAYS CHANGE THE KEY NAME AS PER THE APPLICATION

const persistConfig = {
    key: 'aiveda-root',
    version: 1,
    storage: storage,
    blacklist: [
        userApi.reducerPath,
        dashboardApi.reducerPath,
        superUserApi.reducerPath,
    ],
}

const Middlewares: any = [
    userApi.middleware,
    dashboardApi.middleware,
    superUserApi.middleware,
]

export const rootReducers = combineReducers({
    general: generalReducer,
    userConfig: configReducer,

    [userApi.reducerPath]: userApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [superUserApi.reducerPath]: superUserApi.reducer,
})

const appReducer = (state: any, action: any) => {
    if (action.type === 'LOGOUT') {
        storage.removeItem('persist:root')
        state = undefined
    }
    return rootReducers(state, action)
}

// MARK: ALWAYS CHANGE THE REDUCER NAME AS PER THE APPLICATION

const aivedaPersistedReducer = persistReducer(persistConfig, appReducer)

// MARK: CHANGE THE STORE NAME ALSO
export const AivedaStore = configureStore({
    reducer: aivedaPersistedReducer,
    middleware: (GDM) =>
        GDM({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(...Middlewares),
})

// UPDATE WITH CHANGE NAME

setupListeners(AivedaStore.dispatch)

export const aivedaPersistor = persistStore(AivedaStore)

export type AivedaRootState = ReturnType<typeof AivedaStore.getState>
export type AiveadAppDispatch = typeof AivedaStore.dispatch
