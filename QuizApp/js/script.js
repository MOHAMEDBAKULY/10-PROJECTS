// GETTING REQUIRED ELEMENTS
const startBtn = document.querySelector('.start-btn button');
const infoBox = document.querySelector('.info-box');
const quitBtn = infoBox.querySelector('.button .quit');
const continueBtn = infoBox.querySelector('.button .restart');
const quizBox = document.querySelector('.quiz-box');
// const resultBox = document.querySelector('result-box');
const timeCount = quizBox.querySelector('.timer .time-sec');
const timeline = quizBox.querySelector('header .time-line');
const timeOff = quizBox.querySelector('header .time-text');

const optionText = document.querySelector('.option-list');

// if start quiz  button is clicked
startBtn.onclick = () => {
     infoBox.classList.add('activeInfo'); //Show info box
}

// if start quit button is clicked
quitBtn.onclick = () => {
    infoBox.classList.remove('activeInfo');// hide info box
}

// if  Restart button is clicked
continueBtn.onclick = () => {
    infoBox.classList.remove('activeInfo');// hide info box
    quizBox.classList.add('activeQuiz');// show the quiz box
    showQuiz(0);
    quizCounter(1);
    startTimer(20);
    startTimerLine(0);

}

let quizCount = 0;
let quizNumb = 1;
let counter;
let counterLine;
let timeValue = 20;
let widthValue = 0;
let userScore = 0;

const nextBtn = quizBox.querySelector('.next-btn');
const resultBox = document.querySelector('.result-box');
const restartQuiz = resultBox.querySelector('.buttons .restart');
const quitQuiz = resultBox.querySelector('.buttons .quit');

restartQuiz.onclick = () =>{
    resultBox.classList.remove('activeResult');
    quizBox.classList.add('activeQuiz');
    let quizCount = 0;
    let quizNumb = 1;
    let timeValue = 20;
    let widthValue = 0;
    let userScore = 0;
    showQuiz(quizCount);
    quizCounter(quizNumb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    nextBtn.style.display = 'none';
    timeOff.textContent = 'Time left';
}


// if quitQuiz is clicked 
quitQuiz.onclick = () =>{
    window.location.reload();
}

const bottomEl = quizBox.querySelector('.total-que');

// if next button is Clicked
nextBtn.onclick = () => {
  if(quizCount < questions.length - 1){
    quizCount++;
    quizNumb++;
    showQuiz(quizCount);
    quizCounter(quizNumb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    nextBtn.style.display = 'none';
    timeOff.textContent = 'Time left';
  }else {
    clearInterval(counter);
    clearInterval(counterLine);
    console.log('Questions Completed');
    showResultBox();
  }
}


//getting questions and options  from array

const showQuiz = (index) => {
    const quizText = document.querySelector('.quiz-text');

    // creating a new span and div for question and option and passing the value using array index
    let quizTag = '<span>'+ questions[index].numb + ' . '  + questions[index].question +'</span>';
    let optionTag = '<div class="options"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="options"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="options"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="options"><span>'+ questions[index].options[3] +'</span></div>';
    quizText.innerHTML = quizTag;
    optionText.innerHTML = optionTag;

    const option = optionText.querySelectorAll('.options');

    for (let i = 0; i < option.length; i++) {
          option[i].setAttribute('onclick', 'optionSelected(this)' )
    }
} 

let tickicon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossicon = '<div class="icon cross"><i class="fas fa-times"></i></div>';




const optionSelected = (answer) => {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[quizCount].answer;
    let allOptions = optionText.children.length;

    if(userAns == correctAns){
        userScore += 1;
        console.log(userScore);
        answer.classList.add('correct');
        console.log(`Uko fiti endelea`);
        console.log('Your Correct answers = ' + userScore);
        answer.insertAdjacentHTML('beforeend', tickicon);
    }else{
        answer.classList.add('incorrect')
        console.log(`Mambo imechemuka`);
        answer.insertAdjacentHTML('beforeend', crossicon);

        // if ansewrs is incorrect then automatically select the correct answer
        for (let i = 0; i < allOptions; i++) {
           if(optionText.children[i].textContent == correctAns) {
            optionText.children[i].setAttribute('class', 'options correct');
            optionText.children[i].insertAdjacentHTML('beforeend', tickicon );
           }
      }
    }

    // once user selected disabled all options
    for (let i = 0; i < allOptions; i++) {
         optionText.children[i].classList.add('disabled')
        
    }
    nextBtn.style.display = 'block';
}

const showResultBox = () => {
    infoBox.classList.remove('activeInfo');// hide info box
    quizBox.classList.remove('activeQuiz');// show the quiz box
    resultBox.classList.add('activeResult');// show the result box
    const scoreText = resultBox.querySelector('.score-text');
    if(userScore > 15){
        let scoreTag =  '<span>and congragulations!, You only have <p>'+ userScore +'</p>out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }else if (userScore > 1){
        let scoreTag =  '<span>and nice, you got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p> </span>';
        scoreText.innerHTML = scoreTag;
    }else {
        let scoreTag =  '<span>and sorry, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p> </span>';
        scoreTag.innerHTML = scoreTag;
    }
}


const startTimer = (time) => {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = '0' + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = '00'
            timeOff.textContent = 'Time off'

            let correctAns = questions[quizCount].answer;
            let allOptions = optionText.children.length;

            for (let i = 0; i < allOptions; i++) {
                if(optionText.children[i].textContent == correctAns) {
                 optionText.children[i].setAttribute('class', 'options correct');
                 optionText.children[i].insertAdjacentHTML('beforeend', tickicon );
                }
           }
           for (let i = 0; i < allOptions; i++) {
            optionText.children[i].classList.add('disabled')
           
       }
       nextBtn.style.display = 'block';
        }
    }
}



const startTimerLine = (time) => {
    counterLine = setInterval(timer, 36);
    function timer() {
        time += 1;
        timeline.style.width = time + 'px'
        if(time > 549){
            clearInterval(counterLine);
        }
    }
}







const quizCounter = (index) => {
    let totalQuizCount = '<span><p>' + index + '</p>Of<p>'+ questions.length +'</p>Questions</span>';
    bottomEl.innerHTML = totalQuizCount;  
};
