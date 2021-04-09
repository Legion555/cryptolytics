import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
//reCharts
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip} from 'recharts';
//spring
import {useSpring, animated} from 'react-spring'
//icons
import {BiLoader} from 'react-icons/bi'



const Search = () => {
    const [marketData, setMarketData] = useState(null)

    //anims
    const fadeIn = useSpring({opacity: 1, from: {opacity: 0}});

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/global')
        .then(result => {
            setMarketData(result.data.data)
        }).catch(err => console.log(err))
    }, [])

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function parsePieData() {
        let marketCapPercentage = [];
        let keys = Object.keys(marketData.market_cap_percentage);
        let vals = Object.values(marketData.market_cap_percentage);
        keys.slice(0,5).forEach((key, index) => 
            marketCapPercentage.push({name: key, percentage: Math.floor(vals[index])})
        )
        return marketCapPercentage;
    }

    return (
        <animated.div style={fadeIn} className="flex flex-col md:flex-row justify-evenly gap-5 md:gap-10">
            <div className="w-full h-48 md:h-64 xl:h-80 flex flex-col justify-center items-center gap-2 py-2 rounded-xl shadow bg-gray-800">
                <div>
                    <h1>Total Market Cap</h1>
                    <p className="text-center text-4xl">{marketData ? `$${numberWithCommas(Math.floor(marketData.total_market_cap.usd/1000000000))} B` : 'Loading'}</p>
                </div>
                <div>
                    <h1>Total Volume</h1>
                    <p className="text-center text-4xl">{marketData ? `$${numberWithCommas(Math.floor(marketData.total_volume.usd/1000000000))} B` : 'Loading'}</p>
                </div>
            </div>
            <div className="w-full h-64 xl:h-80 flex flex-col justify-center items-center py-2 rounded-xl shadow bg-gray-800">
                <h1>Market Cap Share (%)</h1>
                {!marketData ?
                    <div>
                        <BiLoader className="animate-spin-slow duration-1000 text-4xl" />
                    </div>
                    :
                    <ResponsiveContainer width="100%" height="90%">
                        <BarChart
                            data={marketData && parsePieData()}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 5,
                                bottom: 5,
                            }}
                            barSize={20}
                            >
                        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                        <YAxis />
                        <Tooltip />
                        <CartesianGrid strokeDasharray="5 5" />
                        <Bar dataKey="percentage" fill="#8884d8" background={{ fill: '#111' }} />
                        </BarChart>
                    </ResponsiveContainer>
                }
            </div>
        </animated.div>
    )
}

export default Search