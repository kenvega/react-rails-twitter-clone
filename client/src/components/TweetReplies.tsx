import { Tweet } from "../interfaces/Tweet";

const TweetReplies = ({ replyTweets }: { replyTweets: Tweet[] }) => {
  console.log("tweetReplies en TweetReplies: ", replyTweets);

  return (
    <div>
      {replyTweets.map((replyTweet) => {
        return (
          <div key={replyTweet.id}>
            <p>{replyTweet.user.username}</p>
            <p>{replyTweet.body}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TweetReplies;
