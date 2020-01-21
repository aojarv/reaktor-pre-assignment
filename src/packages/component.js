import React from 'react'
import { Link } from 'react-router-dom'
import handleClick from '../components/handleclick.js'

const Component = (props) => {

  // Link-component for rendering an alternate and "or" after it when needed
  const Linkki = (props) => {
    return(
      <div>
        <Link              
          className="link"
          to={props.path} 
          onClick={handleClick}
        >
        {props.dependency}
        </Link>
        {props.or}
      </div>
    )
  }

  // Renders dependencies
  const LinkDeps = props.deps.map(item => <li>
                                            <Link 
                                              className="link" 
                                              to={item.path} 
                                              onClick={handleClick}
                                            >
                                              {item.dependency}
                                            </Link>
                                          </li>)

// Renders the cases where alternates are separated by |
const LinkAltDeps = props.alternates.map(item => <li>
                                                    {item.map(stuff => <Linkki path={stuff.path} dependency={stuff.dependency} or={stuff.or}/>)}
                                                  </li>)

  // Renders reverse dependencies
  const LinkRevDeps = props.revdeps.map(item => <li>
                                                  <Link 
                                                    className="link" 
                                                    to={item.path} 
                                                    onClick={handleClick}
                                                  >
                                                    {item.reversedependency}
                                                  </Link>
                                                </li>)

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
        {LinkDeps}
        {LinkAltDeps}
      </div>
      <div>
        <h2>reverse dependencies:</h2>
        {LinkRevDeps}
      </div>
    </>
  )
}

export default Component