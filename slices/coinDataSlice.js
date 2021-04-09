import {createSlice} from '@reduxjs/toolkit'



const initialState = {
    value: null
}

export const coinDataSlice = createSlice({
    name: 'coinData',
    initialState,
    reducers: {
        updateCoinData: (state, {payload}) => {
            state.value = payload
        },
        resetCoinData: () => initialState
    }
})

export const {updateCoinData, resetCoinData} = coinDataSlice.actions

export const coinData = state => state.coinData.value

export default coinDataSlice.reducer