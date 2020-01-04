import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'
import data from './status/data'
import reversedependencies from './status/reversedata'
import './index.css'
import Component from './component.js'
import Home from './home.js'
import handleClick from './handleclick.js'

const Routed = () => {

  // An empty array for the list of objects that contain data about packages
  const [routes, setRoutes] = useState([])
  
  //This all is done before the component renders
  useEffect(() => {
    const arr = []

    //Loops through all the packages. Inside this loop 
    for(let i = 0; i < data.length; i++){
      const arr0 = []
      const arr1 = []
      const arr01 = []
      let revdeps = reversedependencies[i].Depends

      //Checks if the package has any dependencies
      let depend = ""
      if(!!data[i].Depends){
        depend = data[i].Depends
      }
      else{
        depend = ""
      }
      
      // Removes version numbers
      let start = 0
      for(let i = depend.length - 1; i >= 0; i--){
        if(depend.charAt(i) === ")"){
          start = i
        }
        if(depend.charAt(i) === "("){
          depend = depend.substring(0, i - 1) + depend.substring(start + 1, depend.length)
        }
      }

      // Removes symbols that are not needed
      depend = depend.split("=").join("")
      depend = depend.split("<").join("")
      depend = depend.split(">").join("")
      depend = depend.split(",").join("")
      depend = depend.split("~").join("")
      depend = depend.split("  ").join(" ")

      // Here I turn the string into an array
      let depend1 = depend.split(" ")
      
      // Removes cases where version numbers for example for Python3 are given in the end of the string like "Python3:any"
      for(let j = 0; j < depend1.length; j++){
        if(depend1[j].indexOf(":") !== -1){
          depend1[j] = depend1[j].substring(0, depend1[j].indexOf(":"))
        }
      } 

      // Removes duplicates
      depend1 = [...new  Set(depend1)]
      
      console.log(depend1)

      let count = 0
      for(let j = depend1.length; j >= 0; j--){
        if(depend1[j] === "|"){
          count = count + 1
        }   
      }
      // NYT CASET JOISSA MONTA | -MERKKIÄ!!!!
      // NYT CASET JOISSA MONTA | -MERKKIÄ!!!!
      // NYT CASET JOISSA MONTA | -MERKKIÄ!!!!
      // NYT CASET JOISSA MONTA | -MERKKIÄ!!!!
      if(count === 1){
        let a = []
        let pos = depend1.indexOf("|")
        let obj1 = {
          dependency: depend1[pos - 1],
          path: `${depend1[pos - 1]}`
        }
        let obj2 = {
          dependency: depend1[pos + 1],
          path: `${depend1[pos + 1]}`
        }
        depend1.splice(pos - 1, 3)
        a.push(obj1)
        a.push(obj2)
        arr01.push(a)
      }
      //console.log(count)
      

      // Creates objects and pushes them to an array
      for(let j = 0; j < depend1.length; j++){
        let object = {
          dependency: depend1[j],
          path: `/${depend1[j]}`
        }
        arr0.push(object)
      }

      // Loops through reverse dependencies and creates objects from them
      for (let j = 0; j < revdeps.length; j++){
        let object = {
          reversedependency: revdeps[j],
          path: `/${revdeps[j]}`
        }
        arr1.push(object)
      }

      // Makes objects that contain required data
      let singleObject = {
        id: i,
        path: `/${data[i].Package}`,
        name: `${data[i].Package}`,
        description: `${data[i].Description}`,
        deps: arr0,
        alternates: arr01,
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
                                                              alternates={item.alternates}
                                                              />} 
                                                              />)

  
  // Creates links to all the components 
  const LinkComponents = routes.map(item => <li>
                                              <Link
                                                className="link" 
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
          <Link className="link" to="/"><h2>home</h2></Link>
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