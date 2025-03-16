export interface Tweet {
  id: number;
  body: string;
  created_at: string;
  likes_count: number;
  tweet_liked_by_current_user: boolean;
  tweet_bookmarked_by_current_user: boolean;
  user: {
    id: number;
    email: string;
    display_name: string;
    username: string;
    avatar_url: string;
  };
}
