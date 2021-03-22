import {useState, useEffect, useRef} from 'react'



const Search = ({coinList}) => {

    return (
        <div className="z-0">
            <h1 className="text-4xl text-center">Highest Market Cap:</h1>
            <div className="mt-4 flex justify-evenly gap-5 md:gap-10 flex-wrap">
                {coinList && coinList.slice(0,10).map(coin => 
                    <div key={coin.name} className="w-24 md:w-32 h-24 md:h-32 flex justify-center items-center rounded-full shadow bg-gray-900
                        transform hover:scale-110 transition ease-in duration-150 cursor-pointer"
                        style={{backgroundImage: `url(${coin.image})`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
                        <h1 className="w-max p-2 rounded-xl bg-gray-800 bg-opacity-75">{coin.name}</h1>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Search