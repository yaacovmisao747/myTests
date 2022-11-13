import React, { useState } from 'react'
import { v4 as uuidv4 } from "uuid"
import Contact from './Contact'

import React from 'react'


export default function App() {
	const questions = [
		{
			questionText: 'What is the capital of Israel?',
			answerOptions: [
				{ answerText: 'Jerusalem', isCorrect:  true },
				{ answerText: 'Tel Aviv', isCorrect: false },
				{ answerText: 'Paris', isCorrect: false },
				{ answerText: 'Haifa', isCorrect: false },
			],
		},
		{
			questionText: 'Who is CEO of Tesla?',
			answerOptions: [
				{ answerText: 'Jeff Bezos', isCorrect: false },
				{ answerText: 'Elon Musk', isCorrect: true },
				{ answerText: 'Bill Gates', isCorrect: false },
				{ answerText: 'Tony Stark', isCorrect: false },
			],
		},
		{
			questionText: 'The iPhone was created by which company?',
			answerOptions: [
				{ answerText: 'Apple', isCorrect: true },
				{ answerText: 'Intel', isCorrect: false },
				{ answerText: 'Amazon', isCorrect: false },
				{ answerText: 'Microsoft', isCorrect: false },
			],
		},
		{
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [showScore, setShowScore] = useState(false)
	const [score, setScore] = useState(0)
	const [optionSelected,setOptionSelected] = useState(false)

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1)						
		}

		setOptionSelected(true)
	} 
	
	 const handleNextQuestion = () =>{
		setOptionSelected(false)

		const nextQuestion = currentQuestion + 1
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion)
		}  else {
			setShowScore(true)
		}
	 }

	const resetQuiz=()=>
{
    setCurrentQuestion(0)
    setScore(0)
    setShowScore(false)
}

	return (
		<Contact 
		questions = {questions}
		/> ,
		<div className='app'>
			{showScore ? (
			<div> 
				<div className='completed'>Completed </div>
				<div className='score-section'>
					You scored {score} out of {questions.length}
					<>
                       <button className='reset-button' type="submit" onClick={resetQuiz}>Play Again!!</button>
                    </>
				</div>
			</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
						   <li className='answer-list' key={uuidv4()}>
							<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						   </li>
						))}
					</div>
				</>
				 
			)}
			<div>
				<button className='next_button' onClick={handleNextQuestion}>
					Next
				</button>
			</div>
		</div>
	);
}