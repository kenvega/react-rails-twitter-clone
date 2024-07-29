import { useState, ChangeEvent, FormEvent, MouseEvent } from "react";
import { createTweet } from "../services/tweetsService";

const TweetForm = () => {
  const [tweetBody, setTweetBody] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTweetBody(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    createTweet({ tweetBody });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="What's happening?" value={tweetBody} onChange={handleChange} />
      </form>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default TweetForm;
