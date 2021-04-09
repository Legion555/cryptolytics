import {useState, useEffect} from 'react'
import axios from 'axios'
import {useRouter} from 'next/router';
import Head from 'next/head';
//components
import Nav from '../../../components/Crypto/Nav'
import Overview from '../../../components/Crypto/Overview'
var coinData = require('../../../sampleData.json');
//redux
import {useSelector, useDispatch} from 'react-redux'
import {updateCoinData, resetCoinData} from '../../../slices/coinDataSlice' 



export function getServerSideProps(context) {
    return {
      props: {params: context.params}
    };
}
  

export default function Index({params}) {
    const dispatch = useDispatch();
    const coinData = useSelector(state => state.coinData.value);
    const [coinList, setCoinList] = useState(null);

    useEffect(() => {
        dispatch(resetCoinData());
        const {id} = params;
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
        .then(result => {
            dispatch(updateCoinData(result.data))
        }).catch(err => console.log(err))
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        .then(result => {
            setCoinList(result.data)
        }).catch(err => console.log(err))
    }, [])

    return (
        <div className="bg-gray-900">
            <Head>
                <title>{coinData && coinData.name}</title>
            </Head>
            <div className="h-screen flex flex-col">
                <Nav coinList={coinList} />
                <div className="w-full">
                    <Overview coinId={params.id} />
                </div>
            </div>
        </div>
    )
} 