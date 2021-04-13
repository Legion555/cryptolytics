import { useEffect, useState } from 'react';
//reCharts
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
//redux
import {useSelector} from 'react-redux'
//icons
import {BiLoader} from 'react-icons/bi'



export default function PriceChart() {
    const twentyfourHourPrice = useSelector(state => state.coinData.value.priceHistory.slice(state.coinData.value.priceHistory.length - 24));
    const thirtyDayPrice = useSelector(state => state.coinData.value.priceHistory.slice(state.coinData.value.priceHistory.length - 720));
    const ninetyDayPrice = useSelector(state => state.coinData.value.priceHistory);
    
    const [view, setView] = useState('thirty')

    const parseDate = (date) => {
        let tempDate = new Date(date);
        let newDate = tempDate.toString();
        let day = newDate.slice(0,3);
        let time = newDate.slice(16,21)
        return `${day} ${time}`
    }

    const parseData = () => {
        switch (view) {
            case 'twentyfour':
                return twentyfourHourPrice;
            case 'thirty':
                return thirtyDayPrice;
            case 'ninety':
                return ninetyDayPrice;
            default:
                break;
        }
    }

    const buttonStyle = `p-2 text-center md:text-xl text-gray-100 bg-gray-900 rounded-xl hover:bg-yellow-600 focus:outline-none`

    return (
        <div className="w-full p-2 md:p-4 bg-gray-800" style={{height: '400px'}}>
            <div className="w-full mb-2 flex items-center">
                <div className="w-full h-1 bg-yellow-600" />
                <h1 className="whitespace-nowrap mx-2 text-center text-2xl text-gray-100">Price History</h1>
                <div className="w-full h-1 bg-yellow-600" />
            </div>
            <div className="mb-2 flex justify-center gap-4 md:gap-8">
                <button className={`${buttonStyle} ${view === 'twentyfour' && 'bg-yellow-600'}`}
                    onClick={() => {
                    setView('twentyfour');
                    }} >24 Hours</button>
                <button className={`${buttonStyle} ${view === 'thirty' && 'bg-yellow-600'}`}
                    onClick={() => {
                    setView('thirty');
                    }} >30 Days</button>
                <button className={`${buttonStyle} ${view === 'ninety' && 'bg-yellow-600'}`}
                    onClick={() => {
                    setView('ninety');
                    }} >90 Days</button>
            </div>
            {ninetyDayPrice !== [] ?
            <ResponsiveContainer width="100%" height="80%">
                <LineChart data={parseData()} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tickFormatter={(time) => parseDate(time)} minTickGap={15} />
                <YAxis dataKey="price" type="number" domain={[dataMin => (dataMin * 0.99), dataMax => (dataMax * 1.01)]}
                    tickFormatter={(price) => `$${Math.floor(price*100)/100}`} />
                <Tooltip content={<CustomTooltip />} />
                {/* <Legend /> */}
                <Line type="monotone" dataKey="price" stroke="#82ca9d" r="0" />
                </LineChart>
            </ResponsiveContainer>
            :
            <div>
                <BiLoader className="animate-spin-slow duration-1000 text-4xl" />
            </div>
            }
        </div>
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
}