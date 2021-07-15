const startBtn = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
// const prevButton = document.getElementById('prev-btn')
const reStart = document.getElementById('start-btn')

const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const answerStatus = document.getElementById('answer-status')
const xBtnToMain = document.querySelector('.one')

// const playSound = document.getElementById
//const muteUnmuteButton = document.getElementById('muteBtn')
const playTune = document.getElementById('playBtn')

const welcomePrompt = document.getElementById('welcome')

const progressText = document.getElementById('progressText')


const scoreText = document.getElementById('scoreText') 


const finishPlay = document.getElementById('bye')



// const scoreText = document.getElementById('score')

let shuffledQuestions, currentQuestionIndex
// let acceptingAnswers = true
let availableQuestions = []
let questionCounter = 0
let countRightAnswers = 0

let soundCount = 0;

// const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

// functions, actions within the game

// the startGame function initializes/launches the game, expected outcome: it should disappear when the trivia starts
//document.getElementById("audio").loop = true;


playTune.addEventListener('click', playSound, 0)
// muteUnmuteButton.addEventListener('click', muteUnmute, false)
startBtn.addEventListener('click', startGame)
xBtnToMain.addEventListener('click', mainPage)
reStart.addEventListener('click', restartGame)
nextButton.addEventListener('click', () => {
	currentQuestionIndex++
	nextQuestion()
})

//document.getElementById('audio').play();





	//audioTrack.play();
	//audioTrack.volume = 0.12;
	//audioTrack.loop = true;
	// audioTrack.onclick();
	//page.onclick = () => playSound()


// prevButton.addEventListener('click', () => {
// 	currentQuestionIndex--
// 	previousQuestion()
// })
let audioTrack = new Audio('./audio/theofficetheme.mp3');

function playSound () {
	
	if(soundCount == 0) {
		soundCount = 1;
		audioTrack.play();
		audioTrack.volume = 0.12;
		audioTrack.loop = true;
	} else {
		soundCount = 0;
		audioTrack.pause();
	}
}


//function muteUnmute() {
//	if(audioTrack.muted === true) {
//		audioTrack.muted = false;
//		document.getElementById('mutemuteBtn')
//	} else {
//		audioTrack.muted = true;
//	}
//}


// progressBarFull.style.width = `${(currentQuestionIndex / MAX_QUESTIONS) * 100}%}`;

	function startGame() {
		console.log('Started')
//		below elements will hide when start button is initiated
		startBtn.classList.add('hide')
	//	muteUnmuteButton.classList.add('hide')
		welcomePrompt.classList.add('hide')
		// muteUnmuteButton.classList.add('hide')
	// to make questions completely random formula -.5
		shuffledQuestions = questions.sort(() => Math.random() - .5)
	// starts at 0	
		currentQuestionIndex = 0
		// playerScore = 0
		questionContainerElement.classList.remove('hide')
		nextQuestion()
//		previousQuestion()

//		previousQuestionIndex = 0
//		questionContainerElement.classList.remove('hide')

		questionCounter++ 
		progressText.innerText = `${currentQuestionIndex + 1}/${MAX_QUESTIONS}`;
}


function  mainPage() {
	startGame()
	alert (`reshuffling and restarting!`)
 console.log(mainPage)
}




// previous and next navigators and shows questions
// const nextBtn = document.getElementById('next-btn')

// nextBtn.addEventListener('click', nextQuestion)

 function nextQuestion () {
 	resetState()
 	showQuestion(shuffledQuestions[currentQuestionIndex])

//	if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
//		return "game is over!";

	questionCounter++
	progressText.innerText = `${currentQuestionIndex + 1}/${MAX_QUESTIONS}`;

 }

//  function previousQuestion () {
// 	showQuestion(shuffledQuestions[currentQuestionIndex])
// }

function showQuestion(question) {
	questionElement.innerText = question.question
	question.answers.forEach(answer => {
		const button = document.createElement('button')
			button.innerText = answer.text
			button.classList.add('btn')

	if (answer.correct) {
		button.dataset.correct = answer.correct 
	//	playerScore += 1;
		}
		button.addEventListener('click', selectAnswer)
		answerButtonsElement.appendChild(button)
		// progressBar.innerText = `Question ${currentQuestionIndex} / ${MAX_QUESTIONS}`;

	})

}


 function resetState() {
 	clearStatusClass(document.body)
 	nextButton.classList.add('hide')
 	while (answerButtonsElement.firstChild) {
 		answerButtonsElement.removeChild(answerButtonsElement.firstChild)
 	}
 }


 // function finishGame() {
// 	 clearStatusClass (document.body)
// 	 if (shuffledQuestions.length = MAX_QUESTIONS ) {
// 	     
// 	     finishPlay.innerHTML = "Thank you!"
// 	     finishPlay.classList.remove('hide')
// 	 }
 // }

function selectAnswer (event) {
	const selectedButton = event.target
	const correct = selectedButton.dataset.correct
	setStatusClass(document.getElementById('answer-status'), correct)
	Array.from(answerButtonsElement.children).forEach(button => {
		setStatusClass(button, button.dataset.correct)

	})

	 if (shuffledQuestions.length > currentQuestionIndex +1) {
	 	nextButton.classList.remove('hide')


	} else {
	 	/*startBtn.innerHTML = `<strong> PLAY AGAIN </strong>` */

		reStart.classList.remove('hide')
		finishPlay.classList.remove('hide')
		finishPlay.innerHTML  = `<strong> You got a total score of ` + `${countRightAnswers} !!` + ` Click Start to play again!</strong>`
		questionContainerElement.classList.add('hide')	
		muteButton.classList.remove('hide')

	 }	

	 if (correct) {

		countRightAnswers++
		scoreText.innerHTML  = `Score: ` + `${countRightAnswers}`;
		answerButtonsElement.classList.add('no-click');

	}

//	if (scoreText > 1) {
//		progressBar.innerHTML = "what a nerd"
//	}

}



function restartGame () {

		shuffledQuestions = questions.sort(() => Math.random() - .5)
	// starts at 0	
	//	currentQuestionIndex = 0
	//	countRightAnswers = 0
		scoreText.innerHTML = `Score: `+ 0
		questionContainerElement.classList.remove('hide')
		finishPlay.classList.add('hide')
		nextQuestion()
//		previousQuestion()

//		previousQuestionIndex = 0
//		questionContainerElement.classList.remove('hide')

		questionCounter++ 
		progressText.innerText = `${currentQuestionIndex + 1}/${MAX_QUESTIONS}`;



}


function setStatusClass (element, correct) {
	clearStatusClass(element)
	if (correct) {
		element.classList.add('correct') 

	} else {
		element.classList.add('wrong')

	}
}


function clearStatusClass(element) {
	element.classList.remove('correct')
	element.classList.remove('wrong')
}



// muteUnmuteButton.addEventListener('click', function() {
// 	if (Audio.muted) {
// 		Audio.muted = false;
// 	} else {
// 		Audio.muted = true;
// 	}
// 	
// }

let preGame = prompt("Got earphones? Click the sound icon for some muzzzak ;) ")


// useless prompts

document.querySelector('#smallButton.two').addEventListener('click', info);

function info() {
    alert("The Office is an American mockumentary sitcom which aired from March 25, 2005 to May 16, 2013 lasting 9 seasons. It was the most-streamed show of 2020. :) ");
}


// multiple choice option
// const selectAnswerBtn = document.getElementsByClassName('.answerBtn')

// document.querySelectorAll('.answerBtn').forEach(item => {
// 	item.addEventListener('click', selectAnswer => {
// 	console.log('Im an answer button')
// 	})
// })



let  questions = [
{	question: "In S1E1: Who started their first day at Dunder Mifflin Scranton?",
	answers: [
		 { text: "Jim halpert", 	wrong: false	},
		 { text: "Ryan Howard", 	correct: true 	},
		 { text: "Creed Bratton", 	wrong: false	},
		 { text: "Kevin Malone",	wrong: false	}

	] 
},
{	question: "In `Diversity Day`: What famous comedian's stand up routine does Michael imitate?",
	answers: [
		{ text: "Eddie Murphy",		wrong: false	},
		{ text: "Chris Rock",		correct: true 	},
		{ text: "Chris Tucker",		wrong: false	},
		{ text: "Kevin Hart",		wrong: false	}
	]
},
{	question: "In S1E4 `The Alliance`: How much money does Michael donate to Oscar's nephew's charity, not realizing it is a walk-a-thon and the amount is per mile?",
	answers: [
		{ text:  "$30",			wrong: false	},
		{ text:  "$40",			wrong: false	},
		{ text: "$20",			wrong: false	},
		{ text: "$25",			correct: true	}
	]
},
{	question: "In S2E5 `Halloween`: What is Jim's costume?",
	answers: [
		{ text: "Dave",			wrong: false	},
		{ text: "Notebook",		wrong: false	},
		{ text: "Three Hole Punch Jim", correct: true	},
		{ text: "Rational Consumer",	wrong: false	}
	]
},
{	question: "In S2E6 `The Fight`: What is Dwight's Sensei's name?",
	answers: [
		{ text: "Ira",			correct: true	},
		{ text: "George",		wrong: false	},
		{ text: "Stuart",		wrong: false	},
		{ text: "Mr. Miyagi",		wrong: false	}
	]
},
{	question: "In S2E7 `The Client`: Where do Jan and Michale take Christian, the Lackawanna County rep?",
	answers: [
		{ text: "Applebee's",		wrong: false	},
		{ text: "Hooters",		wrong: false	},
		{ text: "Chili's",		correct: true	},
		{ text: "Poor Richard's",	wrong: false	}
		]
},
{	question: "In S2E8 `Performance Review`: Who does Michael quickly dismiss saying `You were totally satisfactory this year?",
	answers: [
		{ text: "Angela",		correct: true	},
		{ text: "Kevin",		wrong: false	},
		{ text: "Dwight",		wrong: false	},
		{ text: "Stanley",		wrong: false	}
		]
},
{	question: "In S2E9 `E-Mail Surveillance`: Who hosts a barbecue that is Michael NOT invited to?",
	answers: [
		{ text: "Pam",			wrong: false	},
		{ text: "Jim",			correct: true	},
		{ text: "Andy",			wrong: false	},
		{ text: "Stanley",		wrong: false	},
	]
},
{	question: "In S3E6 `Diwali` What does Michael mistakenly believe Diwali is?",
	answers: [
		{ text: "Hindu Hannukah",			wrong: false	},
		{ text: "Hindu Christmas",			wrong: false	},
		{ text: "Hindu Halloween",			correct: true	},
		{ text: "Hindu Flag Day	",			wrong: false	},
	]
},
{	question: "In S7E16 `Threat Level Midnight` Who is Michael Scarn's late wife?",
	answers: [
		{ text: "Catherine Zeta Jones",			correct: true	},
		{ text: "Eva Longoria",				wrong: false	},
		{ text: "Pam",					wrong: true	},
		{ text: "Teri Hatcher	",			wrong: false	},
	]
}
]