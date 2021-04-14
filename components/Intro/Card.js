import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
//spring
import {useSpring, animated} from 'react-spring'



const Card =({name, imageUrl, url}) => {
    const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 3, tension: 400, friction: 40 } }))
    const cardElem = useRef(null);
    const [audio] = useState(typeof Audio !== "undefined" && new Audio('/assets/audio-hover.wav'));
    

    let rect; let calc; let trans;
    useEffect(() => {
        rect = cardElem.current.getBoundingClientRect();
    })

    calc = (x, y) => [-(y - (rect.y + rect.height/2)) / 18, (x - (rect.x + rect.width/2)) / 18, 1.1]
    trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

    const playSound = () => {
      audio.play();
      audio.volume = 0.3;
    }
    
    return (
      <Link href={url} >
      <animated.div className={`w-full h-64 lg:h-80 relative shadow`} ref={cardElem}
        onMouseEnter={playSound}
        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        style={{ transform: props.xys.interpolate(trans) }}
      >
        <Image className="object-cover" src={imageUrl} layout="fill" />
        <div className="w-full h-full absolute flex justify-center items-center
          text-gray-200 bg-gray-900 bg-opacity-50 hover:text-yellow-400 hover:bg-opacity-0 transition ease-in duration-300">
          <h1 className="text-6xl select-none">{name}</h1>
        </div>
      </animated.div>
      </Link>
    )
}

export default Card