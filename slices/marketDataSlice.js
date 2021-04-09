import {createSlice} from '@reduxjs/toolkit'



const initialState = {
    value: null
}

export const marketDataSlice = createSlice({
    name: 'marketData',
    initialState,
    reducers: {
        updateMarketData: (state, {payload}) => {
            state.value = payload
        },
        resetMarketData: () => initialState
    }
})

export const {updateMarketData} = marketDataSlice.actions

export const marketData = state => state.marketData.value

export default marketDataSlice.reducer