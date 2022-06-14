import axios from 'axios';
import React, { useState, useEffect } from 'react';

function LeTwitter() {

    //state hooks
    const [tweets, setTweets] = useState("");
    const [generatedTweet, setGeneratedTweet] = useState("");
    const [startingWord, setStartingWord] = useState("");

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
    markov.train(5);
    
    return (  
        <div>
            <input
            value = {startingWord}
            onChange = {handleStartingWord}
            ></input>
            <button onClick = {generateNewTweet}>Generate</button>
            <p>{generatedTweet}</p>
        </div>
    );
}

export default LeTwitter;