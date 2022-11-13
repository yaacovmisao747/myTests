import React from "react"
import {useState, useEffect, useRef } from "react"
import Card from "./component/Card"
import useSound from "use-sound"
import beep from "./assets/beep.mp3" 
import welcome from "./assets/welcome.mp3"  
 

export default function App() {
 
    const [isHomePage, setIsHomePage] = useState(true)
    const [category, setCategory] = useState([])
    const [cateId, setCateId] = useState(0)
    const [quizData, setQuizData] = useState([]) 
    const [answerData, setAnswerData] = useState([])  
    const [needRestart, setNeedRestart] = useState(0)
 
    const [totalScore, setTotalScore] = useState({
        score:0,
        showScore:false
    })

    const [letsBeep] = useSound(beep)
    // const [letsPlay] = useSound(play)
    const [letsWelcome] = useSound(welcome)
    useEffect (() => {
        letsWelcome()
    },[letsWelcome]) 
    
    function startQuiz() {
        setIsHomePage(false)
    }
    
    function restart() {
        setNeedRestart(current => current + 1)
        setTotalScore({score:0, showScore:false})
        setAnswerData([])
        setQuizData([])
        letsBeep()
    }

    const cate = category.map(cat => {
        return (
            <option value={cat.name} key={cat.id}>{cat.name}</option>
            )
    })
     //===BELOW LINES OF CODE FOR SELECTION OF CATEGORY IN THE UI===
     useEffect(() => {
         
        fetch("https://opentdb.com/api_category.php")
        .then(res => res.json())
        .then(cate => setCategory(cate.trivia_categories))
       
    },[])

    function handleChange(e){
        setCateId(category.filter(cate => cate.name === e.target.value)[0].id)
    }

      // let API = "https://opentdb.com/api.php?amount=10&category=18" 
    
      let API = `https://opentdb.com/api.php?amount=5&category=${cateId}`
      useEffect(() => {
     
          fetch(API)
          .then(res => res.json()) 
          .then(data =>  setQuizData(reconstruct(data.results)))
        
      }, [cateId, needRestart,API])

         // if answerData is changed to useRef then we don't have to use useEffect hook anymore.
     useEffect(()=>{
        setQuizData(current => current.map((data,index) => Object.assign(data, {userAnswer:answerData[index]})))  
      },[answerData])
    
    function handleCheckAnswer() {  
        let score = 0
        for (let i = 0; i < answerData.length ; i++) {
            if (quizData[i].correct_answer === answerData[i].userAnswer) {
            score = score + 1
            }
        }
        setTotalScore({score:score, showScore:true})
        
    }

       //if new answer replace the old one
    function handleChoiceClick(data, questionIndex) { 
        answerData.map(x=>x.questionIndex).includes(questionIndex)&&
        setAnswerData(current => {
            return current.filter(item => item.questionIndex !== questionIndex)
        })
        
        setAnswerData(current => {
            return [
                ...current, 
                {questionIndex:questionIndex, userAnswer:data}]
                .sort((a,b) => {
                    return a.questionIndex - b.questionIndex
            })
        }) 
        
    }
   
    //lines 111-129 is a helper function
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]]
        }
    return array
    }
    
    function reconstruct(data) {
        return data.map(x => Object.assign(x, 
            {
                all_answer:shuffle([...x.incorrect_answers, x.correct_answer]),
                userAnswer:""
            })
        )
    }
  
    const card = quizData.map((data, index) => {
        return (
            <Card 
                key={data.question} 
                question={data.question}
                correct_answer={data.correct_answer}
                shuffleAnswer={data.all_answer}
                handleChoiceClick={handleChoiceClick} 
                questionIdx={index}
                userAnswer={data.userAnswer}
                showScore={totalScore.showScore}
            />
        )
    })
    

    return (
        // letsWelcome(),  //when setting up this function here sound will be produced everytime every mouse click
        <div>
            <img className="orange" src="./orange.png" alt=" "/>
            {isHomePage? 
            <div className="home-page">
                <img className="bigblue" src="./bigblue.png" alt=" "/>
                <h1>Quizzy </h1>
                <p>Try your best to anwers these fun 5 question about</p>
                {category.length===0?
                    <p>Loading. . .</p>:
                    <select className="cate-selector" onChange= {handleChange}>
                         {cate}
                    </select>}
                <button onClick={startQuiz} className="start-btn">Start Quiz </button>
            </div>:
            <div className="quiz-page">
                {card}
              
                <div className="check-btn-container"> 
                {totalScore.showScore && 
            <p className="score">You scored {totalScore.score}/{quizData.length} correct answers</p>}
                    {!totalScore.showScore?
                        (quizData.length?
                            <button
                            disabled={answerData.length !== quizData.length}
                            onClick={handleCheckAnswer}
                            className="check-btn">
                            Check Answer
                            </button>:
                            <p className="loading">Loading . . .</p>):
                    <button 
                    onClick={restart}
                    className="check-btn">
                       Restart
                    </button>
                    }
                
                     
                </div>
            </div>}
            
        </div>
    )
 
}

