import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
//reCharts
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip} from 'recharts';



const Search = () => {
    const [marketData, setMarketData] = useState(null)

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
        let keys: Array<any> = Object.keys(marketData.market_cap_percentage);
        let vals: Array<any> = Object.values(marketData.market_cap_percentage);
        keys.slice(0,5).forEach((key, index) => 
            marketCapPercentage.push({name: key, percentage: Math.floor(vals[index])})
        )
        return marketCapPercentage;
    }

    return (
        <div className="flex flex-col md:flex-row justify-evenly gap-5 md:gap-10">
            <div className="w-full h-full flex flex-col justify-center items-center gap-2 py-2 rounded-xl shadow bg-gray-900">
                <div>
                    <h1>Total Market Cap</h1>
                    <p className="text-center text-4xl">${marketData && numberWithCommas(Math.floor(marketData.total_market_cap.usd/1000000000))} B</p>
                </div>
                <div>
                    <h1>Total Volume</h1>
                    <p className="text-center text-4xl">${marketData && numberWithCommas(Math.floor(marketData.total_volume.usd/1000000000))} B</p>
                </div>
            </div>
            <div className="w-full h-full flex flex-col justify-center items-center py-2 rounded-xl shadow bg-gray-900">
                <h1>Market Cap Share (%)</h1>
                <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={200}
                    height={200}
                    data={marketData && parsePieData()}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
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
            </div>
        </div>
    )
}

export default Search