import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SavedTweets from './components/savedTweets';

function Home() {

    //state hooks
    const [tweets, setTweets] = useState("");
    const [generatedTweet, setGeneratedTweet] = useState("");
    const [startingWord, setStartingWord] = useState("");
    const [savedTweets, updateSavedTweets] = useState([]);
    const [showSaved, setShowSaved] = useState(false);

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

    const addToSavedTweets = () =>{
        updateSavedTweets([...savedTweets, {post: generatedTweet, key: Date.now()}]);
    }

    const displaySaved = () =>{
        setShowSaved(!showSaved);
    }

    //playing around with the js-markov library
    const Markov = require('js-markov');
    var markov = new Markov();
    markov.addStates(startingWord + " " + " It's " + tweets);
    markov.train(gramLength);
    
    return (  
        <div>
            <h1 className='head'>LeTweet-bot 1.0 👑</h1>
            <div className='tweetAndSave'>
                {generatedTweet && <p className = 'tweetContent'>{generatedTweet}</p>}
                {generatedTweet && <button className='saveButton' onClick = {addToSavedTweets}>Save</button>}
            </div>
            <div className='genBlock'>
                <label className='startLabel'>LeFirst Word:</label>
                <input className='starterWord'
                value = {startingWord}
                onChange = {handleStartingWord}
                 ></input>
                 <br></br>
                <button className='genButton' onClick = {generateNewTweet}>Generate</button>
            </div>
            <button onClick = {displaySaved}>
                {showSaved ? 'Hide' : 'Show'} Saved Tweets
                </button>
            {showSaved && <SavedTweets savedTweets={savedTweets}></SavedTweets>}
        </div>
    );
}

export default Home;