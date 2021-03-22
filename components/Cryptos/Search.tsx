import {useState, useEffect, useRef} from 'react'
//spring
import {useSpring, animated} from 'react-spring'



const Search = ({coinList}) => {
    const [filterCoinList, setFilterCoinList] = useState(null);
    const [filterInput, setFilterInput] = useState('')

    //anims
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
        <div>
            {/* <h1 className="mb-4 text-4xl">Search a cryptocurrency:</h1> */}
            <animated.div className="mb-8 relative z-40" ref={inputBox}
                onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
                onMouseLeave={() => set({ xys: [0, 0, 1] })}
                style={{ transform: props.xys.interpolate(trans) }}>
                <input className="w-full p-8 text-gray-800 text-center text-4xl rounded-xl shadow focus:outline-none"
                    type="text" placeholder="Search a cryptocurrency..."
                    value={filterInput} onChange={(e) => setFilterInput(e.target.value)} />
                <div className="w-full max-h-80 absolute mt-4 overflow-y-auto rounded-xl shadow bg-gray-600
                    scrollbar-thin scrollbar-thumb-yellow-600 scrollbar-track-gray-400">
                    {filterCoinList && filterInput !== '' && filterCoinList.map(coin => 
                        <p key={coin.id} className="block p-2 cursor-pointer hover:text-gray-800 hover:bg-gray-400">{coin.name}</p>
                    )}
                </div>
            </animated.div>
        </div>
    )
}

export default Search