import { Tweet } from "../types/Tweet";

const TweetReplies = ({ replyTweets }: { replyTweets: Tweet[] }) => {
  console.log("tweetReplies en TweetReplies: ", replyTweets);

  return (
    <div>
      {replyTweets.map((replyTweet) => {
        return (
          <div key={replyTweet.id} className="border-b border-white px-4 ">
            <div className="flex items-center">
              <img
                className="w-16 h-16 rounded-full"
                src={replyTweet.user.avatar_url || "/src/assets/profile.svg"}
                alt="profile avatar"
              />
              <div className="ml-4">
                <p>
                  <span className="font-bold">{replyTweet.user.display_name}</span>{" "}
                  <span className="text-slate-500">@{replyTweet.user.username}</span> ·{" "}
                  <span className="text-slate-500">{replyTweet.created_at}</span>
                </p>
                <p>{replyTweet.body}</p>
              </div>
            </div>
            <div className="flex items-center">
              {/* retweet/unretweet button */}
              <button className="flex cursor-pointer">
                <img
                  src={
                    replyTweet.tweet_retweeted_by_current_user
                      ? "/src/assets/retweet-filled.svg"
                      : "/src/assets/retweet-unfilled.svg"
                  }
                  className="w-4 mr-2"
                  alt="retweet icon"
                />
                <span>{replyTweet.retweets_count}</span>
              </button>

              {/* like/dislike button */}
              <button className="flex cursor-pointer">
                <img
                  src={
                    replyTweet.tweet_liked_by_current_user
                      ? "/src/assets/heart-filled.svg"
                      : "/src/assets/heart-unfilled.svg"
                  }
                  className="w-4 mr-2"
                  alt="like icon"
                />
                <span>{replyTweet.likes_count}</span>
              </button>

              {/* bookmark/unbookmark button */}
              <button className="flex cursor-pointer">
                <img
                  src={
                    replyTweet.tweet_bookmarked_by_current_user
                      ? "/src/assets/bookmark-filled.svg"
                      : "/src/assets/bookmark-unfilled.svg"
                  }
                  className="w-4 mr-2"
                  alt="bookmark icon"
                />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TweetReplies;
