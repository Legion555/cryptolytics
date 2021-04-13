import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import darkModeReducer from '../slices/darkModeSlice'
import userDataReducer from '../slices/userDataSlice'
import marketDataReducer from '../slices/marketDataSlice'
import coinDataReducer from '../slices/coinDataSlice'



const reducers = combineReducers({
    darkMode: darkModeReducer,
    userData: userDataReducer,
    marketData: marketDataReducer,
    coinData: coinDataReducer
})

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['coinData']
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false
    }),
});

export default store