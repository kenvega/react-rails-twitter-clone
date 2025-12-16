import React from "react";
import { Tweet } from "../types/Tweet";
import { Link } from "react-router-dom";

type TweetBodyProps = {
  tweet: Tweet;
};

const renderWord = (word: string) => {
  return word.startsWith("#") ? (
    <Link to={`/tags/${word.slice(1)}`} className="text-blue-400 hover:underline">
      {word}
    </Link>
  ) : (
    word
  );
};

const TweetBody = ({ tweet }: TweetBodyProps) => {
  return (
    <p className="mb-4">
      {tweet.body.split(" ").map((word, index, allWords) => (
        <React.Fragment key={`${tweet.id}-word-${index}`}>
          {renderWord(word)}
          {index < allWords.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </p>
  );
};

export default TweetBody;
