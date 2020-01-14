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
import Error from './error.js'
import replaced from './replaced.js'

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
      depend = depend.split("~").join("")
      depend = depend.split("  ").join(" ")

      // Turns string into array from where i remove everything else but alternates
      let d = depend.split(", ").join(",")
      let depend2 = d.split(",")

      // Removes commas that are not needed
      depend = depend.split(",").join("")

      // Here I turn the string into an array from where i remove the alternates
      let depend1 = depend.split(" ")
      
      // Removes cases from the depend1 array where version numbers for example for Python3 are given in the end of the string like "Python3:any"
      for(let j = 0; j < depend1.length; j++){
        if(depend1[j].indexOf(":") !== -1){
          depend1[j] = depend1[j].substring(0, depend1[j].indexOf(":"))
        }
      } 

      // Removes alternates
      for(let j = depend1.length - 1; j >= 0; j--){
        if(depend1[j] === "|"){
          depend1.splice(j - 1, 3)
        }   
      }

      // Removes duplicates
      depend1 = [...new  Set(depend1)]

      // Removes items that are not alternates
      for(let j = depend2.length - 1; j >= 0; j--){
        if(depend2[j].indexOf("|") === -1){
          depend2.splice(j, 1)
        }
      }
      
      //console.log(depend2)
      //console.log(depend1)
      
      let missing = ["console-setup-freebsd", "cdebconf", "cgroup-lite", "hurd", "gpgv1", "ifupdown", "anacron", "console-tools"]

      // Creates paths for alternates and checks if any of the packages are replaced by some another package
      for(let j = depend2.length - 1; j >= 0; j--){
        let a = depend2[j].split(" ")
        let b = []
        
        
        for(let k = 0; k < a.length; k++){
          let x = 0
          if(a[k].indexOf("|") === -1){
            let object = {}

            for(let l = 0; l < missing.length; l++){
              if(a[k] === missing[l]){
                x = 1
              }
            }
            for(let l = 0; l < replaced.length; l++){
              if(replaced[l].replaces === a[k]){
                if(k === a.length - 1){
                  object = {
                    dependency: a[k],
                    path: `${replaced[l].package}`,
                    or: ""
                  }
                }
                else{
                  object = {
                    dependency: a[k],
                    path: `${replaced[l].package}`,
                    or: " or"
                  }
                }
                x = 2
              }
            }
            if(x === 1){
              if(k !== a.length - 1){
                object = {
                  dependency: a[k],
                  path: `/error`,
                  or: " or"
                }
              }
              else{
                object = {
                  dependency: a[k],
                  path: `/error`,
                  or: ""
                }
              }
            }
            else if(x === 0){
              if(k !== a.length -1){
                object = {
                  dependency: a[k],
                  path: `${a[k]}`,
                  or: " or "
                }
              }
              else{
                object = {
                  dependency: a[k],
                  path: `${a[k]}`,
                  or: ""
                }
              }
            }
            b.push(object)
          }
          
        }
        arr01.push(b)
      }
      
      console.log(arr01)

      // Creates objects from the items that are not alternates and pushes them to an array
      for(let j = 0; j < depend1.length; j++){
        let object = {}
        let x = 0
        for (let k = 0; k < missing.length; k++){
          if(depend1[j] === missing[k]){
            x = x + 1
          }
        }
        for(let k = 0; k < replaced.length; k++){
          if(replaced[k].replaces === depend1[j]){
            object = {
              dependency: depend1[j],
              path: `/${replaced[k].package}`
            }
            x = x + 2
          }
        }
        if(x === 1){
          object = {
            dependency: depend1[j],
            path: `/error`
          }
        }
        else if(x === 0){
          object = {
            dependency: depend1[j],
            path: `/${depend1[j]}`
          }
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
          <Route path="/error" render={() => <Error/>}/>
          {routeComponents}
        </div>
      </div>
    </Router>
  )
}

export default Routed