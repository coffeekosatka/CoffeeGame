const start = document.querySelector('.start');
const gameBox = document.querySelector('.game');
const gameOver = document.querySelector('.over');
const table = document.querySelector('.table');


function showGame() {
    gameBox.style.display ='flex';
    gameOver.style.display ='none';
    table.style.display ='none';
    score = 0;
}

function gameIsOver() {
    gameBox.style.display ='none';
    gameOver.style.display ='flex';
    table.style.display ='flex';
     // Запросить никнейм у пользователя
    let inputName = "";
    do {
        inputName = prompt("Введите свой никнейм (максимум 20 символов):");
        if (inputName && inputName.length > 20) {
            alert("Никнейм слишком длинный. Пожалуйста, используйте не более 20 символов.");
        }
    } while (inputName && inputName.length > 20);

     if (inputName) {
         playerName = inputName; // Сохранить никнейм
         document.querySelector('.your_name').textContent = `Your Score: ${score}`;
         showScore();
         saveBestScore(playerName, score); // Сохраняем результат игрока
        showBestScores();
     }
}

start.addEventListener('click', showGame);

function showScore(){
    table.style.display = 'flex';
    document.querySelector('.your_name').textContent = `${playerName}: ${score}`;
}


//game//

const coffeine = document.getElementById('coffeine');
const cup = document.getElementById('cup');

document.addEventListener("keydown", function(event){
    jump();
});

document.addEventListener("touchstart", function (event) {
    jump();
});


function jump (){
    if(coffeine.classList != "jump"){
        coffeine.classList.add("jump");
    }
    setTimeout(function(){
        coffeine.classList.remove("jump");
    }, 1000)

}
let score = 0; // Переменная для отслеживания количества очков
let playerName = ""; // Переменная для хранения никнейма

let isAlive = setInterval (function(){
    let coffeineTop = parseInt(window.getComputedStyle(coffeine).getPropertyValue("top"));
    let cupLeft = parseInt(window.getComputedStyle(cup).getPropertyValue("left"));

    if (cupLeft < -50 && cupLeft > -100 && coffeineTop >= 150){
        gameIsOver();
    }
    else {
        score++;
    }
},10)

//game//

function saveBestScore(playerName, score) {
    const bestScores = loadBestScores();
    bestScores.push({ name: playerName, score: score });
    bestScores.sort((a, b) => b.score - a.score); // Сортируем результаты по убыванию
    bestScores.splice(10); // Ограничиваем только 10 лучшими результатами
    localStorage.setItem('bestScores', JSON.stringify(bestScores));
}

function loadBestScores() {
    const bestScores = JSON.parse(localStorage.getItem('bestScores')) || [];
    return bestScores;
}

function showBestScores() {
    const bestScores = loadBestScores();
    const bestElement = document.querySelector('.best');

    bestElement.innerHTML = '';
    for (let i = 0; i < bestScores.length; i++) {
        bestElement.innerHTML += `${i + 1}. ${bestScores[i].name} ${bestScores[i].score}<br>`;
    }
}

const scoreElement = document.querySelector('.score');

function showScoreWithOutOver(){
    table.style.display = 'flex';
    showBestScores();
    gameBox.style.display ='none';
    gameOver.style.display ='none';


}

scoreElement.addEventListener('click', showScoreWithOutOver);


