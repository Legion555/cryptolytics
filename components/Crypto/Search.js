import {useState, useEffect} from 'react'
import axios from 'axios'
import {useRouter} from 'next/router'
//redux
import {useSelector, useDispatch} from 'react-redux'
import {updateOverview, resetOverview, updatePriceHistory, resetPriceHistory} from '../../slices/coinDataSlice'



export default function Search() {
    const router = useRouter();
    const dispatch = useDispatch();
    const relatedCoins = useSelector(state => state.coinData.value.related);
    
    const [filterCoinList, setFilterCoinList] = useState(null);
    const [filterInput, setFilterInput] = useState('')

    useEffect(() => {
        setFilterCoinList(relatedCoins);
        if (filterCoinList) {
            let newFilterCoinList = relatedCoins.filter(coin => coin.name.toLowerCase().includes(filterInput.toLowerCase()));
            setFilterCoinList(newFilterCoinList);
        }
    }, [filterInput])

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
        setFilterInput('');
    }

    return (
        <div className="relative">
            <input className="p-2 text-gray-800 rounded-xl focus:outline-none" type="text" placeholder="search..."
                value={filterInput} onChange={(e) => setFilterInput(e.target.value)} />
            {/* <input className="w-full p-4 md:p-8 text-gray-800 text-center text-xl md:text-3xl rounded-xl shadow focus:outline-none"
                    type="text" placeholder="Search a cryptocurrency..."
                    value={filterInput} onChange={(e) => setFilterInput(e.target.value)} /> */}
            <div className="w-full max-h-80 absolute right-0 mt-2 overflow-y-auto rounded-xl shadow bg-gray-600
                scrollbar-thin scrollbar-thumb-yellow-600 scrollbar-track-gray-400">
                {filterCoinList && filterInput !== '' && filterCoinList.map(coin => 
                    <p key={coin.id} className="block p-2 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
                        onClick={() => newCoinData(coin.id)}>{coin.name}</p>
                )}
            </div>
        </div>
    )
}