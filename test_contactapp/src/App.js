import React from 'react'
import AddContact from './AddContact';
import Header from './Header';
import ContactList from './ContactList';

export default function App() {
    const contacts = [
        {
            id: "1",
            name: "name1",
            email: "email1@gmail.com"
        },
        {
            id: "2",
            name: "name2",
            email: "email2gmail.com"
        }
    ]
	const questions = [
		{
            id: "0",
			questionText: 'What is the capital of Israel?',
			answerOptions: [
				{ answerText: 'Jerusalem', isCorrect:  true },
				{ answerText: 'Tel Aviv', isCorrect: false },
				{ answerText: 'Paris', isCorrect: false },
				{ answerText: 'Haifa', isCorrect: false },
			],
		},
		{
            id: "1",
			questionText: 'Who is CEO of Tesla?',
			answerOptions: [
				{ answerText: 'Jeff Bezos', isCorrect: false },
				{ answerText: 'Elon Musk', isCorrect: true },
				{ answerText: 'Bill Gates', isCorrect: false },
				{ answerText: 'Tony Stark', isCorrect: false },
			],
		},
		{
            id: "2",
			questionText: 'The iPhone was created by which company?',
			answerOptions: [
				{ answerText: 'Apple', isCorrect: true },
				{ answerText: 'Intel', isCorrect: false },
				{ answerText: 'Amazon', isCorrect: false },
				{ answerText: 'Microsoft', isCorrect: false },
			],
		},
		{
            id: "3",
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
	];


	return (
		   <div className='ui container'>
             <Header/>
             <AddContact/>  
             <ContactList
             contacts={contacts}
             /> 
            
           </div> 
			
			 
	);
}