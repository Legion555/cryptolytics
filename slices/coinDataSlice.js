import {createSlice} from '@reduxjs/toolkit'



const initialState = {
    value: {
        overview: null,
        priceHistory: [],
        related: null
    }
}

export const coinDataSlice = createSlice({
    name: 'coinData',
    initialState,
    reducers: {
        updateOverview: (state, {payload}) => {
            state.value.overview = payload;
        },
        resetOverview: (state, action) => {
            state.value.overview = null;
        },
        updatePriceHistory: (state, {payload}) => {
            state.value.priceHistory = payload;
        },
        resetPriceHistory: (state, action) => {
            state.value.priceHistory = [];
        },
        updateRelated: (state, {payload}) => {
            state.value.related = payload;
        },
        resetCoinData: () => initialState
    }
})

export const {updateOverview, resetOverview, updatePriceHistory, resetPriceHistory, updateRelated, resetCoinData} = coinDataSlice.actions

export const coinData = state => state.coinData.value

export default coinDataSlice.reducer

//for individual coins