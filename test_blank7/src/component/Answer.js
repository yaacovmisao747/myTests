import React from "react"
// import useSound from "use-sound"
// import ding from "../assets/ding.mp3" 
import parse from 'html-react-parser'


export default function Answer(props) {
    const choiceStyle = () => {
        if ((props.correct_answer === props.userAnswer.userAnswer) && ((props.correct_answer === props.shuffleAnswer))) {
            return "choice-correcto"
        }else if((props.shuffleAnswer === props.userAnswer.userAnswer) && ((props.correct_answer !== props.userAnswer.userAnswer))) {
            return "choice-wrong"
        }else if((props.shuffleAnswer === props.correct_answer) && (props.userAnswer !== props.correct_answer)) {
            return "choice-correct"
        } else return "choice-fade"
    }

    // const [letsDing] = useSound(ding) 
    
    return (
        <div> 
        {props.showScore?
        <button 
            className={choiceStyle()}>
            { parse(props.shuffleAnswer)} 
        </button>:
           <button 
           onClick={() => props.handleChoiceClick(props.shuffleAnswer, props.questionIdx)}
           className= {props.shuffleAnswer===props.userAnswer ? 'choice-clicked' : 'choice'}>
           {parse(props.shuffleAnswer)}
       </button>}
       </div>
   )
}









//         <button  
//         onClick={() => props.handleChoiceClick(props.shuffleAnswer, props.questionIdx)}
//         className="choice" {...clickStyle()}

//         // className= {
//         //     `${clickStyle()} ${'choice'}`
//         // }
//         >
//             {parse(props.shuffleAnswer)}
//         </button>}
//         </div>
//     )

// }
