import Image from 'next/image'
import { useRouter } from 'next/router'
//redux
import {useSelector} from 'react-redux'



export default function Nav({coinList}) {
    const coinData = useSelector(state => state.coinData.value);

    return (
        <div className="w-full h-16 px-4 py-2 flex items-center text-gray-200 bg-gray-800">
            <div className="mr-8 flex">
                {coinData &&
                    <div className="w-8 h-8 relative mr-4">
                        <Image className="object-contain" src={coinData.image.large} layout="fill" />
                    </div>
                }
                <h1 className="mr-2 text-center text-2xl font-bold">{coinData && coinData.name}</h1>
                <p className="text-center text-xl text-gray-500">{coinData && coinData.symbol}</p>
            </div>
            {/* <div className="flex gap-2">
                <h3 className="p-1 text-gray-800 bg-yellow-400 border-l-4 border-gray-800">Overview</h3>
                <h1 className="p-1">News</h1>
            </div> */}
            <div className="flex gap-2">
                {coinList &&
                    <CoinLinks coinList={coinList.slice(0,5)} />
                }
            </div>
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

    return (
        <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-900"
            onClick={() => router.push(`/crypto/${coinData.id}`)}>
            <div className="w-8 h-8 relative">
                <Image className="object-cover" src={coinData.image} layout="fill" />
            </div>
            <h1>{coinData.symbol}</h1>
        </div>
    )
}