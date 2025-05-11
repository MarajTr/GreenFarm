import React from 'react'
import Header from '../components/Header'
import Support from '../components/HomeComponent/Support'
import Workflow from '../components/HomeComponent/workFlow'
import Ads from '../components/HomeComponent/ads'
import Service from '../components/HomeComponent/Service'
import State from '../components/HomeComponent/State'
import Equipment from '../components/HomeComponent/Equipment'

function home() {
  return (
    <div>
        
        <Header/>
        <Support/>
        <Workflow/>
        <Ads/>
        <Service/>
        <State/>
        <Equipment/>

    </div>
  )
}

export default home