import React, { useEffect, useState } from 'react'
import Ball from '../ball';
const Screen = () => {
    const [activeNumber, setActiveNumber] = useState(0);
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(60);
    let number = 6;
    let balls = [];
    for (let a = 1; a <= number; a++) {
        balls.push(a);
    }

    const checkNumber = (id) => {
        if (time > 0) {
            if (id == activeNumber) {
                generateNumber(1, number);
                setScore(score + 1);
            }
        }
    }
    const generateNumber = (min, max) => {

        if (activeNumber != 0) {
            document.getElementById("ball_" + activeNumber).classList.add("bg-slate-100");
            document.getElementById("ball_" + activeNumber).classList.remove("bg-blue-400");
        }
        let random = Math.floor(Math.random()
            * (max - min + 1)) + min;
        setActiveNumber(random);
        document.getElementById("ball_" + random).classList.remove("bg-slate-100");
        document.getElementById("ball_" + random).classList.add("bg-blue-400");

    };

    useEffect(() => {
        generateNumber(1, number);



    }, [])



    useEffect(() => {
        let timer = setInterval(() => {
            setTime((time) => {
                if (time === 0) {
                    clearInterval(timer);
                    document.getElementById("screen").style.display="none";
                    return 0;
                   
                } else return time - 1;
            });
        }, 1000);
    }, []);
    return (
        <div className='bg-slate-700 w-full h-screen'>
            <div className='font-bold text-white px-6 py-2'>Punts: {score} Temps: {time}</div>
            <div className='flex flex-wrap h-screen' id="screen">
                {balls.map((b) => {
                    return (<Ball setActiveNumber={setActiveNumber} checkNumber={checkNumber} key={b} id={b}></Ball>)
                })}

            </div>
        </div>
    )
}

export default Screen;