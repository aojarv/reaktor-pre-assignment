import React from 'react'
import home from './home1.png'
import './index.css'

// Component for the home page 
const Home = () => {
  return(
    <>
      <h1><img className="homepic" src={home} alt="home"></img></h1>
    </>
  )
}

export default Home