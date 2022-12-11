const nav = document.querySelector("nav");
const dfLvlNote = document.querySelector("#df--lvl__select");
const startGameBtn = document.querySelector("#start--game");
const endGameBtn = document.querySelector("#end--game");
const clickBlocker = document.querySelector("#click--blocker");
const notification = document.querySelector("#notification");
const winCounter = document.querySelector("#wins--count");
const scoreCounter = document.querySelector("#score");
const difficuiltyLvlHandler = document.querySelector("#change--df--lvl");
const difficuiltyLvlAdjustButton = document.querySelector(
  "#df--lvl__select--btn"
);
const header1 = document.querySelector("h1");
const highScore = document.querySelector("#high--score");
const newHighScoreAnnouncement = document.querySelector(
  "#high--score__announcement"
);

const cupOne = document.querySelector("#cupOne");
const cupTwo = document.querySelector("#cupTwo");
const cupThree = document.querySelector("#cupThree");

const difficuiltyLvlInputs = document.querySelectorAll('input[name="df--lvl"]');
const cups = document.querySelectorAll(".item");
const shape = document.querySelectorAll(".cup--shape");

const cupOneAnims = ["animation--one", "animation--four", "animation--seven"];
const cupTwoAnims = ["animation--two", "animation--five", "animation--eight"];
const cupThreeAnims = ["animation--three", "animation--six", "animation--nine"];

const ball = document.createElement("div");
ball.classList.add("ball");

const assignedCupValues = [0, 1, 2];
const handleWithClickBlocker = [0];
const scoreCountArray = [0];

let setAnimationSpeed = 0;

let assignAnimationSpeed = 0;

let winsCountInit = 0;
let countValue = 1;

let CupsRandomNumberVar = null;

endGameBtn.style.display = "none";
difficuiltyLvlHandler.style.display = "none";

newHighScoreAnnouncement.style.display = "none";

highScore.style.display = "none";

let highScoreValue = localStorage.getItem("high score");

if (highScoreValue === null) {
  localStorage.setItem("high score", 0);
} else if (highScoreValue !== null && highScoreValue > 0) {
  highScore.style.display = "block";
  highScore.innerHTML = "HIGH SCORE: " + highScoreValue;
}

const highScoreHandler = () => {
  let reducedHighScore = scoreCountArray.reduce(reduceArrayFunc);
  if (highScoreValue < reducedHighScore) {
    localStorage.setItem("high score", reducedHighScore);
    highScoreValue = reducedHighScore;
    highScore.innerHTML = "HIGH SCORE: " + highScoreValue;
    highScore.style.display = "block";
    if ((newHighScoreAnnouncement.style.display = "none")) {
      newHighScoreAnnouncement.style.display = "block";

      newHighScoreAnnouncement.classList.add("hsAnim");
    }
  }
};

const reduceArrayFunc = (total, num) => {
  return total + num;
};

const winsCount = () => {
  winsCountInit += countValue;
  winCounter.innerHTML = "winnings: " + winsCountInit;
  highScoreHandler();
};

const scoreCountFunc = () => {
  if (scoreCountArray.reduce(reduceArrayFunc) < 0) {
    scoreCountArray.splice(1, scoreCountArray.length);
  }
  scoreCounter.textContent = `Score: ${scoreCountArray.reduce(
    reduceArrayFunc
  )}`;
};

let randomNumberForAnimAndCups = () => {
  return Math.floor(Math.random() * 3);
};

const navHandler = () => {
  nav.style.display = "block";
  nav.style.opacity = "1";
  header1.style.display = "none";
};

const setAnimationSpeedFc = () => {
  for (let input of difficuiltyLvlInputs) {
    if (input.checked) {
      setAnimationSpeed = input.value;
      nav.style.opacity = "0";
      nav.style.transition = "0.3s";
      setTimeout(() => {
        nav.style.display = "none";
      }, 300);
    }
  }
  assignAnimationSpeed = setAnimationSpeed;
};

const assignBallToCup = () => {
  for (let i = 0; i < cups.length; i++) {
    cups[i] = assignedCupValues[i];
    if (assignedCupValues[i] === CupsRandomNumberVar) {
      cups[i].append(ball);
      ball.classList.remove("shrinkBall");
      ball.classList.add("expandBall");
    }
  }
};

for (let i = 0; i < shape.length; i++) {
  shape[i].addEventListener("click", () => {
    shape[i].classList.remove("moveCupsDown");
    shape[i].classList.add("moveCupsUp");
    shape[i].disabled = true;
    handleWithClickBlocker.push(1);
    if (
      assignedCupValues[i] === CupsRandomNumberVar &&
      handleWithClickBlocker.reduce(reduceArrayFunc) === 2
    ) {
      clickBlocker.style.display = "block";
      endGameBtn.style.display = "block";
      notification.textContent = "You win!";
      difficuiltyLvlHandler.style.display = "block";
      difficuiltyLvlHandler.disabled = false;
      console.log("score conut array: " + scoreCountArray);
      winsCount();
    } else if (assignedCupValues[i] === CupsRandomNumberVar) {
      clickBlocker.style.display = "block";
      endGameBtn.style.display = "block";
      notification.textContent = "You win!";
      difficuiltyLvlHandler.style.display = "block";
      difficuiltyLvlHandler.disabled = false;
      if (assignAnimationSpeed === "1s") {
        scoreCountArray.push(20);
      } else if (assignAnimationSpeed === "1.6s") {
        scoreCountArray.push(12);
      } else {
        scoreCountArray.push(10);
      }
      console.log("score conut array: " + scoreCountArray);
      winsCount();
      scoreCountFunc();
    } else if (handleWithClickBlocker.reduce(reduceArrayFunc) === 2) {
      clickBlocker.style.display = "block";
      endGameBtn.style.display = "block";
      notification.textContent = "You lost";
      difficuiltyLvlHandler.style.display = "block";
      difficuiltyLvlHandler.disabled = false;
      if (assignAnimationSpeed === "1s") {
        scoreCountArray.push(-20);
      } else if (assignAnimationSpeed === "1.6s") {
        scoreCountArray.push(-12);
      } else {
        scoreCountArray.push(-10);
      }
      scoreCountFunc();
    } else {
      notification.textContent = "not here..";
    }
  });
}

const moveCupsDownFc = () => {
  for (let shp of shape) {
    shp.classList.remove("moveCupsUp");
    shp.classList.add("moveCupsDown");
  }
};
const moveCupsUpFc = () => {
  for (let shp of shape) {
    shp.classList.remove("moveCupsDown");
    shp.classList.add("moveCupsUp");
    shp.disabled = false;
  }
};

const startGameFc = () => {
  handleWithClickBlocker.splice(1, handleWithClickBlocker.length);
  let AnimRandomNumberVar = randomNumberForAnimAndCups();
  const runAnimation = () => {
    cupOne.classList.add(cupOneAnims[AnimRandomNumberVar]);
    cupTwo.classList.add(cupTwoAnims[AnimRandomNumberVar]);
    cupThree.classList.add(cupThreeAnims[AnimRandomNumberVar]);
    cupOne.style.animationDuration = assignAnimationSpeed + "s";
    cupTwo.style.animationDuration = assignAnimationSpeed + "s";
    cupThree.style.animationDuration = assignAnimationSpeed + "s";
  };
  notification.textContent = "";
  setTimeout(() => {
    clickBlocker.style.display = "none";
    notification.textContent = "Select cup...";
  }, parseFloat(assignAnimationSpeed) * 1000 + 2000);
  setTimeout(() => {
    startGameBtn.style.display = "none";
  }, 300);
  CupsRandomNumberVar = randomNumberForAnimAndCups();
  setTimeout(moveCupsDownFc, 1000);
  setTimeout(runAnimation, 1500);
  assignBallToCup();
};

const endGameFc = () => {
  const clearAnimations = () => {
    cupOne.classList.remove(
      "animation--one",
      "animation--four",
      "animation--seven"
    );
    cupTwo.classList.remove(
      "animation--two",
      "animation--five",
      "animation--eight"
    );
    cupThree.classList.remove(
      "animation--three",
      "animation--six",
      "animation--nine"
    );
  };
  ball.classList.remove("expandBall");
  ball.classList.add("shrinkBall");
  difficuiltyLvlHandler.disabled = true;
  moveCupsUpFc();
  setTimeout(() => {
    endGameBtn.style.display = "none";
  }, 100);
  setTimeout(clearAnimations, 500);
  setTimeout(() => {
    ball.remove();
  }, 500);
  setTimeout(startGameFc, 1000);
};

difficuiltyLvlAdjustButton.addEventListener("click", setAnimationSpeedFc);
startGameBtn.addEventListener("click", startGameFc);
endGameBtn.addEventListener("click", endGameFc);
difficuiltyLvlHandler.addEventListener("click", navHandler);
