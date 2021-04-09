import { useState, useEffect } from "react"
import axios from 'axios';
//components
import Search from '../components/Cryptos/Search'
import Top from '../components/Cryptos/Top'
import Market from '../components/Cryptos/Market'



const Index = () => {
    const [coinList, setCoinList] = useState(null)

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false')
        .then(result => {
            setCoinList(result.data)
        }).catch(err => console.log(err))
    }, [])

    return (
        <div className="w-full min-h-screen flex justify-center pb-8 md:pb-2 pt-8 md:pt-16 text-gray-200 bg-gray-900">
            <div className="w-full md:w-10/12 xl:w-9/12 px-2 flex flex-col gap-5 md:gap-10">
                <Search coinList={coinList} />
                <Market />
                <Top coinList={coinList} />
            </div>
        </div>
    )
}

export default Index