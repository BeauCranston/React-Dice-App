
import './Styles/App.css';
import './Styles/main.scss';
import React, {useState, useEffect} from 'react'
import { Slider } from './Components/Slider/Slider';
import {Container, Row, Col} from 'react-bootstrap'
import diceImage from './Media/dice.png'
function App() {
    const [numOfDice, setNumOfDice] = useState(1);
    const [numOfSides, setNumOfSides] = useState(6);
    const [total, setTotal] = useState();
    //this array is the data representation of each of the dice
    const [diceArray, setDiceArray] = useState([]);
    //sets the dice array that the dice rendering basis itself on
    const initializeDiceArray = ()=>{
        var arr = [];
        for(var i=0; i < numOfDice; i++){
            arr.push(numOfSides);
        }
        setDiceArray(arr);
    }
    //if the number of sides or dice change then re-initialize the dice
    useEffect(()=>{
        initializeDiceArray();
        console.log('useEffect called')
    },[numOfSides, numOfDice]);

    //listen for a diceArray change. If the dice array has changed then a new total needs to be assigned to
    useEffect(()=>{
        if(diceArray.length > 0){
            var sumReducer = (sum, current) => sum + current; 
            setTotal(diceArray.reduce(sumReducer));
        }    
    },[diceArray])

    const roll = ()=>{
        //roll dice 10 times to show dice numbers changing
        var rollCount = 10;
        var interval = setInterval(()=>{
            //if roll count is at 0 then stop calling the function
            if(rollCount === 0)
                clearInterval(interval);
            //otherwise roll the dice
            var newArray = diceArray.map(x=>  x = Math.floor(Math.random() * numOfSides + 1))
            setDiceArray(newArray);
            rollCount--;
        }, 100)             
    }
  return (
    <div className="App">
        <div className='header-container'>
            <h1 className='title'>React Dice Roll</h1>
        </div>
        
        <Container>
            <Row>
                {/* this is where the sliders are to configure dice set */}
                <Col md={{span:5, offset:2}}>
                    <DiceConfiguration label='Number Of Dice' min='1' max='10' configState={numOfDice} setConfigState={setNumOfDice}/>
                </Col>
                <Col md={{span:5}}>
                    <DiceConfiguration label='Number Of Sides' min='1' max='20' configState={numOfSides} setConfigState={setNumOfSides}/>
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col className='d-flex justify-content-center'>
                    {/* roll button. */}
                    <button className='my-button' onClick={()=>{roll();}} >Roll! <span><img style={{width:'20px', height:'20px'}} src={diceImage}/></span></button>
                </Col>
            </Row>
        </Container>
        <Container className='render-box'>
            <Row>
                <Col>
                {/* dice are rendered here */}
                    <DiceRenderContainer diceArray={diceArray}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Total: {total}</h2>
                </Col>
            </Row>
        </Container>
        
    </div>
  );
}


function DiceConfiguration({label, min, max, configState, setConfigState}){
    
    return(
        <Container className='dice-configuration'>
            <Row>
                <Col>
                    <label>{label}:</label>
                </Col>
            </Row>
            <Row >
                <Col> 
                    <div className='dice-config-input'>
                        {/* dice side and number values are changed here when the slider's value changes */}
                        <Slider min={min} max={max} defaultValue={configState} onChange={(event)=>{setConfigState(Number.parseInt(event.target.value))}}/>
                        <span>{configState}</span>
                    </div>              
                </Col>
            </Row>               
        </Container>
        
    )
}

function DiceRenderContainer({diceArray}){
    return(
        <Container>
            <Row className='d-flex justify-content-center'>
                {diceArray.map((dieVal, key)=>{
                    return (
                        <Col key={key} className='mb-4'>
                            <Die number={dieVal}/>
                        </Col>                 
                    )
                })}
            </Row>
            
        </Container>
    );
}

function Die({number}){
    return(
        <Container className='die'>
            <span>{number}</span>
        </Container>
    );
}

export default App;
