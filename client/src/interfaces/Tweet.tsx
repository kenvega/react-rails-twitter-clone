export interface Tweet {
  id: number;
  body: string;
  created_at: string;
  user: {
    id: number;
    email: string;
    username: string;
  };
}
