import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Home() {

    //state hooks
    const [tweets, setTweets] = useState("");
    const [generatedTweet, setGeneratedTweet] = useState("");
    const [startingWord, setStartingWord] = useState("");

    //gramLength
    let gramLength = 6;

    //set the tweets state to be Lebron's tweets
    useEffect(() => {
        (async () => {
            const response = await axios.get("/LeTweets.txt");
            const txt = response.data;
            setTweets(txt);
        })();
    }, []);

    const handleStartingWord = e =>{
        setStartingWord(e.target.value);
    }

    const generateNewTweet = () =>{
        let leTweet = markov.generateRandom(280);
        setGeneratedTweet(leTweet);
    }

    //playing around with the js-markov library
    const Markov = require('js-markov');
    var markov = new Markov();
    markov.addStates(startingWord + " " + " It's " + tweets);
    markov.train(gramLength);
    
    return (  
        <div>
            <h1 className='head'>LeTweet-bot 1.0 👑</h1>
            {generatedTweet && <p className = 'tweetContent'>{generatedTweet}</p>}
            <div className='genBlock'>
                <label className='startLabel'>LeFirst Word:</label>
                <input className='starterWord'
                value = {startingWord}
                onChange = {handleStartingWord}
                 ></input>
                 <br></br>
                <button className='genButton' onClick = {generateNewTweet}>Generate</button>
            </div>
            <p className='head'>github: @connor-aylett</p>
        </div>
    );
}

export default Home;