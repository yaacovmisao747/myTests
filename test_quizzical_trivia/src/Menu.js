import React from "react"

function Menu(props){
return(
<div className="menu">Menu
    <h1 className='page-title'>Quizzical_Trivia</h1>
    <span className='page-description'>Description</span>
     <button className="start-button" onClick={() => props.start()}>Start Quiz</button> 
</div>
    )
}

export default Menu



