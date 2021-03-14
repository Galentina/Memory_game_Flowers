import React, {useState} from 'react';
// import ImageBoxes from './imageBoxes';
import Lilies from './images/Lilies.jpg'
import Sunflowers from './images/Sunflowers.jpg'
import Morning from './images/Morning.jpg'
import RedTulips from './images/RedTulips.jpg'
import Roses from './images/Roses.jpg'
import Tulip from './images/Tulip.jpg'
import Viola from './images/Viola.jpg'
import YellowTulips from './images/YellowTulips.jpg'
import Back from './images/Back.jpg'
import {v4 as uuid4v} from 'uuid';
import './App.css';

function App() {
    const [guessImage, setGuessImage] = useState([
        {id: uuid4v(), image: Lilies, back: Back, state: 0}, {id: uuid4v(), image: Sunflowers, back: Back, state: 0},
        {id: uuid4v(), image: Morning, back: Back, state: 0}, {id: uuid4v(), image: RedTulips, back: Back, state: 0},
        {id: uuid4v(), image: Roses, back: Back, state: 0}, {id: uuid4v(), image: Tulip, back: Back, state: 0},
        {id: uuid4v(), image: Viola, back: Back, state: 0}, {id: uuid4v(), image: YellowTulips, back: Back, state: 0},
        {id: uuid4v(), image: Lilies, back: Back, state: 0}, {id: uuid4v(), image: Sunflowers, back: Back, state: 0},
        {id: uuid4v(), image: Morning, back: Back, state: 0}, {id: uuid4v(), image: RedTulips, back: Back, state: 0},
        {id: uuid4v(), image: Roses, back: Back, state: 0}, {id: uuid4v(), image: Tulip, back: Back, state: 0},
        {id: uuid4v(), image: Viola, back: Back, state: 0}, {id: uuid4v(), image: YellowTulips, back: Back, state: 0},
    ]);

    const [step, setStep] = useState(0);

    const imagesRandom = () => {
        const newGuessImage = [...guessImage].sort(() => Math.random() - 0.5);
        newGuessImage.map(el =>el.back= Back);
        newGuessImage.map(el => el.state=0);
        setGuessImage(newGuessImage);
        setStep(0);
        console.log(newGuessImage);
    }

    const changeBg = (id)=> {
        let newStep = step;
        const newGuessImage = [...guessImage];
        newGuessImage.map(el => {
            if (el.id === id) el.back = el.image;
            return el;
        })
        setGuessImage(newGuessImage);
        setStep(newStep+1);
        if (newStep+1 >1) {
            skm_LockScreen()
            setTimeout(checkUp, 500);
        }
        console.log(step);
    }

    function skm_LockScreen(){
        let lock = document.getElementById('skm_LockPane');
        if (lock)
            lock.className = 'LockOn';
        setTimeout( skm_UnlockScreen, 700);
    }

    function skm_UnlockScreen() {
        let lock = document.getElementById('skm_LockPane');
        if (lock)
            lock.className = 'LockOff';
    }

    const checkUp = () => {
        const newGuessImage = [...guessImage];
        const newGuessImage1 = guessImage.filter(el => (el.back !== Back && el.state === 0));
        console.log(newGuessImage1)
        if (newGuessImage1[0].state === 0 && newGuessImage1[1].state === 0) {
            if (newGuessImage1[0].image !== newGuessImage1[1].image) {
                setStep(0);
                newGuessImage1.every(el => el.back = Back);
            } else if (newGuessImage1[0].image === newGuessImage1[1].image) {
                newGuessImage.map(el => (el.id === newGuessImage1[0].id) ? el.state = 1 : {...el});
                newGuessImage.map(el => (el.id === newGuessImage1[1].id) ? el.state = 1 : {...el});
                setStep(0);

                }
            }
            setGuessImage(newGuessImage);
        if(isGameOver()) {
            alert("You did it! Do you want to do it again - click to START!");
        }
        }

    const isGameOver = () => {
        return guessImage.filter(el => (el.state === 0)).length === 0;
    }

  return (
    <div className="App">
      <header className="App-header">Memory</header>
        <button className='button1' onClick={imagesRandom}>Start</button>
      <div className='mainDiv'>

          {guessImage.map(el => <button disabled={el.state ===1 } className='imageDiv' onClick={() =>changeBg(el.id)} style={{background: `url(${el.back})`}}>{' '}</button>
          )

          } <div id="skm_LockPane" className="LockOff"> {' '}</div>

      </div>
    </div>
  );
}

export default App;
