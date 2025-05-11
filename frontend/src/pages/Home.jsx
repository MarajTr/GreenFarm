import React from 'react'
import Header from '../components/Header'
import Support from '../components/HomeComponent/Support'
import Workflow from '../components/HomeComponent/workFlow'
import Ads from '../components/HomeComponent/ads'
import Service from '../components/HomeComponent/Service'
import State from '../components/HomeComponent/State'
import Equipment from '../components/HomeComponent/Equipment'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
function home() {
  return (
    <div>
        <Navbar/>
        <Header/>
        <Support/>
        <Workflow/>
        <Ads/>
        <Service/>
        <State/>
        <Equipment/>
        <Footer/>
    </div>
  )
}

export default home