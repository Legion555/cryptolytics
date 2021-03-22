import { useState, useEffect } from "react"
import axios from 'axios';
//components
import Search from '../components/Cryptos/Search'
import Top from '../components/Cryptos/Top'
import Market from '../components/Cryptos/Market'
//spring
import {useSpring, animated} from 'react-spring'



const Index = () => {
    const [coinList, setCoinList] = useState(null)
    //anims
    const fadeIn = useSpring({opacity: 1, from: {opacity: 0}, config: { duration: 1000 }});

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false')
        .then(result => {
            setCoinList(result.data)
        }).catch(err => console.log(err))
    }, [])

    return (
        <animated.div style={fadeIn} className="w-full h-screen flex justify-center pt-16 text-gray-200 bg-gray-800">
            <div className="w-6/12 flex flex-col gap-10">
                <Market />
                <Search coinList={coinList} />
                <Top coinList={coinList} />
            </div>
        </animated.div>
    )
}

export default Index