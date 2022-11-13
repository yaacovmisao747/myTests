import React, { useState, useEffect } from 'react'

 
 
function App() {
 const [windowWidth, setwindowWidth] = useState(window.innerWidth)

 const handleResize = ()=>{
  setwindowWidth(window.innerWidth)
 } 

 useEffect(() => {
  window.addEventListener('resize',handleResize)

  return() => {
    window.removeEventListener('resize',handleResize)
  }
 },[])

  return (
    <div>
      <h2>The window width is: {windowWidth}</h2>
    </div>
  )
 
 }
export default App

