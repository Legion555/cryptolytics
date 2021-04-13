import Image from 'next/image'
import axios from 'axios'
//redux
import {useSelector, useDispatch} from 'react-redux'
import {updateOverview, resetOverview, updatePriceHistory, resetPriceHistory} from '../../slices/coinDataSlice'
//components
import Search from './Search'
import { useRouter } from 'next/router'
//icons
import {BiLoader} from 'react-icons/bi'



export default function Nav() {
    const coinData = useSelector(state => state.coinData.value.overview);
    const relatedCoins = useSelector(state => state.coinData.value.related);

    return (
        <div className="w-full h-16 px-4 py-2 flex justify-between items-center text-gray-200 bg-gray-800">
            <div className="flex gap-8">
                <div className="flex items-center gap-2 md:gap-4">
                    {coinData ?
                        <div className="w-8 h-8 relative">
                            <Image className="object-contain" src={coinData.image.large} layout="fill" />
                        </div>
                        :
                        <div>
                            <BiLoader className="animate-spin-slow duration-1000 text-4xl" />
                        </div>
                    }
                    <h1 className="md:text-xl font-bold">{coinData && coinData.name}</h1>
                    <p className="text-xl text-gray-500">{coinData && coinData.symbol}</p>
                </div>
                <div className="hidden lg:flex gap-2">
                    {relatedCoins && coinData &&
                        <CoinLinks coinList={relatedCoins.slice(0,6).filter(coin => coin.id !== coinData.id)} />
                    }
                </div>
            </div>
            <Search />
        </div>
    )
}

const CoinLinks = ({coinList}) => {
    return (
        <div className="flex gap-2">
            {coinList.map(coin => 
                <CoinLink key={coin.id} coinData={coin} />
            )}
        </div>
    )
}

const CoinLink = ({coinData}) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const newCoinData = (coinId) => {
        router.push(`/crypto/${coinId}`);
        dispatch(resetOverview());
        dispatch(resetPriceHistory());
        //get general data
        axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`)
        .then(result => {
            dispatch(updateOverview(result.data))
        }).catch(err => console.log(err))
        //get 30day price data
        axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30`)
        .then(result => {
            let priceArray = [];
            result.data.prices.forEach(price =>
                    priceArray.push({time: price[0], price: price[1]})
            )
            dispatch(updatePriceHistory(priceArray));
        }).catch(err => console.log(err))
    }

    return (
        <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-900 transition ease-in duration-300 hover:bg-yellow-600 cursor-pointer"
            onClick={() => newCoinData(coinData.id)}>
            <div className="w-8 h-8 relative">
                <Image className="object-cover" src={coinData.image} layout="fill" />
            </div>
            <h1>{coinData.symbol}</h1>
        </div>
    )
}