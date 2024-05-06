import React, { useEffect, useState } from 'react'
import Ball from '../ball';
const Screen = () => {
    const [activeNumber, setActiveNumber] = useState(0);
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(60);
    const [status, setStatus] = useState("Stopped");
    const [initialTime, setInitialTime] = useState(60);
    const [rate, setRate] = useState(0);
    const [activeColor, setActiveColor]= useState("");
    let number = 6;
    let balls = [];
    for (let a = 1; a <= number; a++) {
        balls.push(a);
    }
    const startGame = () => {
        setScore(0);
        setStatus("playing");
        setInitialTime(time);
        document.getElementById("screen").style.display = "flex";
        document.getElementById("settings").style.display = "none";
        let timer = setInterval(() => {
            setTime((time) => {
                if (time === 0) {
                    clearInterval(timer);
                    document.getElementById("screen").style.display = "none";
                    document.getElementById("settings").style.display = "flex";
                    setTime(initialTime);

                    return 0;
                } else return time - 1;
            });
        }, 1000);
    }
    const checkNumber = (id) => {
        if (time > 0) {
            if (id == activeNumber) {
                document.getElementById('audioCorrect').pause();
                document.getElementById('audioCorrect').currentTime = 0;
                generateNumber(1, number);
                setScore(score + 1);
                document.getElementById('audioCorrect').play();
                let calcRate = (score / (initialTime - time)).toString().substring(0, 3);
                setRate(calcRate);
            } else {
                document.getElementById('audioWrong').play();
            }
        }
    }
    const generateNumber = (min, max) => {
        let colors = [null, 'bg-blue-200', 'bg-blue-300', 'bg-blue-400', 'bg-blue-500', 'bg-blue-600', 'bg-blue-800'];
        if (rate >= 1.5) {
            console.log(rate);
             colors = [null, 'bg-green-200', 'bg-green-300', 'bg-green-400', 'bg-green-500', 'bg-green-600', 'bg-green-800'];
        } else if (rate >= 1) {
            console.log(rate);
             colors = [null, 'bg-blue-200', 'bg-blue-300', 'bg-blue-400', 'bg-blue-500', 'bg-blue-600', 'bg-blue-800'];
        } else {
            console.log(rate);
             colors = [null, 'bg-red-200', 'bg-red-300', 'bg-red-400', 'bg-red-500', 'bg-red-600', 'bg-red-800'];
        }
        console.log(colors);
        if (activeNumber != 0) {
         /*    document.getElementById("ball_" + activeNumber).classList.add("bg-slate-100");
            document.getElementById("ball_" + activeNumber).classList.remove("bg-blue-200");
            document.getElementById("ball_" + activeNumber).classList.remove("bg-blue-300");
            document.getElementById("ball_" + activeNumber).classList.remove("bg-blue-400");
            document.getElementById("ball_" + activeNumber).classList.remove("bg-blue-500");
            document.getElementById("ball_" + activeNumber).classList.remove("bg-blue-600");
            document.getElementById("ball_" + activeNumber).classList.remove("bg-blue-800"); */
            document.getElementById("ball_" + activeNumber).classList.remove(activeColor);

        }
        let random = Math.floor(Math.random()
            * (max - min + 1)) + min;
        let randomC = Math.floor(Math.random()
            * (max - min + 1)) + min;
        setActiveNumber(random);
        setActiveColor(colors[randomC]);
        document.getElementById("ball_" + random).classList.remove("bg-slate-100");
        document.getElementById("ball_" + random).classList.add(colors[randomC]);

    };

    useEffect(() => {
        generateNumber(1, number);
    }, [])



    useEffect(() => {
        //

    }, []);
    return (
        <div className='bg-white w-full h-screen'>
            <div className='font-bold text-slate-700 px-6 py-2 bg-slate-400 rounded-b-xl shadow-xl '>Punts: {score} -  Temps: {time} - Ratio: {rate}</div>

            <div className=' flex flex-wrap h-screen w-full justify-center items-center' id="settings">
                <div className="block justify-center">
                    <div className=' rounded-xl p-2 font-bold text-slate-700 flex justify-center border-2 '>
                        Temps &nbsp;<input className='bg-transparent w-1/4' type="number" value={time} onChange={(e) => { setTime(e.target.value) }}></input>
                    </div>

                    <div className=' p-6 flex justify-center'>
                        <button className='rounded-full bg-slate-700 text-white p-12 font-bold shadow-xl' onClick={startGame}>Start</button>
                    </div>
                </div>
            </div>
            <div className='hidden flex flex-wrap h-screen' id="screen">
                {balls.map((b) => {
                    return (<Ball setActiveNumber={setActiveNumber} checkNumber={checkNumber} key={b} id={b}></Ball>)
                })}
            </div>
            <audio id="audioCorrect">
                <source src="./correct.mp3"></source>
            </audio>
            <audio id="audioWrong">
                <source src="./error.mp3"></source>
            </audio>
        </div>
    )
}

export default Screen;