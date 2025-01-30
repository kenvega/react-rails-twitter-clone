export interface Tweet {
  id: number;
  body: string;
  created_at: string;
  likes_count: number;
  user: {
    id: number;
    email: string;
    display_name: string;
    username: string;
    avatar_url: string;
  };
}
