import React from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti  from "react-dom-confetti"

export default function App (){

    const [dice, setDice]=React.useState(allDice)
    const [tenzies, setTenzies]=React.useState(false)

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if(allHeld && allSameValue){
            setTenzies(true)
        }
    }, [dice])

    function generateNewDie(){
        return {
            value: Math.floor(Math.random() * 6 + 1), 
            isHeld: false,
            id: nanoid()
        }
    }

    function allDice(){
        const newDice = []
        for(let i = 0; i < 10; i++){
            newDice.push(generateNewDie())
        }
       return newDice
    }

    function holdDice(id){
        setDice(prevDice => prevDice.map(die => {
                return die.id === id ?
                {...die, isHeld: !die.isHeld} : die
        }));
    }
    

    const diceElements = dice.map(die => <Die value={die.value} key={die.id} isHeld={die.isHeld} hold={() => holdDice(die.id)}/>)
    
    function rollDice(){
        if(!tenzies){
            setDice(prevDice => prevDice.map(die => {
                return die.isHeld ? die : generateNewDie()
            }))
        }else{
            setTenzies(false)
            setDice(allDice())
        }
       
    }
    
    return(
        <main>
            {tenzies && <Confetti />}
            <h1>Tenzies</h1>
            <h3>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h3>
            <div className="dice-container">
                {diceElements}
            </div>
            <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        </main>
    )
}