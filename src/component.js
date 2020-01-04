import React from 'react'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'
import { animateScroll as scroll } from "react-scroll";



const Component = (props) => {

   /**
   * Function for scrolling to top when link is clicked
   */
  const scrollToTop = () => {
    scroll.scrollToTop();
  }

  /**
   * Function for clicking link
   */
  const handleClick = () => {
    scrollToTop()
  }

  const LinkDependencies = props.deps.map(item => <li><Link to={item.path} onClick={handleClick}>{item.dependency}</Link></li>)

  const LinkReverseDependencies = props.revdeps.map(item => <li><Link to={item.path} onClick={handleClick}>{item.reversedependency}</Link></li>)

  return(
    <>
      <div>
        <h1>{props.name}</h1>
      </div>
      <div>
        <h2>description:</h2>
        {props.description}
      </div>
      <div>
        <h2>dependencies:</h2>
        {LinkDependencies}
      </div>
      <div>
        <h2>reverse dependencies:</h2>
        {LinkReverseDependencies}
      </div>
    </>
  )
}

export default Component