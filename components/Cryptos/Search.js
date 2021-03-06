import {useState, useEffect, useRef} from 'react'
import Link from 'next/link'
//spring
import {useSpring, animated} from 'react-spring'



const Search = ({coinList}) => {
    const [filterCoinList, setFilterCoinList] = useState(null);
    const [filterInput, setFilterInput] = useState('')

    //anims
    const fadeIn = useSpring({opacity: 1, from: {opacity: 0}});
    const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 3, tension: 400, friction: 40 } }))
    const inputBox = useRef(null);

    useEffect(() => {
        setFilterCoinList(coinList);
        if (filterCoinList) {
            let newFilterCoinList = coinList.filter(coin => coin.name.toLowerCase().includes(filterInput.toLowerCase()));
            setFilterCoinList(newFilterCoinList);
        }
    }, [filterInput])

    let rect; let calc; let trans;
    useEffect(() => {
        rect = inputBox.current.getBoundingClientRect();
    })

    calc = (x, y) => [-(y - (rect.y + rect.height/2)) / 100, (x - (rect.x + rect.width/2)) / 200, 1.1]
    trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

    return (
        <animated.div style={fadeIn}>
            {/* <h1 className="mb-4 text-4xl">Search a cryptocurrency:</h1> */}
            <animated.div className="w-11/12 mx-auto px-4 relative z-40" ref={inputBox}
                onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
                onMouseLeave={() => set({ xys: [0, 0, 1] })}
                style={{ transform: props.xys.interpolate(trans) }}>
                <input className="w-full p-4 md:p-8 text-gray-800 text-center text-xl md:text-3xl rounded-xl shadow focus:outline-none"
                    type="text" placeholder="Search a cryptocurrency..."
                    value={filterInput} onChange={(e) => setFilterInput(e.target.value)} />
                <div className="w-11/12 max-h-80 absolute mt-4 overflow-y-auto rounded-xl shadow bg-gray-600
                    scrollbar-thin scrollbar-thumb-yellow-600 scrollbar-track-gray-400">
                    {filterCoinList && filterInput !== '' && filterCoinList.map(coin => 
                        <Link href="/crypto/[id]" as={`/crypto/${coin.id}`}>
                        <p key={coin.id} className="block p-2 cursor-pointer hover:text-gray-800 hover:bg-gray-400">{coin.name}</p>
                        </Link>
                    )}
                </div>
            </animated.div>
        </animated.div>
    )
}

export default Search