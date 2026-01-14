import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import TweetBody from "./TweetBody";
import { formatToMMMdd } from "../helpers/dateUtils";
import { Tweet } from "../types/Tweet";

type TweetRepliesProps = {
  replyTweets: Tweet[];
  loading?: boolean;
};

const TweetReplies = ({ replyTweets, loading = false }: TweetRepliesProps) => {
  if (loading) {
    return <p className="px-4 py-3 text-sm text-gray-500">Loading replies...</p>;
  }

  if (!replyTweets.length) {
    return <p className="px-4 py-3 text-sm text-gray-500">No replies yet. Be the first to reply.</p>;
  }

  return (
    <div className="divide-y divide-slate-200 dark:divide-slate-700">
      {replyTweets.map((replyTweet) => {
        const formattedDate = formatToMMMdd(replyTweet.created_at);
        const likeIcon = replyTweet.tweet_liked_by_current_user
          ? "/src/assets/heart-filled.svg"
          : "/src/assets/heart-unfilled.svg";
        const retweetIcon = replyTweet.tweet_retweeted_by_current_user
          ? "/src/assets/retweet-filled.svg"
          : "/src/assets/retweet-unfilled.svg";
        const bookmarkIcon = replyTweet.tweet_bookmarked_by_current_user
          ? "/src/assets/bookmark-filled.svg"
          : "/src/assets/bookmark-unfilled.svg";

        return (
          <div key={replyTweet.id} className="flex px-4 py-5">
            <Avatar user={replyTweet.user} />

            <div className="ml-4 grow">
              <div className="flex items-center gap-2 text-sm">
                <Link to={`/users/${replyTweet.user.id}`} className="font-bold hover:underline">
                  {replyTweet.user.display_name}
                </Link>
                <span className="text-gray-500">@{replyTweet.user.username}</span>
                <span className="text-gray-500">· {formattedDate}</span>
              </div>

              <TweetBody tweet={replyTweet} />

              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <img src="/src/assets/chat.svg" className="w-4" alt="reply count" />
                  <span>{replyTweet.reply_tweets_count}</span>
                </div>

                <div className="flex items-center gap-2">
                  <img src={retweetIcon} className="w-4" alt="retweet count" />
                  <span>{replyTweet.retweets_count}</span>
                </div>

                <div className="flex items-center gap-2">
                  <img src={likeIcon} className="w-4" alt="like count" />
                  <span>{replyTweet.likes_count}</span>
                </div>

                <div className="flex items-center gap-2">
                  <img src={bookmarkIcon} className="w-4" alt="bookmark icon" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TweetReplies;
