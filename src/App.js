import React from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

export default function App() {
  const [dice, setDice] = React.useState(allNewDie)
  const [tenzies , setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every(dieObj => dieObj.isHeld===true)
    const allMatch = dice.every(dieObj => dieObj.value===dice[0].value)
    if (allHeld && allMatch) {
      setTenzies(true)
      console.log("You won!")
  }
  },[dice])

  function generateDieInstance(){
    return {
      value: Math.ceil(Math.random()*6),
      isHeld: false,
      id: nanoid() 
    }
  }
  function allNewDie(){
    const newDice = []
    for (let i = 0 ; i<10 ; i++) {
      newDice.push(generateDieInstance())
    }
    return newDice
  }

  function holdDie(id) {
    //find this id's obj in the dice arrOfObj & flip isHeld
    setDice(prevDice => prevDice.map(dieObj => {
      return dieObj.id===id ? 
        {
          ...dieObj ,
          isHeld: !dieObj.isHeld
        } :
        dieObj
      }
    ))
  }
  const dieElements = dice.map(dieObj => (
    <Die 
      key={dieObj.id} 
      value={dieObj.value} 
      isHeld={dieObj.isHeld}
      holdDie={() => holdDie(dieObj.id)}
    />
  ))
  function rollDie() {
    if(!tenzies) {
      setDice(prevDie => prevDie.map(prevDieObj => {
        return prevDieObj.isHeld ? 
          prevDieObj : 
          generateDieInstance()
      }))
    }
    else {
      setTenzies(false)
      setDice(allNewDie())
    }
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">
              Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
            </p>
      <div className="dice-container">
        {dieElements}
      </div>
      <button
        className="roll-dice"
        onClick={rollDie}
      >
        {tenzies ? "NEW GAME" : "ROLL DICE"}
      </button>
    </main>
  )
}