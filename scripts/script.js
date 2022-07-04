const nav = document.querySelector('nav')
const dfLvlAdjustBtn = document.querySelector('#df--lvl__select--btn')
const dfLvlNote = document.getElementById('df--lvl__select')
const startGameBtn = document.querySelector('#start--game')
const endGameBtn = document.querySelector('#end--game')
const clickBlocker = document.querySelector('#click--blocker')
const notification = document.querySelector('#notification')
const winCounter = document.querySelector('#wins--count')
const scoreCounter = document.querySelector('#score')
const difficuiltyLvlHandler = document.querySelector('#change--df--lvl')
const h1 = document.querySelector('h1')

const cupOne = document.querySelector('#cupOne')
const cupTwo = document.querySelector('#cupTwo')
const cupThree = document.querySelector('#cupThree')

const dfLvlInputs = document.querySelectorAll('input[name="df--lvl"]')
const cups = document.querySelectorAll('.item')
const shape = document.querySelectorAll('.cup--shape')

const cupOneAnims = ['animation--one', 'animation--four', 'animation--seven']
const cupTwoAnims = ['animation--two', 'animation--five', 'animation--eight']
const cupThreeAnims = ['animation--three', 'animation--six', 'animation--nine']

const ball = document.createElement('div') 
ball.classList.add('ball')

const assignedCupValues = [0,1,2]
let handleWithClickBlocker = [0]
let scoreCountArray = [0]

let setAnimationSpeed = 0

let assignAnimationSpeed = 0
console.log(setAnimationSpeed)

let winsCountInit = 0
countValue = 1

let CupsRandomNumberVar = null

endGameBtn.style.display = 'none'
difficuiltyLvlHandler.style.display = 'none'


const reduceArrayFunc = (total, num) => {
    return total + num
}

const winsCount = () => {
    winsCountInit += countValue
    winCounter.innerHTML = 'winnings: ' + winsCountInit
}

const scoreCountFunc = () => {
    
    if (scoreCountArray.reduce(reduceArrayFunc) < 0) {
        scoreCountArray.splice(1,scoreCountArray.length)
        console.log('score conuter array: ' + scoreCountArray)
    }
    scoreCounter.textContent = `Score: ${scoreCountArray.reduce(reduceArrayFunc)}`
}

let AnimRandomNumberFc = () => {
    return Math.floor(Math.random()*3)
}

let CupsRandomNumberFc = () => {
    return Math.floor(Math.random()*3)
}

const navHandler = () => {
    nav.style.display ='block'
    nav.style.opacity = '1'
    h1.style.display = 'none'
    console.log(setAnimationSpeed)
}

const assignAnimationSpeedFc = () => {
    assignAnimationSpeed = 0
    assignAnimationSpeed = ((5000 - setAnimationSpeed)/1000) + 's'
    console.log(assignAnimationSpeed)
}

const setAnimationSpeedFc = () => {
    setAnimationSpeed = null
    for (let input of dfLvlInputs) {
        if (input.checked) {
            setAnimationSpeed = input.value
            nav.style.opacity = '0'
            nav.style.transition = '0.3s'
            setTimeout(() => {
                nav.style.display ='none'
            }, 300);
            console.log(setAnimationSpeed)
        }
    }
    assignAnimationSpeedFc()
}

const assignBallToCup = () => {
    for (let i = 0; i < cups.length; i++) {
        cups[i] = assignedCupValues[i]
        if ( assignedCupValues[i] === CupsRandomNumberVar) {
            cups[i].append(ball)
            ball.classList.remove('shrinkBall')
            ball.classList.add('expandBall')
            console.log('ball in cup: ' + [i+1])
        }
    }
}

for (let i = 0; i < shape.length; i++) {
    shape[i].addEventListener('click', () => {
        shape[i].classList.remove('moveCupsDown')
        shape[i].classList.add('moveCupsUp')
        console.log(shape[i])
        handleWithClickBlocker.push(1)
         if (assignedCupValues[i] === CupsRandomNumberVar && (handleWithClickBlocker.reduce(reduceArrayFunc) === 2)) {
            clickBlocker.style.display = 'block'
            endGameBtn.style.display = 'block'
            notification.textContent ='You win!'
            difficuiltyLvlHandler.style.display = 'block'
            difficuiltyLvlHandler.disabled = false
            console.log('score conut array: ' + scoreCountArray)
            winsCount()
         } else if (assignedCupValues[i] === CupsRandomNumberVar) {
            clickBlocker.style.display = 'block'
            endGameBtn.style.display = 'block'
            notification.textContent ='You win!'
            difficuiltyLvlHandler.style.display = 'block'
            difficuiltyLvlHandler.disabled = false
            if (assignAnimationSpeed === '1s') {
              scoreCountArray.push(20)
            } else if (assignAnimationSpeed === '1.6s') {
                scoreCountArray.push(12)
            } else {
                scoreCountArray.push(10)
            }
            console.log('score conut array: ' + scoreCountArray)
            winsCount()
            scoreCountFunc()
         } else if (handleWithClickBlocker.reduce(reduceArrayFunc) === 2) {
            clickBlocker.style.display = 'block'
            endGameBtn.style.display = 'block'
            notification.textContent = 'You lost'
            difficuiltyLvlHandler.style.display = 'block'
            difficuiltyLvlHandler.disabled = false
            if (assignAnimationSpeed === '1s') {
                scoreCountArray.push(-20)
              } else if (assignAnimationSpeed === '1.6s') {
                  scoreCountArray.push(-12)
              } else {
                  scoreCountArray.push(-10)
              }            
              scoreCountFunc()
            console.log('score conut array: ' + scoreCountArray)
        } else {
            notification.textContent = 'not here..'
        }
    console.log(handleWithClickBlocker)
    })
}

const moveCupsDownFc = () => {
    for (let shp of shape) {
        shp.classList.remove('moveCupsUp')
        shp.classList.add('moveCupsDown')
        console.log(shp)
    }
}
const moveCupsUpFc = () => {
    for (let shp of shape) {
        shp.classList.remove('moveCupsDown')
        shp.classList.add('moveCupsUp')
        console.log(shp)
    }
}

const startGameFc = () => {
    handleWithClickBlocker.splice(1, handleWithClickBlocker.length)
    AnimRandomNumberVar = AnimRandomNumberFc()
    const runAnimation = () => {
        cupOne.classList.add(cupOneAnims[AnimRandomNumberVar])
        cupTwo.classList.add(cupTwoAnims[AnimRandomNumberVar])
        cupThree.classList.add(cupThreeAnims[AnimRandomNumberVar])
        cupOne.style.animationDuration = assignAnimationSpeed
        cupTwo.style.animationDuration = assignAnimationSpeed
        cupThree.style.animationDuration = assignAnimationSpeed
    }
    notification.textContent = ''
    console.log(cupOne)
    console.log(cupTwo)
    console.log(cupThree)
    console.log(AnimRandomNumberVar)
    setTimeout(() => {clickBlocker.style.display = 'none'; notification.textContent = 'Select cup...'}, 7000 - setAnimationSpeed )
    setTimeout(() => {startGameBtn.style.display = 'none'}, 300)
    CupsRandomNumberVar = CupsRandomNumberFc()
    setTimeout(moveCupsDownFc, 1000)
    setTimeout(runAnimation, 1500)
    assignBallToCup()
}

const endGameFc = () => {
    const clearAnimations = () => {
        cupOne.classList.remove('animation--one', 'animation--four', 'animation--seven')
        cupTwo.classList.remove('animation--two', 'animation--five', 'animation--eight')
        cupThree.classList.remove('animation--three', 'animation--six', 'animation--nine')
    }
    console.log(cupOne)
    console.log(cupTwo)
    console.log(cupThree)
    // startGameBtn.style.display = 'block'
    // endGameBtn.style.display = 'none'
    ball.classList.remove('expandBall')
    ball.classList.add('shrinkBall')
    difficuiltyLvlHandler.disabled = true
    moveCupsUpFc()
    setTimeout(() => {endGameBtn.style.display = 'none'}, 100)
    setTimeout(clearAnimations, 500)
    setTimeout(() => {ball.remove()}, 500)
    setTimeout(startGameFc, 1000)
    console.log(handleWithClickBlocker)
}


dfLvlAdjustBtn.addEventListener('click', setAnimationSpeedFc)
startGameBtn.addEventListener('click', startGameFc)
endGameBtn.addEventListener('click', endGameFc)
difficuiltyLvlHandler.addEventListener('click', navHandler)
