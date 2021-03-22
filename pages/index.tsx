import { useState } from 'react';
import Head from 'next/head'
import Router from 'next/router'
//components
import Intro from '../components/Intro'
//icons
import {MdEqualizer} from 'react-icons/md'




export default function Home() {
  
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