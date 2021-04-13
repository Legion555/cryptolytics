import { useState } from 'react';
import Head from 'next/head'
import Router from 'next/router'
//components
import Intro from '../components/Intro'
//icons
import {MdEqualizer} from 'react-icons/md'

import {useSelector} from 'react-redux'




export default function Home() {
  const coinData = useSelector(state => state.coinData.value)
  console.log(coinData)
  
  return (
    <div className="w-full h-screen relative bg-gray-800">
      <Head>
        <title>Cryptolytics</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Intro />

    </div>
  )
}