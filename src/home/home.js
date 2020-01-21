import React from 'react'
import home from './homepic.png'
import './home.css'

// Component for the home page 
const Home = () => {
  return(
    <>
      <img className="homepic" src={home} alt="home"></img>
    </>
  )
}

export default Home