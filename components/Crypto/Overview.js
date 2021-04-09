import { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Markup } from 'react-render-markup';
//functions
import {numberWithCommas} from '../../functions/numberWithCommas'
//redux
import {useSelector} from 'react-redux'



export default function Overview({coinId}) {
    const coinData = useSelector(state => state.coinData.value);
   
    const [graphData, setGraphData] = useState([]);

    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30`)
        .then(result => {
            let priceArray = [];
            result.data.prices.forEach(price =>
                    priceArray.push({time: price[0], price: price[1]})
            )
            setGraphData(priceArray)
        }).catch(err => console.log(err))
    }, [])

    const parseAmount = (amt) => {
        if (amt > 1000000000) {
            return `${Math.floor(amt/10000000)/100} B`;
        } else if (amt > 1000000) {
            return `${Math.floor(amt/10000)/100} M`;
        } else if (amt > 1000) {
            return `${Math.floor(amt/10)/100} T`;
        } else {
            return amt;
        }
    }

    // function parseGraphData() {
    //     let priceArray = [];
    //     let keys = Object.keys(marketData.market_cap_percentage);
    //     let vals = Object.values(marketData.market_cap_percentage);
    //     keys.slice(0,5).forEach((key, index) => 
    //         marketCapPercentage.push({name: key, percentage: Math.floor(vals[index])})
    //     )
    //     return marketCapPercentage;
    // }

    return (
        <div className="p-4 flex flex-col justify-between gap-4">
            <div className="flex justify-between gap-4">
                {/* Key data */}
                <div className={`w-full h-64 text-gray-200 bg-gray-800 overflow-hidden`} >
                {coinData &&
                    <div className="w-full h-full p-4 flex flex-col">
                        <div className="w-full flex items-center">
                            <h1 className="mr-2 text-2xl whitespace-nowrap">Key Data</h1>
                            <div className="w-full h-1 bg-blue-400" />
                        </div>
                        <div className="py-4 flex gap-4 border-b-2 border-blue-400">
                            <div className="w-full">
                                <h1 className="xl:mb-2 text-sm xl:text-base text-gray-300">Price</h1>
                                {coinData &&
                                    <p className="text-xl xl:text-2xl">${coinData.market_data.current_price.usd < 0 ? coinData.market_data.current_price.usd : numberWithCommas(coinData.market_data.current_price.usd)}</p>
                                }
                            </div>
                            <div className="w-full">
                                <h1 className="xl:mb-2 text-sm xl:text-base text-gray-300">24h Change</h1>
                                {coinData &&
                                    <p className={`text-xl xl:text-2xl ${coinData.market_data.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {numberWithCommas(Math.floor(coinData.market_data.price_change_percentage_24h*100)/100)}%</p>
                                }
                            </div>
                            <div className="w-full">
                                <h1 className="xl:mb-2 text-sm xl:text-base text-gray-300">7d Change</h1>
                                {coinData &&
                                    <p className={`text-xl xl:text-2xl ${coinData.market_data.price_change_percentage_7d > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {numberWithCommas(Math.floor(coinData.market_data.price_change_percentage_7d*100)/100)}%</p>
                                }
                            </div>
                            <div className="w-full">
                                <h1 className="xl:mb-2 text-sm xl:text-base text-gray-300">1y change</h1>
                                {coinData &&
                                    <p className={`text-xl xl:text-2xl ${coinData.market_data.price_change_percentage_1y > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {numberWithCommas(Math.floor(coinData.market_data.price_change_percentage_1y*100)/100)}%</p>
                                }
                            </div>
                        </div>
                        <div className="py-4 flex gap-4">
                            <div className="w-full">
                                <h1 className="xl:mb-2 text-sm xl:text-base text-gray-300">Market Cap</h1>
                                {coinData &&
                                    <p className="text-xl xl:text-2xl">${numberWithCommas(parseAmount(coinData.market_data.market_cap.usd))}</p>
                                }
                            </div>
                            <div className="w-full">
                                <h1 className="xl:mb-2 text-sm xl:text-base text-gray-300">Circulating supply</h1>
                                {coinData &&
                                    <p className="text-xl xl:text-2xl">${numberWithCommas(parseAmount(coinData.market_data.circulating_supply))}</p>
                                }
                            </div>
                            <div className="w-full">
                                <h1 className="xl:mb-2 text-sm xl:text-base text-gray-300">Volume (24h)</h1>
                                {coinData &&
                                    <p className="text-xl xl:text-2xl">${numberWithCommas(parseAmount(coinData.market_data.total_volume.usd))}</p>
                                }
                            </div>
                        </div>
                    </div>
                }
                </div>
                {/* About */}
                <div className={`w-9/12 h-64 p-4 text-justify text-gray-300 bg-gray-800 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800`}  >
                    <div>
                        <div className="w-full flex items-center">
                            <h1 className="text-2xl mr-2 text-gray-200">About</h1>
                            <div className="w-full h-1 bg-yellow-400" />
                        </div>
                        <Markup markup={coinData && coinData.description.en} />
                    </div>
                </div>
            </div>
            {/* Price Chart */}
            <div className="w-full h-80 bg-gray-800">
                <PriceChart graphData={graphData} />
            </div>
        </div>
    )
}

const PriceChart = ({graphData}) => {
    const parseDate = (date) => {
        let tempDate = new Date(date);
        let newDate = tempDate.toString();
        let day = newDate.slice(0,3);
        let time = newDate.slice(16,21)
        return `${day} ${time}`
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
            data={graphData}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey="time" tickFormatter={(time) => parseDate(time)} minTickGap={15} />
            <YAxis dataKey="price" type="number" domain={[dataMin => (dataMin * 0.9), dataMax => (dataMax * 1.1)]}
                tickFormatter={(price) => `$${Math.floor(price*100)/100}`} />
            <Tooltip content={<CustomTooltip />} />
            {/* <Legend /> */}
            <Line type="monotone" dataKey="price" stroke="#82ca9d" r="0" />
            </LineChart>
        </ResponsiveContainer>
    )
}

const CustomTooltip = ({ active, payload, label }) => {
    const parseDate = (date) => {
        let tempDate = new Date(date);
        let newDate = tempDate.toString();
        let day = newDate.slice(0,3);
        let time = newDate.slice(16,21)
        return `${newDate}`
    }

    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-200 p-4">
          <p className="label">${Math.floor(payload[0].value*100)/100}</p>
          <p className="intro">{parseDate(label)}</p>
        </div>
      );
    }
  
    return null;
  };