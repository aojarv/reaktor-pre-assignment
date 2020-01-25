import React from 'react'

// Component for packages that do not exist
const Error = () => {
    return(
        <>
            <div>
                <h1>Package not found. Most likely it is replaced by some another package</h1>
            </div>
        </>
    )
}

export default Error