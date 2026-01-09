import { User } from "./User";

export type Tweet = {
  id: number;
  body: string;
  created_at: string;
  likes_count: number;
  retweets_count: number;
  reply_tweets_count: number;
  tweet_liked_by_current_user: boolean;
  tweet_bookmarked_by_current_user: boolean;
  tweet_retweeted_by_current_user: boolean;
  user: User;
};
