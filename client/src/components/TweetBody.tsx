import React from "react";
import { Tweet } from "../types/Tweet";
import { Link } from "react-router-dom";

type TweetBodyProps = {
  tweet: Tweet;
};

const TweetBody = ({ tweet }: TweetBodyProps) => {
  const words = tweet.body.split(" ");

  return (
    <p className="mb-4">
      {words.map((word, index) => {
        const separator = index < words.length - 1 ? " " : null;

        return (
          <React.Fragment key={`tweet-${tweet.id}-word-${word}`}>
            {word.startsWith("#") ? (
              <Link
                key={`tweet-${tweet.id}-tag-${word}`}
                to={`/tags/${word.slice(1)}`}
                className="text-blue-400 hover:underline"
              >
                {word}
              </Link>
            ) : (
              word
            )}
            {separator}
          </React.Fragment>
        );
      })}
    </p>
  );
};

export default TweetBody;
