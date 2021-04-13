import {useState, useEffect} from 'react'
import axios from 'axios'
import {useRouter} from 'next/router';
import Head from 'next/head';
//components
import Nav from '../../../components/Crypto/Nav'
import Overview from '../../../components/Crypto/Overview'
//redux
import {useSelector, useDispatch} from 'react-redux'
import {updateOverview, updatePriceHistory, updateRelated, resetCoinData} from '../../../slices/coinDataSlice' 



export function getServerSideProps(context) {
    return {
      props: {params: context.params}
    };
}
  

export default function Index({params}) {
    const dispatch = useDispatch();
    const coinData = useSelector(state => state.coinData.value);
    console.log(coinData)

    useEffect(() => {
        dispatch(resetCoinData());
        const {id} = params;
        //get general data
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
        .then(result => {
            dispatch(updateOverview(result.data))
        }).catch(err => console.log(err))
        //get 90day price data
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=90`)
        .then(result => {
            let priceArray = [];
            result.data.prices.forEach(price =>
                    priceArray.push({time: price[0], price: price[1]})
            )
            dispatch(updatePriceHistory(priceArray));
        }).catch(err => console.log(err))
        //get related coins
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false')
        .then(result => {
            dispatch(updateRelated(result.data))
        }).catch(err => console.log(err))
    }, [])

    return (
        <div className="bg-gray-900">
            <Head>
                <title>{coinData && coinData.name}</title>
            </Head>
            <div className="min-h-screen flex flex-col">
                <Nav />
                <div className="w-full">
                    <Overview coinId={params.id} />
                </div>
            </div>
        </div>
    )
} 