import Head from 'next/head'
//components
import ParticlesContainer from '../components/ParticlesContainer'
import Card from '../components/Intro/Card'
import {useSpring, animated} from 'react-spring' //react spring



export default function Home() {
  const fadeIn = useSpring({opacity: 1, from: {opacity: 0}, config: { duration: 1000 }});
  const lineExtend = useSpring({width: '100%', from: {width: '0%'}, config: { duration: 2000 }});
  
  return (
    <div className="w-full h-screen relative bg-gray-800">
      <Head>
        <title>Cryptolytics</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full h-full absolute top-0 flex justify-center items-center">
        <div className="w-full px-4 lg:w-10/12 xl:w-8/12">
          <div className="flex flex-col items-center">
            <animated.h1 style={fadeIn} className="p-4 text-yellow-400 text-4xl md:text-6xl lg:text-8xl text-center">Welcome to the future</animated.h1>
            <animated.div style={lineExtend} className="h-1 md:h-2 bg-yellow-400"/>
          </div>
          <div className="mt-8 flex flex-col md:flex-row justify-center gap-5 md:gap-20">
            <Card name={'Learn'} imageUrl={'/assets/intro_1.jpg'} url={'/'} />
            <Card name={'Cryptos'} imageUrl={'/assets/intro_2.jpg'} url={'/'} />
          </div>
        </div>
        
      </div>

      <ParticlesContainer />

    </div>
  )
}