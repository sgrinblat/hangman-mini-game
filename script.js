const wordContainer = document.getElementById('wordContainer');
const startButton = document.getElementById('startButton');
const usedLettersElement = document.getElementById('usedLetters');
const colorsButton = document.getElementById('colorsButton');
const animalsButton = document.getElementById('animalsButton');
const foodButton = document.getElementById('foodButton');
const jobstButton = document.getElementById('jobstButton');
const bodypartsButton = document.getElementById('bodypartsButton');
const clothesButton = document.getElementById('clothesButton');
const subjectsButton = document.getElementById("subjectsButton");
const objectsButton = document.getElementById('objectsButton');

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width  = 0;
ctx.canvas.height = 0;

const bodyParts = [
    [4,2,1,1],
    [4,3,1,2],
    [3,5,1,1],
    [5,5,1,1],
    [3,3,1,1],
    [5,3,1,1]
];

let selectedWord;
let usedLetters;
let mistakes;
let hits;

const addLetter = letter => {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    usedLettersElement.appendChild(letterElement);
}

const addBodyPart = bodyPart => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(...bodyPart);
};

const wrongLetter = () => {
    addBodyPart(bodyParts[mistakes]);
    mistakes++;
    if(mistakes === bodyParts.length) endGameLoose();
}

const endGameLoose = () => {
    document.removeEventListener('keydown', letterEvent);
    yourChoice.style.display = "none";
    mobile.style.display = 'none';
    startButton.innerHTML = "PLAY AGAIN";
    startButton.style.display = 'block';
    categorys.style.display = "none";
    let word = selectedWord.toString();
    let newWord = word.replace(/,/g,"");
    wordContainer.innerHTML = "THE WORD WAS " + newWord;
    
}

const endGameWin = () => {
    document.removeEventListener('keydown', letterEvent);
    yourChoice.style.display = "none";
    mobile.style.display = 'none';
    startButton.innerHTML = "PLAY AGAIN";
    startButton.style.display = 'block';
    categorys.style.display = "none";
    const textAnimation = "CONGRATULATIONS, YOU WIN";
    winner.innerHTML = textAnimation.replace(/\S/g, '<span>$&</span>');
}

const correctLetter = letter => {
    const { children } =  wordContainer;
    for(let i = 0; i < children.length; i++) {
        if(children[i].innerHTML === letter) {
            children[i].classList.toggle('hidden');
            hits++;
        }
    }
    if(hits === selectedWord.length) endGameWin();
}

const letterInput = letter => {
    if(selectedWord.includes(letter)) {
        correctLetter(letter);
    } else {
        wrongLetter();
    }
    addLetter(letter);
    usedLetters.push(letter);
};

const letterEvent = event => {
    let newLetter = event.key.toUpperCase();
    if(newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
        letterInput(newLetter);
    };
};

const drawWord = () => {
    selectedWord.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.innerHTML = letter.toUpperCase();
        letterElement.classList.add('letter');
        letterElement.classList.add('hidden');
        wordContainer.appendChild(letterElement);
    });
};

const selectRandomWordColors = () => {
    let word = COLORS[Math.floor((Math.random() * COLORS.length))].toUpperCase();
    selectedWord = word.split('');
    yourChoice.style.display = "block";
    yourChoice.innerHTML = "COLORS";
    startGame();
};
const selectRandomWordAnimals = () => {
    let word = ANIMALS[Math.floor((Math.random() * ANIMALS.length))].toUpperCase();
    selectedWord = word.split('');
    yourChoice.style.display = "block";
    yourChoice.innerHTML = "ANIMALS";
    startGame();
};
const selectRandomWordFood = () => {
    let word = FOOD[Math.floor((Math.random() * FOOD.length))].toUpperCase();
    selectedWord = word.split('');
    yourChoice.style.display = "block";
    yourChoice.innerHTML = "FOOD";
    startGame();
};
const selectRandomWordJobs = () => {
    let word = JOBS[Math.floor((Math.random() * JOBS.length))].toUpperCase();
    selectedWord = word.split('');
    yourChoice.style.display = "block";
    yourChoice.innerHTML = "JOBS";
    startGame();
};
const selectRandomWordBodyparts = () => {
    let word = BODYPARTS[Math.floor((Math.random() * BODYPARTS.length))].toUpperCase();
    selectedWord = word.split('');
    yourChoice.style.display = "block";
    yourChoice.innerHTML = "BODYPARTS";
    startGame();
};
const selectRandomWordClothes = () => {
    let word = CLOTHES[Math.floor((Math.random() * CLOTHES.length))].toUpperCase();
    selectedWord = word.split('');
    yourChoice.style.display = "block";
    yourChoice.innerHTML = "CLOTHES";
    startGame();
};
const selectRandomWordObjects = () => {
    let word = OBJECTS[Math.floor((Math.random() * OBJECTS.length))].toUpperCase();
    selectedWord = word.split('');
    yourChoice.style.display = "block";
    yourChoice.innerHTML = "OBJECTS";
    startGame();
};

const selectRandomWordSubjects = () => {
    let word = SUBJECTS[Math.floor((Math.random() * SUBJECTS.length))].toUpperCase();
    selectedWord = word.split('');
    yourChoice.style.display = "block";
    yourChoice.innerHTML = "SUBJECTS";
    startGame();
};

const drawHangMan = () => {
    ctx.canvas.width  = 120;
    ctx.canvas.height = 160;
    ctx.scale(20, 20);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#920d2a';
    ctx.fillRect(0, 7, 4, 1);
    ctx.fillRect(1, 0, 1, 8);
    ctx.fillRect(2, 0, 3, 1);
    ctx.fillRect(4, 1, 1, 1);
};


const selectCategory = () => {
    startButton.style.display = 'none';
    winner.innerHTML = "SELECT A CATEGORY";
    wordContainer.innerHTML = "";
    usedLettersElement.innerHTML = '';
    usedLetters = [];
    drawHangMan();
    mistakes = 0;
    hits = 0;
    categorys.style.display = "block";
    colorsButton.addEventListener('click', selectRandomWordColors);
    animalsButton.addEventListener('click', selectRandomWordAnimals);
    foodButton.addEventListener('click', selectRandomWordFood);
    jobstButton.addEventListener('click', selectRandomWordJobs);
    bodypartsButton.addEventListener('click', selectRandomWordBodyparts);
    clothesButton.addEventListener('click', selectRandomWordClothes);
    objectsButton.addEventListener('click', selectRandomWordObjects);
    subjectsButton.addEventListener('click', selectRandomWordSubjects);
}

const startGame = () => {
    drawWord();
    winner.innerHTML = "";
    mobile.style.display = 'block';
    categorys.style.display = "none";
    document.addEventListener('keydown', letterEvent);
};

startButton.addEventListener('click', selectCategory);

