//get elements reference
const fieldset = document.querySelector('fieldset');
const legend = document.querySelector('legend');
const timeSet = document.getElementById('timeSet');
const Answers = document.getElementById('answers')
const Img = document.createElement('img');
const score = document.getElementById('score')
const checkbox = document.forms[0];
const responsedAnswers = [];
document.body.appendChild(Img)
let time = 10;
let current = 0;
const questions = [
    { order: 1, question: 'Ընտրիր նկարին համապատասխան բառը', imageUrl: 'https://i.ya-webdesign.com/images/handshake-5.svg', answers: ['argue', 'agreement', 'union','discord' ], correctAnswer: 'agreement'},
    { order: 2, question: 'Հիմք',  answers: ['Base', 'Cause', 'Case', 'found'], correctAnswer: 'Base'},
    { order: 3, question: 'Broadcast', answers: ['Արժենալ', 'հաղորդել', 'հաց', 'հեռարձակում'], correctAnswer: 'հեռարձակում'},
    { order: 4, question: 'Choose an irregular verb', answers: ['mistake', 'listen', 'prepare', 'force'], correctAnswer: 'mistake'},
    { order: 5, question: 'Գտնել ծաղկի անունը', imageUrl: 'https://cdn.pixabay.com/photo/2017/07/27/19/51/chamomile-2546517__340.jpg', answers: ['Bluebell','Water lily', 'Dandelion', 'chamomile'], correctAnswer: 'chamomile'},
    { order: 6, question: 'Ընտրիր նկարին համապատասխան միրգը', imageUrl: 'http://clipart-library.com/img1/534213.jpg', answers: ['Jackfruit ', 'Pomegranate', 'Cantaloupe', 'Persimmon'], correctAnswer: 'Pomegranate'},
    { order: 7, question: 'Որ բայն է պատկերված նկարում', imageUrl: 'http://clipart-library.com/img1/1346927.jpg', answers: ['Sweep', 'Sew', 'Snore', 'Stack'], correctAnswer: 'Sweep'},
    { order: 8, question: 'Որ գոյականը չի կարող լինել և հաշվելի և անհաշվելի', answers: ['Hair', 'Time', 'Paper', '___'], correctAnswer: '___'},
];
const level2Questions = [

]

var Score = 0;
function GetData(obj) {
    if (obj.imageUrl) {
        Img.src = obj.imageUrl;
        Img.style.display = 'block' 
    }
     else {
          Img.style.display = 'none'
     }
    legend.innerHTML += `${obj.order}/${questions.length} ${obj.question}`
    obj.answers.forEach(answer => {
        Answers.innerHTML += `<li>  <input name='a' value=${answer} type='radio' /> <label> ${answer} </label> </li>`
    });
}
GetData(questions[current])
function ClickHandler() {
    current ++;
    legend.innerHTML = '';
    Answers.innerHTML = '';
    if (questions[current].imageUrl) {
        Img.src = questions[current].imageUrl;
        Img.style.display = 'block' 
    }
     else {
          Img.style.display = 'none'
     }
    if (current === questions.length) {
        clearInterval(MyTime)
        timeSet.innerHTML = ''
        timeSet.innerHTML += 'There is no questons'
    }
    else {
        time = 10
    }
    GetData(questions[current])
    ChakeHandler(questions[current])
}
ChakeHandler(questions[current])
const MyTime = setInterval(() => {
    timeSet.innerHTML = '';
    timeSet.innerHTML += `Your Time : ${time}`
    if (time === 0) {
        time = 10
        current ++
        legend.innerHTML = '';
        Answers.innerHTML = '';
        GetData(questions[current])
        ChakeHandler(questions[current])
     }
    else {
        time -=1;
    }
    if (current === questions.length) {
        clearInterval(MyTime)
        ChakeHandler(questions[current])
        timeSet.innerHTML = ''
        timeSet.innerHTML += 'There is no questons'
        Score = responsedAnswers.length;
        ScoreHandler(Score)
    }
   
}, 1000);

function ChakeHandler(obj) {    
    checkbox.querySelectorAll(' ul li input').forEach(i => {
        i.addEventListener('click', (e) => {
            if (e.target.checked === true) {
                if (i.value === obj.correctAnswer) {
                  return  responsedAnswers.push(i.value)
                }
            }
        })
        
    })   
        return responsedAnswers
    
}

function ScoreHandler(s) {
    if (s > 0 && s < 3) {
        score.innerHTML += `Your correct answers are  ${s} of ${questions.length} <span class="material-icons" style='color:#84142d'> sentiment_very_dissatisfied</span>`
    }
    if (s > 3 && s < 5) {
        score.innerHTML += `Your correct answers are  ${s} of ${questions.length} <span class="material-icons" style='color:#f57b51'>sentiment_dissatisfied </span>`
    }
    if (s > 5 && s <= 8) {
        score.innerHTML += `Your correct answers are ${s} of ${questions.length} <span class="material-icons" style='color:#18b0b0' > mood </span>`
        const nxtBtn = document.getElementById('next');
        nxtBtn.style.display = 'block';
    }
}