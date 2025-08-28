import { Tweet } from "../interfaces/Tweet";

const TweetReplies = ({ replyTweets }: { replyTweets: Tweet[] }) => {
  console.log("tweetReplies en TweetReplies: ", replyTweets);

  return (
    <div>
      {replyTweets.map((replyTweet) => {
        return (
          <div key={replyTweet.id} className="border-b border-white px-4 flex items-center">
            <img
              className="w-16 h-16 rounded-full"
              src={replyTweet.user.avatar_url || "/src/assets/profile.svg"}
              alt="profile avatar"
            />
            <div>
              <p>{replyTweet.user.display_name}</p>
              <p>{replyTweet.user.username}</p>
              <p>{replyTweet.created_at}</p>
              <p>{replyTweet.body}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TweetReplies;
