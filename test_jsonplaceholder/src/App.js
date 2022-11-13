 import React, { useState, useEffect } from 'react'

 
 
 function App() {
  const [resourceType, setResourceType] = useState('posts')
  // const [items, setItems] = useState ([])

  // useEffect(() => {
  //   fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
  //   // fetch('https://jsonplaceholder.typicode.com/todos/1')
  //     .then(response => response.json())
  //     .then(json => console.log(json))

  //     // console.log('resource changed')
  //     // return() => {
  //     //   console.log('return from resource changed');
  //     // }
  // },[resourceType])
   
  useEffect(() => {
    console.log('Resource');
  })

  return(
    <>
     <div>
      <button onClick={()=> setResourceType('posts')}>Post</button>
      <button onClick={()=> setResourceType('users')}>Users</button>
      <button onClick={()=> setResourceType('comments')}>Comments</button>
     </div>
     <h1>{resourceType}</h1>
      {/* {items.map(item => {
        return <pre>{JSON.stringify(item)}</pre>
      })}  */}
    </>

  )


  /*const [windowWidth, setwindowWidth] = useState(window.innerWidth)

   return (
     <div>
       {windowWidth}
     </div>
   )

 */
  }
 export default App
 
 