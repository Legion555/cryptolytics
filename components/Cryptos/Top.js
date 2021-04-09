import {useState, useEffect, useRef} from 'react'
import Link from 'next/link'
//spring
import {useSpring, animated} from 'react-spring'
//icons
import {BiLoader} from 'react-icons/bi'



const Search = ({coinList}) => {
    
    //anims
    const fadeIn = useSpring({opacity: 1, from: {opacity: 0}});

    return (
        <animated.div style={fadeIn} className="z-0">
            <h1 className="text-4xl text-center">Highest Market Cap:</h1>
            <div className="mt-4 flex justify-center gap-5 md:gap-10 flex-wrap">
                {coinList ? coinList.slice(0,10).map(coin => 
                    <Link href="/crypto/[id]" as={`/crypto/${coin.id}`} >
                    <div key={coin.name} className="w-24 md:w-32 h-24 md:h-32 flex justify-center items-center rounded-full shadow bg-gray-800
                        transform hover:scale-110 transition ease-in duration-150 cursor-pointer"
                        style={{backgroundImage: `url(${coin.image})`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
                        <h1 className="w-max p-2 rounded-xl bg-gray-800 bg-opacity-75">{coin.name}</h1>
                    </div>
                    </Link>
                )
                :
                    <BiLoader className="animate-spin-slow duration-1000 text-4xl" />
                }
            </div>
        </animated.div>
    )
}

export default Search