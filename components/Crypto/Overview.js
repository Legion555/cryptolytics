import { Markup } from 'react-render-markup';
//functions
import {numberWithCommas} from '../../functions/numberWithCommas'
//redux
import {useSelector} from 'react-redux'
//components
import PriceChart from './PriceChart'
//icons
import {BiLoader} from 'react-icons/bi'



export default function Overview() {
    const coinData = useSelector(state => state.coinData.value.overview);

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
            <div className="flex flex-col md:flex-row justify-between gap-4">
                {/* Key data */}
                <div className={`w-full h-64 text-gray-200 bg-gray-800 overflow-hidden`} >
                    <div className="w-full h-full p-4 flex flex-col">
                        <div className="w-full flex items-center">
                            <h1 className="mr-2 text-2xl whitespace-nowrap">Key Data</h1>
                            <div className="w-full h-1 bg-blue-400" />
                        </div>
                        {coinData ?
                        <>
                        <div className="py-4 flex gap-4 border-b-2 border-blue-400">
                            <div className="w-full">
                                <h1 className="xl:mb-2 text-sm xl:text-base text-gray-300">Price</h1>
                                <p className="text-xl xl:text-2xl">${coinData.market_data.current_price.usd < 1 ? coinData.market_data.current_price.usd : numberWithCommas(coinData.market_data.current_price.usd)}</p>
                            </div>
                            <div className="w-full">
                                <h1 className="xl:mb-2 text-sm xl:text-base text-gray-300">24h Change</h1>
                                <p className={`text-xl xl:text-2xl ${coinData.market_data.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {numberWithCommas(Math.floor(coinData.market_data.price_change_percentage_24h*100)/100)}%</p>
                            </div>
                            <div className="w-full">
                                <h1 className="xl:mb-2 text-sm xl:text-base text-gray-300">7d Change</h1>
                                <p className={`text-xl xl:text-2xl ${coinData.market_data.price_change_percentage_7d > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {numberWithCommas(Math.floor(coinData.market_data.price_change_percentage_7d*100)/100)}%</p>
                            </div>
                            <div className="w-full">
                                <h1 className="xl:mb-2 text-sm xl:text-base text-gray-300">1y change</h1>
                                <p className={`text-xl xl:text-2xl ${coinData.market_data.price_change_percentage_1y > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {numberWithCommas(Math.floor(coinData.market_data.price_change_percentage_1y*100)/100)}%</p>
                            </div>
                        </div>
                        <div className="py-4 flex gap-4">
                            <div className="w-full">
                                <h1 className="xl:mb-2 text-sm xl:text-base text-gray-300">Market Cap</h1>
                                <p className="text-xl xl:text-2xl">${numberWithCommas(parseAmount(coinData.market_data.market_cap.usd))}</p>
                            </div>
                            <div className="w-full">
                                <h1 className="xl:mb-2 text-sm xl:text-base text-gray-300">Circulating supply</h1>
                                <p className="text-xl xl:text-2xl">${numberWithCommas(parseAmount(coinData.market_data.circulating_supply))}</p>
                            </div>
                            <div className="w-full">
                                <h1 className="xl:mb-2 text-sm xl:text-base text-gray-300">Volume (24h)</h1>
                                <p className="text-xl xl:text-2xl">${numberWithCommas(parseAmount(coinData.market_data.total_volume.usd))}</p>
                            </div>
                        </div>
                        </>
                        :
                        <div>
                            <BiLoader className="animate-spin-slow duration-1000 text-4xl" />
                        </div>
                        }
                    </div>
                </div>
                {/* About */}
                <div className={`w-full md:w-9/12 h-64 p-4 text-justify text-gray-300 bg-gray-800 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800`}  >
                    <div>
                        <div className="w-full flex items-center">
                            <h1 className="text-2xl mr-2 text-gray-200">About</h1>
                            <div className="w-full h-1 bg-yellow-400" />
                        </div>
                        {coinData ?
                        <Markup markup={coinData && coinData.description.en} />
                        :
                        <div>
                            <BiLoader className="animate-spin-slow duration-1000 text-4xl" />
                        </div>
                        }
                    </div>
                </div>
            </div>
            {/* Price Chart */}
            <PriceChart />
        </div>
    )
}