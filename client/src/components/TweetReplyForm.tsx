import { ChangeEvent, FormEvent, MouseEvent } from "react";
import { Button } from "@radix-ui/themes";

const TweetReplyForm = ({
  tweetBody,
  setTweetBody,
  onSubmit,
  loading,
  error,
}: {
  tweetBody: string;
  setTweetBody: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
  error: string | null;
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTweetBody(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <div className="p-4 rounded-md hover:bg-slate-200 dark:hover:bg-cyan-900/40">
      <form onSubmit={handleSubmit}>
        <input
          className="w-full rounded-sm px-2 py-2 mb-3 dark:text-stone-600"
          type="text"
          placeholder="Reply to tweet"
          value={tweetBody}
          onChange={handleChange}
          disabled={loading}
        />

        {error ? <p className="text-red-500 mb-2">{error}</p> : null}

        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Tweeting..." : "Tweet"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TweetReplyForm;
