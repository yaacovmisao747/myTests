import React from "react"
import { nanoid } from "nanoid"
import reconstruct from "./reconstruct"
import data from "./data.js"
import Question from "./components/Question"
// import Confetti from "react-confetti"

export default function App() {
    
    const [quizData, setQuizData] = React.useState([])
    const [start, setStart] = React.useState(false)
    const [count, setCount] = React.useState(0)
    const [check, setCheck] = React.useState(false)
    const [disabled, setDisabled] = React.useState(true)
    const [checkString, setCheckString] = React.useState("Score")
    const [champ, setChamp] = React.useState(false)
    
    const amount = "5"
    const category = "18"
    const difficuly = "medium"
    const type = "multiple"
    
// ================================ FETCH DATA =================================  
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficuly}&type=${type}`
                
    React.useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            const reconstructedData = reconstruct(data.results)
            setQuizData(reconstructedData)
        })
    },[start])
    
// ================================ DEV DATA =================================   
    // React.useEffect(() => {
    //     if (start) {
    //         setQuizData(reconstruct(data))
    //     }
    // },[start]);
    
// ================================ MAIN ====================================
    React.useEffect(() => {
        const allSelected = quizData.every(data => data.selected)
    },[quizData])
    
    let questionElements = []
    if (quizData.length === 0)
    {
        questionElements = 
        <div className="loading">
            <p>Quiz Data loading</p>
        </div>
    } 
    else 
    {
        questionElements = quizData.map(quiz => ( 
            <Question
                key={quiz.key}
                id={quiz.id}
                question={quiz.question}
                correct={quiz.correct}
                answers={quiz.answers}
                selected={quiz.selected}
                holdAnswer={holdAnswer}
                check={check}
            />
        )) 
    }
    
// ================================ FUNCTIONS =================================    
    function startQuiz() {
        setStart(true)
    }
    
    function holdAnswer(ans) {
        setQuizData(oldQuizData => oldQuizData.map(data => {
            return data.answers.includes(ans) ?
            {...data,
            selected: ans} :
            data
        }))
        counter()
    }
    
    function counter() {
        let selectedValues = quizData.map(data => {
            return data.selected
        })
        let newCount = selectedValues.filter(value => value != false).length + 1
        setCount(newCount)
        changeDisabled(newCount)
    }
    
    function changeDisabled(count) {
         if (count === 5) {
             setDisabled(false)
         }
     }
    
    function handleClick(count, start){
        setCheck(true)
        let correctAnswers = 0
        for (let i = 0; i < quizData.length; i++) {
            if (quizData[i].correct === quizData[i].selected) {
                correctAnswers++
            }
        }
        setCheckString(correctAnswers + " / 5")
        
        if (correctAnswers === 5){
            setChamp(true)
        } 
     }
     
     function resetQuiz() {
        setQuizData([])
        setStart(false)
        setCount(0)
        setCheck(false)
        setDisabled(true)
        setCheckString("Score")
        setChamp(false)
     }
         
// ================================== STYLES ===================================  
    let buttonStyle = {}

    function checkStyles(count){
        if (count === 5 ) {
            buttonStyle = {
                opacity: 1,
            }
        }
        return buttonStyle
    }
    checkStyles(count)
    
// ================================== RENDER ===================================  
    return (
        <main>
        {champ}
        {/* {champ && <Confetti />} */}
        {
            start ?
            <div className="quiz">
                <img className="blob blobTop" src="./images/blob-yllw-50.png" />
                <p className="category">Category: Science: Computers</p>       
                {questionElements}
                <div className="footer">
                    <div className="score">{checkString}</div>
                    <button className="checkButton"
                            disabled={disabled}
                            style={buttonStyle}
                            onClick={handleClick}>
                            Check Answers
                    </button>
                    <button className="resetButton"
                            disabled={disabled}
                            style={buttonStyle}
                            onClick={resetQuiz}>
                            Play Again
                    </button>
                </div>
                <img className="blob blobBottom" src="./images/blob-blue-33.png" />   
            </div> :
            <div className="startQuiz">
                <img className="blob blobTop" src="./images/blob-yllw.png" />
                <h1 className="title">Compizzical</h1>
                <p className="subtitle">A Quizzical-inspired computer trivia game.</p>
                <button className="startButton" onClick={startQuiz}>Start Quiz</button>
                <img className="blob blobBottom" src="./images/blob-blue.png" />
            </div>
        }
        </main>
    )   
}   