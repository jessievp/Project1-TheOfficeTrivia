//buttons
const startBtn = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const reStart = document.getElementById('start-btn')
const xBtnToMain = document.querySelector('.one')

//elements within HTML
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const answerStatus = document.getElementById('answer-status')

//hud 
const progressText = document.getElementById('progressText')
const scoreText = document.getElementById('scoreText') 

//game effects, start and completion 
const playTune = document.getElementById('playBtn')
const welcomePrompt = document.getElementById('welcome')
const finishPlay = document.getElementById('bye')
const showGif = document.getElementById('gif')

//failed last minute attempt for a countdown timer :( 
//leaving it here as I want to keep on working on it
//	const timesup = document.getElementById('timesup')
//	const timeLeftDisplay = document.getElementById('countdown')
//	let timeLeft = 10
//
//	function countDown() {
//		setInterval(function() {
//		if (timeLeft <= 0) {
//			clearInterval(timeLeft = 0)
//			timesup.innerText = "Thanks for playing. Time is up!"
//			
//			questionContainerElement.classList.add('hide')
//			nextButton.classList.add('hide')
//			startBtn.classList.remove('hide')
//					
//			
//		}
//		timeLeftDisplay.innerHTML = timeLeft
//		timeLeft -=1
//		}, 1000)
//
//
//	}

//	startBtn.addEventListener('click', countDown)


let shuffledQuestions, currentQuestionIndex
// let acceptingAnswers = true

let questionCounter = 0
let countRightAnswers = 0
let MAX_QUESTIONS = 10






playTune.addEventListener('click', playSound, 0)
startBtn.addEventListener('click', startGame)
xBtnToMain.addEventListener('click', mainPage)
reStart.addEventListener('click', restartGame)
nextButton.addEventListener('click', () => {
	currentQuestionIndex++
	nextQuestion()
})

// audio background
let soundCount = 0;
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

// this works, but wanted to have a  cleaner page with just one button for audio control
//function muteUnmute() {
//	if(audioTrack.muted === true) {
//		audioTrack.muted = false;
//		document.getElementById('mutemuteBtn')
//	} else {
//		audioTrack.muted = true;
//	}
//}

	function startGame() {
		console.log('Started')
	//	below elements will hide when start button is initiated
		startBtn.classList.add('hide')

		welcomePrompt.classList.add('hide')
		showGif.classList.add('hide')
	
	// to make questions completely random formula -.5
		shuffledQuestions = questions.sort(() => Math.random() - .5)
	// starts at 0	
		currentQuestionIndex = 0
	// hides this question box when welcome page is initiated
		questionContainerElement.classList.remove('hide')
		nextQuestion()
		questionCounter++ 
		progressText.innerText = `${currentQuestionIndex + 1}/${MAX_QUESTIONS}`;
}

// x button to reshuffle and restart the game
function  mainPage() {
	startGame()	
		alert (`reshuffling and restarting!`)
 		console.log(mainPage)
}

 function nextQuestion () {
 	resetState()
 	showQuestion(shuffledQuestions[currentQuestionIndex])
	questionCounter++
	progressText.innerText = `${currentQuestionIndex + 1}/${MAX_QUESTIONS}`;
 }

function showQuestion(question) {
	questionElement.innerText = question.question
	question.answers.forEach(answer => {
		const button = document.createElement('button')
			button.innerText = answer.text
			button.classList.add('btn')

	if (answer.correct) {
		button.dataset.correct = answer.correct 
		}
		button.addEventListener('click', selectAnswer)
		answerButtonsElement.appendChild(button)
	})
}


 function resetState() {
 	clearStatusClass(document.body)
 	nextButton.classList.add('hide')
 	while (answerButtonsElement.firstChild) {
 		answerButtonsElement.removeChild(answerButtonsElement.firstChild)
 	}
 }


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
	 
// questions were all presented. game over. this page loops to start the game again.
		reStart.classList.remove('hide')
		finishPlay.classList.remove('hide')
		finishPlay.innerHTML  = `<strong> You got a total score of ` + `${countRightAnswers} !!` + ` Click Start to play again!</strong>`
		questionContainerElement.classList.add('hide')		
		showGif.classList.remove('hide')

	 }	

	 if (correct) {

		countRightAnswers++
		scoreText.innerHTML  = `Score: ` + `${countRightAnswers}`;
		answerButtonsElement.classList.add('no-click');

	}

}


function restartGame () {

		shuffledQuestions = questions.sort(() => Math.random() - .5)
		scoreText.innerHTML = `Score: `+ 0
		questionContainerElement.classList.remove('hide')
		finishPlay.classList.add('hide')

		nextQuestion()

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



// useless prompts
let preGame = prompt("click the sound icon ;) ")

// info button about the trivia theme
document.querySelector('#smallButton.two').addEventListener('click', info);
function info() {
    alert("The Office is an American mockumentary sitcom which aired from March 25, 2005 to May 16, 2013 lasting 9 seasons. It was the most-streamed show of 2020. :) ");
}



// trivia questions

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