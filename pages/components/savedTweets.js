function SavedTweets({savedTweets}) {
    return (
        <div>
            {savedTweets.map(eachTweet => {
               return(
                <div key={eachTweet.key}>
                    <p>{eachTweet.post}</p>
                </div>
               ); 
            })}
        </div>
    );
}

export default SavedTweets;