import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'
import data from './status/data'
import revdeps from './status/reversedata'
import './index.css'
import { animateScroll as scroll } from "react-scroll";
import Component from './component.js'
import Home from './home.js'

const Routed = () => {

  const [routes, setRoutes] = useState([])


  //Function for scrolling to top when link is clicked
  const scrollToTop = () => {
    scroll.scrollToTop();
  }

  
  // Function for clicking link
  const handleClick = () => {
    scrollToTop()
  }

  
  //Before the component renders, all the data is modified
  useEffect(() => {

    
    //An empty array to be filled with objects that contain data about packages
    const arr = []
    
    //Loops through all the packages
    for(let i = 0; i < data.length; i++){
      
      // Arrays for objects that contain path and package name for dependencies and reverse dependencies
      const arr0 = []
      const arr1 = []


      let revdep = revdeps[i].Depends

      // Loops through reverse dependencies and creates objects from them
      for (let a = 0; a < revdep.length; a++){
        let object = {
          reversedependency: revdep[a],
          path: `/${revdep[a]}`
        }
        arr1.push(object)
      }

      //Checks if the package has any dependencies
      let depend = ""
      if(!!data[i].Depends){
        depend = data[i].Depends
      }
      else{
        depend = ""
      }

      //Removes version numbers and other characters that are not needed
      let depend1 = depend
      let depend2 = depend1.split(" ")

      for(let j = 0; j < depend2.length; j++){
        if(depend2[j].charAt(depend2[j].length - 1) === ","){
          depend2[j] = depend2[j].substring(0, depend2[j].length - 1)
        }
      }   

      for(let k = 0; k < depend2.length; k++){
        if(depend2[k].indexOf("(") !== -1){
          depend2.splice(k, 1)
        }
      }

      for(let l = 0; l < depend2.length; l++){
        if(depend2[l].indexOf(")") !== -1){
          depend2.splice(l, 1)
        }
      }

      for(let m = 0; m < depend2.length; m++){
        if(depend2[m].indexOf("|") !== -1){
          depend2.splice(m, 1)
        }
      }  

      for(let n = 0; n < depend2.length; n++){
        let object = {
          dependency: depend2[n],
          path: `/${depend2[n]}`
        }
        arr0.push(object)
      }

      // Makes objects that contain required data
      let singleObject = {
        id: i,
        path: `/${data[i].Package}`,
        name: `${data[i].Package}`,
        description: `${data[i].Description}`,
        deps: arr0,
        revdeps: arr1
      }
      arr.push(singleObject)
    }
    setRoutes(arr)
  }, [])

  // Creates routes for all the packages and defines routes to components
  const routeComponents = routes.map(item => <Route 
                                              path={item.path} 
                                              key={item.id} 
                                              render={() => <Component 
                                                              name={item.name} 
                                                              description={item.description} 
                                                              deps={item.deps} 
                                                              revdeps={item.revdeps}
                                                              />} 
                                                              />)

  
  // Creates links to all the components 
  const LinkComponents = routes.map(item => <li>
                                              <Link 
                                                to={item.path} 
                                                onClick={handleClick} 
                                                id={item.id} 
                                                key={item.id}>
                                                  {item.name}
                                                </Link>
                                              </li>)
  
  // returns the whole app that is rendered in index.js
  return(
    <Router>
      <div className="view">
        <div className="routes">
          <Link to="/">home</Link>
          {LinkComponents}
        </div>
        <div className="components">
          <Route exact path="/" render={() => <Home/>}/>
          {routeComponents}
        </div>
      </div>
    </Router>
  )
}

export default Routed