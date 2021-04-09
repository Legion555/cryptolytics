import { useEffect, useState } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'
//components
import ParticlesContainer from '../ParticlesContainer'
import Card from './Card'
//spring
import {useSpring, animated} from 'react-spring'



const Index = () => {
  const router = useRouter()
  //audio
  const [isPlaying, setIsPlaying] = useState<boolean >(true);
  const [audio] = useState(typeof Audio !== "undefined" && new Audio('/assets/audio-background.mp3'));
  //anims
  const fadeIn = useSpring({opacity: 1, from: {opacity: 0}, config: { duration: 1000 }});
  const fadeOut = useSpring({opacity: 0, from: {opacity: 1}, config: { duration: 1000 }});
  const lineExtend = useSpring({width: '100%', from: {width: '0%'}, config: { duration: 1500 }});
  const [leave, setLeave] = useState(false)
  
  // useEffect(() => {
  //   if(isPlaying) {
  //     audio.play();
  //   } else {
  //     audio.pause()
  //   }
  //   audio.volume = 0.1;
  // }, [isPlaying])

  const toCryptos = () => {
    router.push('/cryptos')
    // audio.pause()
    // setLeave(true)
    // setTimeout(() => {
    // }, 1e3)
  }
  
  return (
    <animated.div style={leave ? fadeOut : null} className="w-full h-screen relative bg-gray-800 overflow-hidden">
      <Head>
        <title>Cryptolytics</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full h-full absolute top-0 flex justify-center items-center">
        <div className="w-full px-4 lg:w-10/12 xl:w-8/12">
          <div className="flex flex-col items-center">
            <animated.h1 style={fadeIn} className="p-4 text-yellow-400 text-4xl md:text-6xl lg:text-8xl text-center">CRYPTOLYTICS</animated.h1>
            <animated.div style={lineExtend} className="h-1 md:h-2 bg-yellow-400"/>
            <animated.h1 style={fadeIn} className="p-4 text-gray-200 text-2xl md:text-4 lg:text-6xl text-center">Welcome to the future</animated.h1>
          </div>
          <div className="mt-8 flex flex-col md:flex-row justify-center gap-5 md:gap-20">
            <Card name={'Learn'} imageUrl={'/assets/intro_1.jpg'} cta={toCryptos}  />
            <Card name={'Cryptos'} imageUrl={'/assets/intro_2.jpg'} cta={toCryptos} />
          </div>
        </div>
        
      </div>

      <ParticlesContainer />

      {/* <div className="w-max h-max absolute top-4 right-4">
        <MdEqualizer className="text-2xl text-green-400 cursor-pointer" onClick={() => setIsPlaying(false)} />
      </div> */}

    </animated.div>
  )
}

export default Index